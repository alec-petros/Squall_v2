import React from 'react';
import play from '../images/play.png'
import { connect } from 'react-redux'
import { setShow, setActive } from '../actions/actions'

class ShowTrack extends React.Component {

  componentWillMount() {
    fetch(`http://localhost:3000/api/v1/tracks/${this.props.match.params.id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/javascript"
      }
    })
    .then(r => r.json())
    .then(json => this.props.setShow(json))
  }

  render() {
    let show = null
    this.props.showSong ?
    show = (
      <div id="showDiv">
        <div id="showHeader">
          <img id="showPlay" src={play} height="100px" onClick={() => this.props.setActive(this.props.showSong)}></img>
          <h1 id="showName">{this.props.showSong.name}</h1>
        </div>
        <h4 id="showDesc">{this.props.showSong.description}</h4>
      </div>
    ) :
    null

    return (
      <div>
        <h1>{this.props.showSong ? show : null}</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {showSong: state.showSong, auth: state.auth}
}
export default connect(mapStateToProps, {setShow, setActive})(ShowTrack)
