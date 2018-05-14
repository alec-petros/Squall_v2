class CreateTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.string :name
      t.integer :user_id
      t.integer :audio_file_id
      t.string :description
      t.string :handle
      t.string :url

      t.timestamps
    end
    add_index :tracks, :user_id
    add_index :tracks, :audio_file_id
  end
end
