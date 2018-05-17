import React from 'react';
import Song from '../components/Song'

import { connect } from 'react-redux'
import { setActive } from '../actions/actions'


class SongList extends React.Component {

  render() {

    console.log(this.props)

    const songs = this.props.songs.map(song => {
      return (
        <Song history={this.props.history} setActive={this.props.setActive} key={'song-comp-' + song.id} song={song} />
      )
    })

    return(
      <div>
        {songs}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {songs: state.songs, activeSong: state.activeSong}
}

export default connect(mapStateToProps, { setActive })(SongList)
