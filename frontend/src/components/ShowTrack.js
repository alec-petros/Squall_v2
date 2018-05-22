import React from 'react';
import play from '../images/play.png'
import Song from './Song'
import { connect } from 'react-redux'
import { setShow, setActive } from '../actions/actions'

class ShowTrack extends React.Component {

  state = {
    mode: "show",
    description: "",
    name: ""
  }

  componentDidMount() {
    let headers
    if (this.props.auth) {
      headers =  {
        'Content-Type': 'application/json',
        "Accept": "application/javascript",
        "Authorization": `Token token=${ this.props.auth.token }`
      }
    } else {
      headers =  {
        'Content-Type': 'application/json',
        "Accept": "application/javascript"
      }
    }
    fetch(`http://localhost:3000/api/v1/tracks/${this.props.match.params.id}`, {
      method: "GET",
      headers: {
        ...headers
      }
    })
    .then(r => r.json())
    .then(json => {
      this.props.setShow(json);
      this.setState({
        name: json.name,
        description: json.description
      })
    })
  }

  render() {
    console.log(this.props.showSong)
    let show = null
    if (this.state.mode === 'show') {
      this.props.showSong ?
      show = (
        <div id="showDiv">
          <Song song={this.props.showSong} />
          {this.props.showSong.owner === true ? <button>Edit Song</button> : null}
          <h4 id="showDesc">{this.props.showSong.artist} says: '{this.props.showSong.description}'</h4>
        </div>
      ) :
      null
    } else {
      this.props.showSong ?
      show = (
        <div id="editTrack">
          <Song song={this.props.showSong} />
          <form id="editForm" onChange={this.handleChange}>
            <label>Name:</label><br></br>
            <input type="text" value={this.state.name} placeholder="Song Name" /><br></br>
            <label>Description:</label><br></br>
            <textarea rows="10" value={this.state.description} />
            <br></br>
            <button type="submit">Submit Changes</button>
          </form>
        </div>
      ) :
      null
    }

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
