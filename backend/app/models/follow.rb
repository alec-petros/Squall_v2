class Follow < ApplicationRecord
  belongs_to :follower, class_name: "User", foreign_key: 'follower_id'
  belongs_to :followed_artist, class_name: "User", foreign_key: 'artist_id'
end
