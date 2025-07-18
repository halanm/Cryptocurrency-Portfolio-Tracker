class PortfoliosController < ApplicationController
  def get_user_portfolios
    portfolios = current_user.portfolios.includes(:trades)
    
    all_tokens = []
    portfolios.each do |portfolio|
      portfolio.trades.each do |trade|
        all_tokens << trade.token_symbol.upcase unless all_tokens.include?(trade.token_symbol.upcase)
      end
    end
    
    tokens_data = {}
    unless all_tokens.empty?
      coingecko_response = Faraday.get("https://api.coingecko.com/api/v3/coins/markets", {
        symbols: all_tokens.join(','),
        vs_currency: current_user.preferred_currency,
        price_change_percentage: '24h'
      })
      
      if coingecko_response.status == 200 && coingecko_response.body
        tokens = JSON.parse(coingecko_response.body)
        tokens.each do |token|
          symbol = token['symbol'].upcase
          tokens_data[symbol] = {
            current_price: token['current_price'],
            price_change_24h: token['price_change_percentage_24h']
          }
        end
      end
    end
    
    portfolios_with_metrics = portfolios.map do |portfolio|
      metrics = calculate_portfolio_metrics(portfolio, tokens_data)
      
      {
        id: portfolio.id,
        name: portfolio.name,
        total_invested: metrics[:total_invested].round(2),
        total_return: metrics[:total_return].round(2),
        current_value: metrics[:total_current_value].round(2),
        change_24h_percentage: metrics[:portfolio_24h_change].round(2)
      }
    end
    
    render json: portfolios_with_metrics, status: :ok
  end

  def get_portfolio_details
    portfolio = current_user.portfolios.find(params[:portfolio_id])
    
    portfolio_token_symbols = portfolio.trades.map { |trade| trade.token_symbol.upcase }.uniq
    
    tokens_data = {}
    unless portfolio_token_symbols.empty?
      coingecko_response = Faraday.get("https://api.coingecko.com/api/v3/coins/markets", {
        symbols: portfolio_token_symbols.join(','),
        vs_currency: current_user.preferred_currency,
        price_change_percentage: '24h'
      })
      
      if coingecko_response.status == 200 && coingecko_response.body
        tokens = JSON.parse(coingecko_response.body)
        tokens.each do |token|
          symbol = token['symbol'].upcase
          tokens_data[symbol] = {
            current_price: token['current_price'],
            price_change_24h: token['price_change_percentage_24h'],
            name: token['name'],
            image: token['image']
          }
        end
      end
    end
    
    metrics = calculate_portfolio_metrics(portfolio, tokens_data)
    tokens_list = calculate_portfolio_tokens(portfolio, tokens_data)
    
    portfolio_details = {
      id: portfolio.id,
      name: portfolio.name,
      total_invested: metrics[:total_invested].round(2),
      total_return: metrics[:total_return].round(2),
      current_value: metrics[:total_current_value].round(2),
      change_24h_percentage: metrics[:portfolio_24h_change].round(2),
      total_trades: portfolio.trades.count,
      tokens: tokens_list
    }
    
    render json: portfolio_details, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Portfolio not found' }, status: :not_found
  end
  
  def create_portfolio
    portfolio = current_user.portfolios.new(portfolio_params)
    if portfolio.save
      render json: { id: portfolio.id, name: portfolio.name }, status: :created
    else
      render json: { errors: portfolio.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def calculate_portfolio_metrics(portfolio, tokens_data)
    total_invested = 0.0
    total_current_value = 0.0
    weighted_24h_change = 0.0
    total_value_for_change = 0.0
    portfolio_tokens = {}
    
    portfolio.trades.each do |trade|
      token_symbol = trade.token_symbol.upcase
      amount_invested = trade.amount_invested.to_f
      quantity = trade.quantity.to_f
      
      if trade.trade_type == 'sell'
        total_invested -= amount_invested
        quantity = -quantity
        amount_invested = -amount_invested
      else
        total_invested += amount_invested
      end
      
      if portfolio_tokens[token_symbol]
        portfolio_tokens[token_symbol][:quantity] += quantity
        portfolio_tokens[token_symbol][:total_invested] += amount_invested
      else
        portfolio_tokens[token_symbol] = {
          symbol: token_symbol,
          quantity: quantity,
          total_invested: amount_invested
        }
      end
      
      if tokens_data[token_symbol]
        current_price = tokens_data[token_symbol][:current_price]
        current_value = portfolio_tokens[token_symbol][:quantity] * current_price
        
        price_change_24h = tokens_data[token_symbol][:price_change_24h] || 0
        weighted_24h_change += current_value * price_change_24h
        total_value_for_change += current_value
      end
    end
    
    total_current_value = 0.0
    portfolio_tokens.each do |symbol, token_data|
      if tokens_data[symbol] && token_data[:quantity] > 0
        current_price = tokens_data[symbol][:current_price]
        total_current_value += token_data[:quantity] * current_price
      end
    end
    
    total_return = total_current_value - total_invested
    portfolio_24h_change = total_value_for_change > 0 ? (weighted_24h_change / total_value_for_change) : 0
    
    {
      total_invested: total_invested,
      total_current_value: total_current_value,
      total_return: total_return,
      portfolio_24h_change: portfolio_24h_change,
      portfolio_tokens: portfolio_tokens
    }
  end

  def calculate_portfolio_tokens(portfolio, tokens_data)
    metrics = calculate_portfolio_metrics(portfolio, tokens_data)
    portfolio_tokens = metrics[:portfolio_tokens]
    
    tokens_list = portfolio_tokens.map do |symbol, token_data|
      if token_data[:quantity] > 0
        if tokens_data[symbol]
          current_price = tokens_data[symbol][:current_price]
          current_value = token_data[:quantity] * current_price
          price_change_24h = tokens_data[symbol][:price_change_24h] || 0
          
          {
            symbol: symbol,
            name: tokens_data[symbol][:name],
            image: tokens_data[symbol][:image],
            quantity: token_data[:quantity].round(8),
            current_price: current_price,
            current_value: current_value.round(2),
            total_invested: token_data[:total_invested].round(2),
            price_change_24h: price_change_24h.round(2)
          }
        else
          {
            symbol: symbol,
            name: nil,
            image: nil,
            quantity: token_data[:quantity].round(8),
            current_price: nil,
            current_value: 0,
            total_invested: token_data[:total_invested].round(2),
            price_change_24h: 0
          }
        end
      end
    end.compact
    
    tokens_list
  end

  def portfolio_params
    params.require(:portfolio).permit(:name)
  end
end
