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
    let show = null
    this.props.showUser ?
    show = (
      <div id="showDiv">
        <h1>{this.props.showUser.name}</h1>
        <SongList history={ this.props.history } songs={ this.props.showUser.tracks } />
      </div>
    ) :
    null

    return (
      <div>
        <h1>{this.props.showUser ? show : null}</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {showUser: state.showUser, auth: state.auth}
}
export default connect(mapStateToProps, {setShowUser, setActive})(ShowUser)
