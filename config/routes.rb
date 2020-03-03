Rails.application.routes.draw do
  resources :homes
  root 'home#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
