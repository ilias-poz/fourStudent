require 'test_helper'

class SupportControllerTest < ActionDispatch::IntegrationTest
  test "should get support" do
    get support_support_url
    assert_response :success
  end

end
