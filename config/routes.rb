Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  devise_for :users
  root to: "surveys#home"
  post "grade" => "surveys#grade", as: :grade
  resources :surveys, only: [ :index, :show, :new, :create ]
end
