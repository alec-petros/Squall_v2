import React from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import play from '../images/play.png'
import emptyHeart from '../images/emptyHeart.png'
import fullHeart from '../images/fullHeart.png'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { setActive, like, unlike, getFavorites, transportClick } from '../actions/actions'

class Song extends React.Component {

  play = () => {
    fetch(`http://localhost:3000/api/v1/tracks/${this.props.song.id}/play`)
  }

  reroute = () => {
    this.props.history.push(`/tracks/${this.props.song.id}`)
  }

  handleLike = () => {
    const favObj = this.props.favoriteList.find(fav => fav.track_id === this.props.song.id)
    if (favObj) {
      this.props.unlike(favObj, this.props.auth)
      this.props.auth ? this.props.getFavorites(this.props.auth) : null
    } else {
      this.props.like(this.props.song, this.props.auth)
    }
  }

  render() {
    let imgSrc
    this.props.favoriteList.find(fav => fav.track_id === this.props.song.id) ?
    imgSrc = fullHeart :
    imgSrc = emptyHeart

    return (
      <Panel style={{backgroundColor: '#e8e8e8'}} className="song">
        <img className="song-play"
          src={play}
          onClick={() => {
              this.props.setActive(this.props.song);
              this.props.transportMode !== "play" ? this.props.transportClick() : null
              this.props.transportPlay !== "init" ? this.props.transportPlay(this.props.song) : null
              this.play()
            }
          }
          height="50px">
        </img>
        <div className="song-text">
          <span className="song-artist" onClick={() => {this.props.history.push(`/users/${this.props.song.artist_id}`)}}>{this.props.song.artist} - </span>
          <p className="song-meta" onClick={this.reroute}>{this.props.song.name} </p>
          <p className="song-playcount">    ({this.props.song.play_count} Plays)</p>
        </div>
        {this.props.auth ? <img className="song-like" src={imgSrc} onClick={this.handleLike}></img> : null}
      </Panel>
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

export default withRouter(connect(mapStateToProps, { setActive, like, unlike, getFavorites, transportClick })(Song))
