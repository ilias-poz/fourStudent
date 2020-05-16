require 'test_helper'

class FoodControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get food_show_url
    assert_response :success
  end

end
