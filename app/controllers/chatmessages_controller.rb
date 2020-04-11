class ChatmessagesController < ApplicationController
  before_action :authenticate_user!
  def create
      @chatmessage = ChatMessage.new(message_params)
      @chatmessage.user = current_user
      @chatmessage.save

      

  end
  def messages
    @chatmessages = ChatMessage.all
  end
  def show
    @chatmessages = ChatMessage.all
    @chatmessage = ChatMessage.new
  end

  private

  def message_params
    params.require(:chat_message).permit(:message)
  end
end
