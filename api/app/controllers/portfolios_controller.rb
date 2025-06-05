class PortfoliosController < ApplicationController
  def get_user_portfolios
    portfolios = current_user.portfolios.map do |portfolio|
      {
        id: portfolio.id,
        name: portfolio.name
      }
    end
    render json: portfolios, status: :ok
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
