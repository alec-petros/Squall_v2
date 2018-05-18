class Api::V1::FavoritesController < ApplicationController

  def create
    @favorite = Favorite.new({user_id: params['user_id'], track_id: params['track_id']})

    if @favorite.save

      render json: @favorite
    end
  end

  def delete
    @favorite = Favorite.find(params['id'])
    @favorite.destroy
    render json: {
      huge: "huge"
    }
  end
end
