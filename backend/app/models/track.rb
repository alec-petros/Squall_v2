class Track < ApplicationRecord
  belongs_to :user
  has_one :audio_file

  def filestack_upload
    client = FilestackClient.new(Rails.application.credentials.filestack[:secret_access_key])
    byebug
  end

  def destructure
    {
      id: self.id,
      name: self.name,
      artist: self.user.name,
      artist_id: self.user_id,
      url: self.url,
      created_at: self.created_at
    }
  end
end
