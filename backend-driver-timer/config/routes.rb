Rails.application.routes.draw do
  get 'inbound_messages', to: "inbound_messages#create"

  namespace :api do
    resources :stores, only: [:index]
  end
end
