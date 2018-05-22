class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :track

  def destructure
    {
      user: self.user,
      track: self.track,
      content: self.content
    }
  end
end
