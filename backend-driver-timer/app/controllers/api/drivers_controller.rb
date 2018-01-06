class Api::DriversController < ApplicationController
  def index
    @store = Store.where(:store_number => params[:store_id]).first
    @drivers = @store.drivers
    json_response(@drivers)
  end

  def create
    @store = Store.where(:store_number => params[:store_id]).first
    @driver = @store.drivers.create!(driver_params)
    head :ok
  end

  def show
    @driver = Driver.find(params[:id])
    json_response(@driver)
  end

  def destroy
    driver = Driver.find(params[:id])
    driver.destroy
    head :ok
  end

  def last_message
    @driver = Driver.find(params[:driver_id])
    @last_message = @driver.messages.last
    json_response(@last_message)
  end

private
  def driver_params
    params.require(:driver).permit(:name, :phone_number)
  end
end
