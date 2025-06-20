class PortfoliosController < ApplicationController
  def get_user_portfolios
    portfolios = current_user.portfolios.includes(:trades)
    
    all_tokens = []
    portfolios.each do |portfolio|
      portfolio.trades.each do |trade|
        all_tokens << trade.token_symbol.upcase unless all_tokens.include?(trade.token_symbol.upcase)
      end
    end
    
    tokens_price_data = {}
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
          tokens_price_data[symbol] = {
            current_price: token['current_price'],
            price_change_24h: token['price_change_percentage_24h']
          }
        end
      end
    end
    
    portfolios_with_metrics = portfolios.map do |portfolio|
      total_invested = 0.0
      total_current_value = 0.0
      weighted_24h_change = 0.0
      total_value_for_change = 0.0
      
      portfolio.trades.each do |trade|
        token_symbol = trade.token_symbol.upcase
        amount_invested = trade.amount_invested.to_f
        total_invested += amount_invested
        
        if tokens_price_data[token_symbol]
          current_price = tokens_price_data[token_symbol][:current_price]
          current_value = trade.quantity.to_f * current_price
          total_current_value += current_value
          
          price_change_24h = tokens_price_data[token_symbol][:price_change_24h] || 0
          weighted_24h_change += current_value * price_change_24h
          total_value_for_change += current_value
        end
      end
      
      total_return = total_current_value - total_invested
      portfolio_24h_change = total_value_for_change > 0 ? (weighted_24h_change / total_value_for_change) : 0
      
      {
        id: portfolio.id,
        name: portfolio.name,
        total_invested: total_invested.round(2),
        total_return: total_return.round(2),
        current_value: total_current_value.round(2),
        change_24h_percentage: portfolio_24h_change.round(2)
      }
    end
    
    render json: portfolios_with_metrics, status: :ok
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
  def portfolio_params
    params.require(:portfolio).permit(:name)
  end
end
