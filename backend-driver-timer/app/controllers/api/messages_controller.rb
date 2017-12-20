class Api::MessagesController < ApplicationController
  def index
    @driver = Driver.find(params[:driver_id])
    @messages = @driver.messages
    json_response(@messages)
  end

  #
  # def create
  #   @new_store = Store.new(:store_number => params[:store_number], :password => params[:password])
  #   if @new_store.save
  #     ActionCable.server.broadcast 'stores',
  #     new_store: @new_store
  #     head :ok
  #   end
  # end
end
