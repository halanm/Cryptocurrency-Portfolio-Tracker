Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  resources :auth, only: [] do
    collection do
      post "login", to: "auth#login"
      post "signup", to: "auth#signup"
      post "refresh", to: "auth#refresh"
      get "nonce", to: "auth#nonce"
      post "verify", to: "auth#verify"
    end
  end
  
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
