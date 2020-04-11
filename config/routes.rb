Rails.application.routes.draw do
  post 'chatmessages/create', to: 'chatmessages#create'
  devise_for :users
  get '/chatmessages', to: 'chatmessages#show'
  root 'home#home'
  get 'main', to: 'home#main'



end
