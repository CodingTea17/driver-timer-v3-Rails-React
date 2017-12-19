class StoresChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from 'store:4:drivers'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
