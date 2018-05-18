import React from 'react';
import { connect } from 'react-redux'
import { addSong } from '../actions/actions'

class Uploader extends React.Component {

  state = {
    filename: "",
    description: ""
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const form = document.querySelector('#uploadForm')
    const fileInput = document.querySelector('#fileInput')
    const formData = new FormData(form)
    formData.append('audio_file', fileInput.files[0])
    formData.append('track_id', '1')
    formData.append('name', this.state.filename)
    formData.append('description', this.state.description)
    fetch('http://localhost:3000/api/v1/audio_files', {
      method: "POST",
      headers: {
        "Authorization": `Token token=${ this.props.auth.token }`
      },
      body: formData
    }).then(r => r.json()).then(json => {
      console.log(json)
      this.props.addSong(json)
      this.props.history.push('/')
    })
  }

  render() {
    return (
      <div id="uploadDiv">
        <form id="uploadForm" name="audio_file" onSubmit={this.handleSubmit}>
          <input type="text" name="filename" placeholder="Name" value={this.state.filename} onChange={this.handleChange}></input><br></br>
          <textarea placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange}></textarea><br></br>
          <input type="file" id="fileInput"></input><br></br>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {auth: state.auth}
}

export default connect(mapStateToProps, {addSong})(Uploader)
