Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  
  post "auth/login", to: "auth#login"
  post "auth/signup", to: "auth#signup"
  post "auth/refresh", to: "auth#refresh"
  
  resources :users, only: [:index] do
    collection do
      get "me", to: "users#me"
    end
  end

  resources :tokens, only: [:index]
end
