class Api::DriversController < ApplicationController
  def index
    @store = Store.find(params[:store_id])
    @drivers = @store.drivers
    json_response(@drivers)
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