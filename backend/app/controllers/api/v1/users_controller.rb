class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate!, only: [:create, :show]
  before_action :set_user, only: [:show, :update, :destroy, :favorites]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/:id/favorites
  def favorites
    favorites = @user.favorites.map do |fav|
      fav.id
    end
    render json: favorites
  end

  # GET /users/1
  def show
    user_serialized = {
      name: @user.name,
      username: @user.username,
      created_at: @user.created_at,
      id: @user.id
    }
    user_serialized[:tracks] = @user.tracks.reverse.map do |track|
      {
        id: track.id,
        name: track.name,
        artist: track.user.name,
        url: track.url,
        created_at: track.created_at
      }
    end
    user_serialized[:favorites] = @user.favorite_tracks.reverse.map do |track|
      {
        id: track.id,
        name: track.name,
        artist: track.user.name,
        url: track.url,
        created_at: track.created_at
      }
    end
    render json: user_serialized
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: user_hash(@user)
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :username, :password, :password_digest)
    end
end
