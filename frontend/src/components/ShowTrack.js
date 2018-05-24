import React from 'react';
import play from '../images/play.png'
import Song from './Song'
import CommentContainer from '../containers/CommentContainer'
import { connect } from 'react-redux'
import { setShow, setActive } from '../actions/actions'

class ShowTrack extends React.Component {

  state = {
    mode: "show",
    description: "",
    name: ""
  }

  componentDidMount() {
    this.fetchData()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  fetchData = () => {
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
        mode: "show",
        name: json.name,
        description: json.description
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/v1/tracks/${this.props.showSong.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/javascript",
        "Authorization": `Token token=${ this.props.auth.token }`
      },
      body: JSON.stringify({
        track: {
          name: this.state.name,
          description: this.state.description
        }
      })
    })
    .then(r => r.json())
    .then(json => {
      this.props.setShow(json)
      this.setState({mode: "show"})
    })
  }

  handleDelete = () => {
    fetch(`http://localhost:3000/api/v1/tracks/${this.props.showSong.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/javascript",
        "Authorization": `Token token=${ this.props.auth.token }`
      }
    })
    .then(r => r.json())
    .then(json => {
      this.props.history.push('/')
    })
  }

  changeMode = () => {
    if (this.state.mode !== "show") {
      this.setState({
        mode: "show"
      })
    } else {
      this.setState({
        mode: "edit"
      })
    }
  }

  render() {
    let show = null
    if (this.state.mode === 'show') {
      this.props.showSong ?
      show = (
        <div id="showDiv">
          <Song song={this.props.showSong} />
          {this.props.showSong.owner === true ? <button onClick={this.changeMode}>Edit Song</button> : null}
          <h4 id="showDesc">{this.props.showSong.artist} says: '{this.props.showSong.description}'</h4>
          <CommentContainer history={this.props.history} song={this.props.showSong} />
        </div>
      ) :
      null
    } else {
      this.props.showSong ?
      show = (
        <div id="editTrack">
          <Song song={this.props.showSong} />
          <form id="editForm" onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <label>Name:</label><br></br>
            <input type="text" name="name" value={this.state.name} placeholder="Song Name" /><br></br>
            <label>Description:</label><br></br>
            <textarea rows="10" name="description" value={this.state.description} />
            <br></br>
            <button type="submit">Submit Changes</button><br></br>
          </form>
          <button onClick={this.handleDelete}>Delete</button>
        </div>
      ) :
      null
    }

    return (
      <div>
        <div>{this.props.showSong ? show : null}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {showSong: state.showSong, auth: state.auth}
}
export default connect(mapStateToProps, {setShow, setActive})(ShowTrack)
