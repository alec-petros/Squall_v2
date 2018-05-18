class Api::V1::TracksController < ApplicationController
  skip_before_action :authenticate!, only: [:index, :show, :play]
  before_action :set_track, only: [:show, :update, :destroy, :play]

  # GET /tracks
  def index
    @tracks = Track.all

    destructured = @tracks.reverse.map do |track|
      track.destructure
    end

    render json: destructured
  end

  def play
    @track.play_count === nil ? @track.play_count = 0 : null
    @track.play_count += 1
    @track.save
  end

  # GET /tracks/1
  def show
    render json: @track
  end

  # POST /tracks
  def create
    @track = Track.new(track_params)

    if @track.save
      render json: @track, status: :created, location: @track
    else
      render json: @track.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tracks/1
  def update
    if @track.update(track_params)
      render json: @track
    else
      render json: @track.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tracks/1
  def destroy
    @track.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_track
      @track = Track.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def track_params
      params.require(:track).permit(:name, :user_id, :description)
    end
end
