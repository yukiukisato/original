Rails.application.routes.draw do
  devise_for :users
  root to: "posts#index"
  resources :calculations, only: [:index,:create]
  resources :foods, only: [:index]
end
