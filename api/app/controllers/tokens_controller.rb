class TokensController < ApplicationController
  skip_before_action :authenticate_request
  
  def index
    tokens = Token.all.as_json(except: [:created_at, :updated_at])
    symbols = tokens.map { |token| token['symbol'].downcase }.uniq.join(',')
    coingecko_response = Faraday.get("https://api.coingecko.com/api/v3/coins/markets", {
      symbols: symbols,
      vs_currency: 'usd'
    })
    token_data = JSON.parse(coingecko_response.body)
    tokens.each do |token|
      symbol = token['symbol'].downcase
      market = token_data.find { |item| item['symbol'].downcase == symbol }
      token['price'] = market ? market['current_price'] : nil
      token['market_cap'] = market ? market['market_cap'] : nil
      token['change_percentage'] = market ? market['price_change_percentage_24h'] : nil
    end
    render json: tokens
  end
end
