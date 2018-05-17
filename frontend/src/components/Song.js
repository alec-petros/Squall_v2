import React from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import play from '../images/play.png'

class Song extends React.Component {

  render() {

    const date = this.props.song.created_at.split("T")[0]

    return (
      <Panel className="song">
        <img className="song-play" src={play} onClick={() => {this.props.setActive(this.props.song)}} height="50px"></img>
        <p className="song-meta">{this.props.song.name} </p>
        <span className="song-date"> Uploaded on {date}</span>
      </Panel>
    )
  }

}

export default Song
