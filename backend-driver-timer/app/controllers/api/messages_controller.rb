class Api::MessagesController < ApplicationController
  def show
    @message = Message.find(params[:id])
    json_response(@message)
  end
end
