Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  
  post "auth/login", to: "auth#login"
  post "auth/signup", to: "auth#signup"
  post "auth/refresh", to: "auth#refresh"
  
  resources :users, only: [] do
    collection do
      get "me", to: "users#me"
      patch "me", to: "users#update"
      get "me/portfolios", to: "portfolios#get_user_portfolios"
      post "me/portfolios", to: "portfolios#create_portfolio"
    end
  end

  resources :portfolios, only: [] do
    collection do
      get "/:portfolio_id/details", to: "portfolios#get_portfolio_details"
      get "/:portfolio_id/trades", to: "trades#get_portfolio_trades"
      post "/:portfolio_id/trades", to: "trades#create_trade"
    end
  end

  resources :tokens, only: [:index]
end
