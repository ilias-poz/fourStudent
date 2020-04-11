class ChatMessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(chat_message)
    # Do something later
    ActionCable.server.broadcast "chat", {
      chat_message: render_message(chat_message)
    }
  end

  private

  def render_message(chat_message)
    ChatmessagesController.render(
      partial: 'chat_messages/chat_message',
      locals: {
        chat_message: chat_message
      }
    )
  end
end
