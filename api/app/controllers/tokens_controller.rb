class TokensController < ApplicationController
  def index
    render json: Token.all
  end
end
