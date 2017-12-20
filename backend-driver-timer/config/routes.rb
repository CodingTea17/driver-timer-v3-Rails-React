Rails.application.routes.draw do
  get 'inbound_messages', to: "inbound_messages#create"
  mount ActionCable.server => '/cable'

  namespace :api do
    resources :stores, only: [:index, :create] do
      resources :drivers do
        get 'last_message', to: "drivers#last_message"
      end
    end
  end
end
