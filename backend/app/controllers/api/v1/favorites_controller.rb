class Api::V1::FavoritesController < ApplicationController

  def create
    @favorite = Favorite.new({user_id: params['user_id'], track_id: params['track_id']})

    if @favorite.save

      render json: @favorite.track.destructure
    end
  end

end
