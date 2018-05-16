import React from 'react';
import Song from '../components/Song'


class SongList extends React.Component {

  state = {

  }

  render() {

    const songs = this.props.songs.map(song => {
      return (
        <Song song={song} />
      )
    })



    console.log(songs)

    return(
      <div>
        {songs}
      </div>
    )
  }
}

export default SongList
