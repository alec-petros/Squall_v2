class AudioFile < ApplicationRecord
  belongs_to :track
  mount_uploader :file, AudioUploader

  def filestack_upload
    client = FilestackClient.new(Rails.application.credentials.api_key)
    file = client.upload(filepath: Rails.root.to_s + "/public" + self.file.url)
    self.track.handle = file.handle
    self.track.url = file.url
    self.track.save
  end
end
