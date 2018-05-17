import React from 'react';
import Song from '../components/Song'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { setActive } from '../actions/actions'


class SongList extends React.Component {

  reroute = (id) => {
    this.props.history.push(`/track/${id}`)
  }

  render() {
    const songs = this.props.songs.map(song => {
      return (
        <Song reroute={this.reroute} setActive={this.props.setActive} key={'song-comp-' + song.id} song={song} />
      )
    })

    return(
      <div id="songList">
        {songs}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {activeSong: state.activeSong}
}

export default withRouter(connect(mapStateToProps, { setActive })(SongList))
