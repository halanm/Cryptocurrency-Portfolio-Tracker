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

    if trades.empty?
      render json: { message: "No trades found for this portfolio." }, status: :not_found
    else
      render json: trades, status: :ok
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
      render json: trade, status: :created
    else
      render json: { errors: trade.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
