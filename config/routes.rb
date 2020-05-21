Rails.application.routes.draw do

  resources :recipes
  
  post 'chatmessages/create', to: 'chatmessages#create'
  devise_for :users

  get '/chatmessages', to: 'chatmessages#show'

  get '/myrecipes', to: 'recipes#index'
  get '/food', to: 'food#show'
  get '/support', to: 'support#show'

  get '/entertainment', to: 'entertainment#show'

  authenticated :user do
    root to: "home#main"
  end

  unauthenticated :user do
    root "home#home"
  end
end
