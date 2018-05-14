class CreateAudioFiles < ActiveRecord::Migration[5.2]
  def change
    create_table :audio_files do |t|
      t.string :name
      t.string :file
      t.integer :track_id

      t.timestamps
    end
    add_index :audio_files, :track_id
  end
end
