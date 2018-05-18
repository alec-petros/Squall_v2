import React from 'react';
import Song from '../components/Song'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { setActive, like, unlike, getFavorites } from '../actions/actions'


class SongList extends React.Component {

  reroute = (id) => {
    this.props.history.push(`/track/${id}`)
  }

  render() {
    console.log(this.props.songs)
    let show
    this.props.songs ?
    show = this.props.songs.map(song => {
      return (
        <Song
          reroute={this.reroute}
          like={this.props.like}
          unlike={this.props.unlike}
          auth={this.props.auth}
          getFavorites={this.props.getFavorites}
          setActive={this.props.setActive}
          key={'song-comp-' + song.id}
          song={song}
          favoriteList={this.props.favoriteList}
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
    favoriteList: state.favoriteList
  }
}

export default withRouter(connect(mapStateToProps, { setActive, like, unlike, getFavorites })(SongList))
