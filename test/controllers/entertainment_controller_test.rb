require 'test_helper'

class EntertainmentControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get entertainment_show_url
    assert_response :success
  end

end
