class User < ApplicationRecord
  has_many :tracks
  has_many :favorites

  # followeds are follows for which this user is artist
  has_many :followeds, class_name: 'Follow', foreign_key: "artist_id"
  has_many :followers, class_name: "User", through: :followeds


  has_many :follows, class_name: "Follow", foreign_key: "follower_id"
  has_many :followed_artists, class_name: "User", through: :follows
  # has_many :tracks, through: :favorites, as: :favorite_track
  has_secure_password
  validates :username, presence: true, uniqueness: true

  def favorite_things
    {
      favorites: self.favorites,
      followed_artists: self.follows
    }
  end

  def favorite_tracks
    self.favorites.map do |fav|
      fav.track
    end
  end
end
