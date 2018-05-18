import React from 'react';
import {withRouter} from 'react-router-dom'
import Panel from 'react-bootstrap/lib/Panel'
import play from '../images/play.png'
import emptyHeart from '../images/emptyHeart.png'
import fullHeart from '../images/fullHeart.png'

class Song extends React.Component {

  play = () => {
    fetch(`http://localhost:3000/api/v1/tracks/${this.props.song.id}/play`)
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
      <Panel className="song">
        <img className="song-play"
          src={play}
          onClick={() => {
              this.props.setActive(this.props.song);
              this.play()
            }
          }
          height="50px">
        </img>
        <span className="song-artist" onClick={() => {this.props.history.push(`/user/${this.props.song.artist_id}`)}}>{this.props.song.artist} - </span>
        <p className="song-meta" onClick={() => this.props.reroute(this.props.song.id)}>{this.props.song.name} </p>
        {this.props.auth ? <img className="song-like" src={imgSrc} onClick={this.handleLike}></img> : null}
      </Panel>
    )
  }
}

export default withRouter(Song)
