import React from 'react';
import SongList from '../containers/SongList'
import { connect } from 'react-redux'
import { setShowUser, setActive } from '../actions/actions'

class ShowUser extends React.Component {

  componentWillMount() {
    fetch(`http://localhost:3000/api/v1/users/${this.props.match.params.id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/javascript"
      }
    })
    .then(r => r.json())
    .then(json => this.props.setShowUser(json))
  }

  render() {
    console.log(this.props)
    let songs = null
    this.props.showUser ?
    songs = (
      <div id="showDiv">
        <h1>{this.props.showUser.name}</h1>
        <div id="user-tracks">
          <h4>{this.props.showUser.name}s Tracks</h4>
          <SongList history={ this.props.history } songs={ this.props.showUser.tracks } />
        </div>
        <div id="user-favorites">
          <h4>{this.props.showUser.name}s Favorites</h4>
          <SongList history={ this.props.history } songs={ this.props.showUser.favorites } />
        </div>
      </div>
    ) :
    null

    return (
      <div>
        <h1>{this.props.showUser ? songs : null}</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {showUser: state.showUser, auth: state.auth}
}
export default connect(mapStateToProps, {setShowUser, setActive})(ShowUser)
