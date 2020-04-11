Rails.application.routes.draw do
  post 'chatmessages/create', to: 'chatmessages#create'
  devise_for :users

  get '/chatmessages', to: 'chatmessages#show'
  authenticated :user do
    root to: "home#main"
  end
  
  unauthenticated :user do
    root "home#home"
  end




end
