Rails.application.routes.draw do
  get 'inbound_sms', to: "inbound_sms#create"
end
