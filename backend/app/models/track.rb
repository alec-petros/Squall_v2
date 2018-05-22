class Track < ApplicationRecord
  belongs_to :user
  has_one :audio_file
  has_many :favorites
  has_many :comments

  def filestack_upload
    client = FilestackClient.new(Rails.application.credentials.filestack[:secret_access_key])
    byebug
  end

  def destructure
    comment_arr = self.comments.map do |com|
      com.destructure
    end
    destructured = {
      id: self.id,
      name: self.name,
      artist: self.user.username,
      artist_id: self.user_id,
      url: self.url,
      play_count: self.play_count,
      created_at: self.created_at,
      description: self.description,
      favorite_count: self.favorites.length,
      comments: comment_arr,
      owner: false
    }

    if current_user_id = self.id
      destructured[:owner] = true
    end
    return destructured
  end
end
