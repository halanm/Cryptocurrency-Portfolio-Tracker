require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should not save user without email" do
    user = User.new(password: "password123")
    assert_not user.save, "Saved the user without an email"
  end

  test "should not save user without password" do
    user = User.new(email: "test@example.com")
    assert_not user.save, "Saved the user without a password"
  end

  test "should not save user with duplicate email" do
    user1 = User.create(email: "unique@example.com", password: "password123")
    user1.save
    user2 = User.new(email: "unique@example.com", password: "password456")
    assert_not user2.save, "Saved the user with a duplicate email"
  end

  test "should save valid user" do
    user = User.new(email: "valid@example.com", password: "password123")
    assert user.save, "Failed to save a valid user"
  end

  test "authenticate should return user with correct password" do
    user = User.create(email: "auth@example.com", password: "securepass")
    assert user.authenticate("securepass"), "Authenticate did not return user with correct password"
  end

  test "authenticate should return false with incorrect password" do
    user = User.create(email: "authfail@example.com", password: "securepass")
    assert_not user.authenticate("wrongpass"), "Authenticate returned user with incorrect password"
  end
end
