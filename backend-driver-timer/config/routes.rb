Rails.application.routes.draw do
  get 'inbound_message', to: "inbound_message#create"
end
