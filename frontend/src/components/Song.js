import React from 'react';

class Song extends React.Component {

  render() {
    return (
      <div>
        <h3 onClick={() => {this.props.setActive(this.props.song)}}>{this.props.song.name}</h3>
      </div>
    )
  }

}

export default Song
