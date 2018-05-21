class Api::V1::FollowsController < ApplicationController

  before_action :set_follow, only: :delete

  # POST /follows
  def create
    follower_id = current_user_id
    artist_id = params["id"]
    @follow = Follow.new({follower_id: follower_id, artist_id: params['follow']['id']})
    if @follow.save
      render json: @follow
    else
      render json: @follow.errors, status: :unprocessable_entity
    end
  end

  def delete
    @follow.destroy

    render json: @follow
  end

  private

  def set_follow
    @follow = Follow.find(params[:id])
  end

  def follow_params
    params.require(:follow).permit(:id)
  end

end
