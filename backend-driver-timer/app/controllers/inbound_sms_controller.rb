class InboundSmsController < ApplicationController
  def create
    # binding.pry
    sms = Sms.new(
      :from => params["msisdn"],
      :text => params["text"],
      :message_id => params["messageId"],
      :message_timestamp => params["message-timestamp"]
    )
    if sms.save!
      # No render but still let server know it's all good
      head :ok
    end
  end

private
  # Eventually I want to move the sms creation down here.
  def sms_params

  end
end
