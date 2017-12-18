class InboundMessageController < ApplicationController
  def create
    driver_phone_number = params["msisdn"]
    # binding.pry
    message = Message.new(:from => driver_phone_number,:text => params["text"],:message_id => params["messageId"],:message_timestamp => params["message-timestamp"])
    if message.save!
      driver_message = DriverMessage.new(:driver_id =>  Driver.where(:phone_number => driver_phone_number).first.id, :message_id => message.id)
      if driver_message.save!
        # No render but still let server know it's all good
        head :ok
      end
    end
  end

private
  # Eventually I want to move the sms creation down here.
  def sms_params

  end
end
