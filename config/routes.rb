Rails.application.routes.draw do
  devise_for :users

  root 'home#home'
  get 'main', to: 'home#main'

end
