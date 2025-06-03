Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  
  post "auth/login", to: "auth#login"
  post "auth/signup", to: "auth#signup"
  
  resources :users, only: [:index]

  resources :tokens, only: [:index]
end
