import React from 'react';

class Uploader extends React.Component {

  state = {
    filename: ""
  }

  handleChange = (e) => {
    this.setState({filename: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const form = document.querySelector('#uploadForm')
    const fileInput = document.querySelector('#fileInput')
    const formData = new FormData(form)
    formData.append('audio_file', fileInput.files[0])
    formData.append('track_id', '1')
    formData.append('name', this.state.filename)
    fetch('http://localhost:3000/audio_files', {
      method: "POST",
      body: formData
    })
    console.log(formData)
  }

  render() {
    return (
      <div>
        <form id="uploadForm" name="audio_file" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Filename" value={this.state.filename} onChange={this.handleChange}></input>
          <input type="file" id="fileInput"></input>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}

export default Uploader
