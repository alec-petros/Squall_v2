class Track < ApplicationRecord
  belongs_to :user
  has_one :audio_file

  def filestack_upload
    client = FilestackClient.new(Rails.application.credentials.filestack[:secret_access_key])
    byebug
  end
end
