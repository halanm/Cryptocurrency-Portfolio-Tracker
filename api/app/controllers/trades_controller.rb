class TradesController < ApplicationController
  def get_portfolio_trades
    portfolio_id = params[:portfolio_id]
    portfolio = Portfolio.find_by(id: portfolio_id)

    if portfolio.nil?
      render json: { message: "Portfolio not found." }, status: :not_found
      return
    end

    if portfolio.user_id != current_user.id
      render json: { message: "You do not have access to this portfolio." }, status: :forbidden
      return
    end

    trades = Trade.where(portfolio_id: portfolio_id)

    tokens_by_currency = trades.group_by(&:currency).transform_values do |trades_group|
      trades_group.map { |trade| trade.token_symbol }.uniq
    end
    
    tokens_price_data = {}
    tokens_by_currency.each do |currency, tokens|
      coingecko_response = Faraday.get("https://api.coingecko.com/api/v3/coins/markets", {
        symbols: tokens.join(',').upcase,
        vs_currency: currency.upcase
      })
      

      if coingecko_response.status == 200 && coingecko_response.body
        tokens = JSON.parse(coingecko_response.body)
        tokens_price_data[currency] = {}
        tokens.each do |token|
          symbol = token['symbol'].upcase
          tokens_price_data[currency][symbol] = { currency.downcase => token['current_price'] }
        end
      else
        render json: { message: "Failed to fetch token data for currency #{currency}." }, status: :bad_gateway
        return
      end
    end

    trades_with_prices = trades.map do |trade|
      price = nil
      if tokens_price_data[trade.currency] && tokens_price_data[trade.currency][trade.token_symbol.upcase]
        price = tokens_price_data[trade.currency][trade.token_symbol.upcase][trade.currency.downcase]
      end
      current_value = price && trade.quantity ? (trade.quantity * price) : nil
      trade.as_json.merge('current_value' => current_value)
    end

    if trades.empty?
      render json: { message: "No trades found for this portfolio." }, status: :not_found
    else
      filtered_trades = trades_with_prices.map { |trade| trade.except('portfolio_id', 'created_at', 'updated_at') }
      render json: filtered_trades, status: :ok
    end
  end
  def create_trade
    portfolio_id = params[:portfolio_id]
    portfolio = Portfolio.find_by(id: portfolio_id)

    if portfolio.nil?
      render json: { message: "Portfolio not found." }, status: :not_found
      return
    end

    if portfolio.user_id != current_user.id
      render json: { message: "You do not have access to this portfolio." }, status: :forbidden
      return
    end

    trade_params = params.require(:trade).permit(:token_symbol, :amount_invested, :trade_type)

    coingecko_response = Faraday.get("https://api.coingecko.com/api/v3/coins/markets", {
      symbols: trade_params[:token_symbol].downcase,
      vs_currency: current_user.preferred_currency
    })

    if coingecko_response.status == 200 && coingecko_response.body
      tokens = JSON.parse(coingecko_response.body)
      if tokens.empty?
      render json: { message: "Token not found." }, status: :not_found
      return
      end
    else
      render json: { message: "Failed to fetch token data." }, status: :bad_gateway
      return
    end

    trade_params[:quantity] = (trade_params[:amount_invested].to_f / tokens.first['current_price'].to_f).round(8)
    trade_params[:currency] = current_user.preferred_currency.upcase
    trade_params[:token_symbol] = trade_params[:token_symbol].upcase
    trade_params[:trade_type] = trade_params[:trade_type].downcase

    trade = Trade.new(trade_params)
    trade.portfolio_id = portfolio.id

    if trade.save
      render json: trade.as_json(except: [:portfolio_id, :created_at, :updated_at]), status: :created
    else
      render json: { errors: trade.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
