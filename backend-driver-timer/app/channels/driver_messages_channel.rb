class DriverMessagesChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "store-#{params['store']}-driver-#{params['driver']}:messages"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
