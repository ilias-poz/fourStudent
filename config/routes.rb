Rails.application.routes.draw do
  
  post 'chatmessages/create', to: 'chatmessages#create'
  devise_for :users
  
  get '/chatmessages', to: 'chatmessages#show'
  
  get '/contact', to: 'messages#new'
  post 'contact/create', to: 'messages#create'
  
  
  get '/food', to: 'food#show'
  get '/support', to: 'support#show'
  
  authenticated :user do
    root to: "home#main"
  end
  
  unauthenticated :user do
    root "home#home"
  end
end
