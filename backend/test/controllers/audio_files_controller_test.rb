require 'test_helper'

class AudioFilesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @audio_file = audio_files(:one)
  end

  test "should get index" do
    get audio_files_url, as: :json
    assert_response :success
  end

  test "should create audio_file" do
    assert_difference('AudioFile.count') do
      post audio_files_url, params: { audio_file: { handle: @audio_file.handle, name: @audio_file.name, track_id: @audio_file.track_id, url: @audio_file.url } }, as: :json
    end

    assert_response 201
  end

  test "should show audio_file" do
    get audio_file_url(@audio_file), as: :json
    assert_response :success
  end

  test "should update audio_file" do
    patch audio_file_url(@audio_file), params: { audio_file: { handle: @audio_file.handle, name: @audio_file.name, track_id: @audio_file.track_id, url: @audio_file.url } }, as: :json
    assert_response 200
  end

  test "should destroy audio_file" do
    assert_difference('AudioFile.count', -1) do
      delete audio_file_url(@audio_file), as: :json
    end

    assert_response 204
  end
end
