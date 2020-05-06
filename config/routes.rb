Rails.application.routes.draw do
  post 'chatmessages/create', to: 'chatmessages#create'
  devise_for :users

  get '/chatmessages', to: 'chatmessages#show'

  get '/contact', to: 'messages#new'
  post 'contact/create', to: 'messages#create'
  
  authenticated :user do
    root to: "home#main"
  end
  
  unauthenticated :user do
    root "home#home"
  end




end
