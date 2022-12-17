Rails.application.routes.draw do
  devise_for :users
  resources :surveys
  root to: "surveys#home"
end
