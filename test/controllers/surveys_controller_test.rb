require "test_helper"

class SurveysControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = User.create!(email: "surgeon@example.com", password: "password123")
    @other = User.create!(email: "other@example.com", password: "password123")
  end

  test "calculator home is public" do
    get root_path
    assert_response :success
    assert_select "h1", text: /iAE.*Grade Calculator/
  end

  test "live grading endpoint is public and grades server-side" do
    post grade_path, params: { survey: { death: "false" } }, as: :json
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal "0", body["grades"]["eauiaic"]
    assert_equal "none", body["bands"]["eauiaic"]

    post grade_path, params: { survey: { death: "true" } }, as: :json
    body = JSON.parse(response.body)
    assert_equal "5B", body["grades"]["eauiaic"]
    assert_equal "V", body["grades"]["class_intra"]
    assert_equal "critical", body["bands"]["class_intra"]
  end

  test "history requires sign-in" do
    get surveys_path
    assert_redirected_to new_user_session_path
  end

  test "create ignores client-supplied grades and computes real ones" do
    sign_in @user
    post surveys_path, params: { survey: { death: "false", intervention: "true", eauiaic: "5B" } }
    survey = @user.surveys.last
    assert_redirected_to survey_path(survey)
    assert_equal "1", survey.eauiaic
    assert_equal "II", survey.iae_severity
  end

  test "users cannot view other users' entries" do
    survey = @other.surveys.create!(death: false)
    sign_in @user
    get survey_path(survey)
    assert_response :not_found
  end
end
