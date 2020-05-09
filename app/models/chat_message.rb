class ChatMessage < ApplicationRecord
  belongs_to :user

  validates :message, presence: true
  
  after_create_commit{
    ChatMessageBroadcastJob.perform_later(self)
   }

end
