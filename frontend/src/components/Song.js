import React from 'react';
import {NavLink} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import Panel from 'react-bootstrap/lib/Panel'
import play from '../images/play.png'

class Song extends React.Component {

  render() {

    const date = this.props.song.created_at.split("T")[0]

    return (
      <Panel className="song">
        <img className="song-play" src={play} onClick={() => {this.props.setActive(this.props.song)}} height="50px"></img>
        <NavLink to={`/track/${this.props.song.id}`} className="song-meta">{this.props.song.name} </NavLink>
        <span className="song-date"> Uploaded on {date}</span>
      </Panel>
    )
  }

}

export default withRouter(Song)
