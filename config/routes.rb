Rails.application.routes.draw do
  namespace :api, format: "json" do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations",
        sessions: "api/v1/auth/sessions",
      }
      resources :users, only: [:index]
      resources :weights
      resources :tests, only: [:index]
    end
  end
end
# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
