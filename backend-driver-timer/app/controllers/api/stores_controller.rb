class Api::StoresController < ApplicationController
  def index
    @stores = Store.all
    json_response(@stores)
  end

  def create
    @new_store = Store.new(:store_number => params[:store_number], :password => params[:password])
    if @new_store.save
      ActionCable.server.broadcast 'stores',
      new_store: @new_store
      head :ok
    end
  end
end
