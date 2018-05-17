import React from 'react';
import {withRouter} from 'react-router-dom'
import Panel from 'react-bootstrap/lib/Panel'
import play from '../images/play.png'

class Song extends React.Component {

  render() {

    const date = this.props.song.created_at.split("T")[0]

    return (
      <Panel className="song">
        <img className="song-play" src={play} onClick={() => {this.props.setActive(this.props.song)}} height="50px"></img>
        <span className="song-artist" onClick={() => {this.props.history.push(`/user/${this.props.song.artist_id}`)}}>{this.props.song.artist} - </span>
        <p className="song-meta" onClick={() => this.props.reroute(this.props.song.id)}>{this.props.song.name} </p>
        <span className="song-date"> Uploaded on {date}</span>
      </Panel>
    )
  }

}

export default withRouter(Song)
