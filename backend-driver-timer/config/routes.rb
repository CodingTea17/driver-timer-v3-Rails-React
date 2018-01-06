Rails.application.routes.draw do
  namespace :api do
    # the route that the frontend will subsribe to
    mount ActionCable.server => '/cable'

    # the route new messages are passed to
    get 'inbound_messages', to: "inbound_messages#create"

    # the route where...
    resources :messages, only: [:show]

    resources :stores, only: [:index, :create] do
      resources :drivers do
        get 'last_message', to: "drivers#last_message"
      end
    end
  end
end
