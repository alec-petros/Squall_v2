class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate!, only: [:create, :show, :stream]
  before_action :set_user, only: [:show, :update, :destroy, :favorites, :stream]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/:id/favorites
  def favorites
    render json: @user.favorite_things
  end

  # GET /users/:id/stream
  def stream
    stream = []
    stream.push(@user.tracks.map {|track| track.destructure})
    followed_tracks = @user.followed_artists.map {|art| art.tracks.map {|track| track.destructure}}
    stream.push(*followed_tracks)
    render json: stream.flatten
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
      track.destructure
    end
    user_serialized[:favorites] = @user.favorite_tracks.reverse.map do |track|
      track.destructure
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
