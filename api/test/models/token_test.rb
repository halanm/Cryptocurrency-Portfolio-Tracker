require "test_helper"

class TokenTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  # 
  test "should not save token without name" do
    token = Token.new(symbol: "TST", contract_address: "0x1234567890abcdef")
    assert_not token.save, "Saved the token without a name"
  end
  
  
  test "should not save token without symbol" do
    token = Token.new(name: "Test Token", contract_address: "0x1234567890abcdef")
    assert_not token.save, "Saved the token without a symbol"
  end

  test "should not save token with duplicate name" do
    token1 = Token.create(name: "Unique Token", symbol: "UTK", contract_address: "0x1234567890abcdef")
    token1.save
    token2 = Token.new(name: "Unique Token", symbol: "UTK2", contract_address: "0xabcdef1234567890")
    assert_not token2.save, "Saved the token with a duplicate name"
  end

  test "should not save token with duplicate symbol" do
    token1 = Token.create(name: "Token One", symbol: "T1", contract_address: "0x1234567890abcdef")
    token1.save
    token2 = Token.new(name: "Token Two", symbol: "T1", contract_address: "0xabcdef1234567890")
    assert_not token2.save, "Saved the token with a duplicate symbol"
  end

  test "should save valid token" do
    token = Token.new(name: "Valid Token", symbol: "VTK", contract_address: "0x1234567890abcdef")
    assert token.save, "Failed to save a valid token"
  end
end
