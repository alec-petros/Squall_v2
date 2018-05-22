import React from 'react';
import Song from '../components/Song'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { setActive, like, unlike, getFavorites } from '../actions/actions'


class SongList extends React.Component {

  render() {
    let show
    this.props.songs ?
    show = this.props.songs.map(song => {
      return (
        <Song
          reroute={this.reroute}
          key={'song-comp-' + song.id}
          song={song}
          />
      )
    }) :
    show = null

    return(
      <div id="songList">
        {show}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeSong: state.activeSong,
    auth: state.auth,
    favoriteList: state.favoriteList,
    transportPlay: state.transportPlay,
    transportMode: state.transportMode
  }
}

export default withRouter(connect(mapStateToProps, { setActive, like, unlike, getFavorites })(SongList))
