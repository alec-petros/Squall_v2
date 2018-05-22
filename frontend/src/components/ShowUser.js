import React from 'react';
import SongList from '../containers/SongList'
import { connect } from 'react-redux'
import { setShowUser, setActive, followArtist, unfollowArtist } from '../actions/actions'
import Button from 'react-bootstrap/lib/Button'

class ShowUser extends React.Component {

  componentDidMount() {
    this.props.setShowUser(this.props.match.params.id)
    // console.log(this.props.match.params.id)
  }

  render() {
    let songs = null
    let follow = null
    this.props.showUser ?
    follow = this.props.followsList.find(f => f.artist_id === this.props.showUser.id) :
    null;
    this.props.showUser ?
    songs = (
      <div id="showDiv">
        <h1>{this.props.showUser.name}</h1>
        {
          this.props.auth && this.props.showUser.id !== this.props.auth.user_id ?
            follow ?
            <Button onClick={() => this.props.unfollowArtist(follow.id, this.props.auth)} id="follow-button">Unfollow</Button> :
            <Button onClick={() => this.props.followArtist(this.props.showUser.id, this.props.auth)} id="follow-button">Follow</Button>
          :
          null
        }
        <br></br>
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
    null;

    return (
      <div>
        <h1>{this.props.showUser ? songs : null}</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {showUser: state.showUser, auth: state.auth, followsList: state.followsList}
}

export default connect(mapStateToProps, {setShowUser, setActive, followArtist, unfollowArtist})(ShowUser)
