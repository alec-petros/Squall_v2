import React from 'react';
import Song from '../components/Song'


class SongList extends React.Component {

  state = {

  }

  render() {

    const songs = this.props.songs.map(song => {
      return (
        <Song key={'song-comp-' + song.id} song={song} />
      )
    })

    return(
      <div>
        {songs}
      </div>
    )
  }
}

export default SongList
