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

  resources :tokens, only: [:index]
end
