class Api::V1::AudioFilesController < ApplicationController
  before_action :set_audio_file, only: [:show, :update, :destroy]

  # GET /audio_files
  def index
    @audio_files = AudioFile.all

    render json: @audio_files
  end

  # GET /audio_files/1
  def show
    render json: @audio_file
  end

  # POST /audio_files
  def create
    @track = Track.new({
      name: params['name'],
      description: params['description'],
      user_id: current_user_id
      })
    if @track.save
      @audio_file = AudioFile.new({
        file: params['audio_file'],
        name: params['name'],
        track_id: @track.id
        })
      if @audio_file.save
        @audio_file.filestack_upload
        render json: @track
      else
        render json: @audio_file.errors, status: :unprocessable_entity
      end
    else
      render json: @track.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /audio_files/1
  def update
    if @audio_file.update(audio_file_params)
      render json: @audio_file
    else
      render json: @audio_file.errors, status: :unprocessable_entity
    end
  end

  # DELETE /audio_files/1
  def destroy
    @audio_file.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_audio_file
      @audio_file = AudioFile.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def audio_file_params
      params.require(:audio_file).permit(:name, :file, :track_id)
    end
end
