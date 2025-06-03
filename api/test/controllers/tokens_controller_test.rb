require "test_helper"

class TokensControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get tokens_url
    assert_response :success
    assert_not_empty response.body, "Response body should not be empty"
  end
end
