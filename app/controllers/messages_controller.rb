class MessagesController < ApplicationController
    before_action :authenticate_user!
    def new
        @message = Message.new
    end

    def create
        @message = Message.new message_params
        if @message.valid?
            MessageMailer.contact(@message).deliver_now
            redirect_to contact_path
            flash[:notice] = "We have received your message and will be in touch soon!"
        else
            flash[:notice] = "There was an error sending your message. Please try again."
            render :new
        end
    end

    private
    
    def message_params
        params.require(:message).permit(:name, :email, :body)
    end
end
