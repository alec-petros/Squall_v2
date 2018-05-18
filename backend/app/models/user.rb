class User < ApplicationRecord
  has_many :tracks
  has_many :favorites
  # has_many :tracks, through: :favorites, as: :favorite_track
  has_secure_password
  validates :username, presence: true, uniqueness: true

  def favorite_tracks
    self.favorites.map do |fav|
      fav.track
    end
  end
end
