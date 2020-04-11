require 'test_helper'

class ChatmessagesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get chatmessages_create_url
    assert_response :success
  end

end
