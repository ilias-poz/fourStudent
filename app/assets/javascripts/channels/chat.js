App.chat = App.cable.subscriptions.create("ChatChannel", {
  connected: function() {
    console.log("connected to chat channel")
  },
  disconnected: function() {
    console.log("disconnected from chat channel")
  },
  received: function(data) {
    var messages = $('#chatbox')
    messages.append(data['chat_message'])
    messages.scrollTop(messages[0].scrollHeight)
  }
});
