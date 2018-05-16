import React from 'react';

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
    formData.append('user_id', '1')
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
          <input type="text" name="filename" placeholder="Name" value={this.state.filename} onChange={this.handleChange}></input><br></br>
          <textarea placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange}></textarea><br></br>
          <input type="file" id="fileInput"></input><br></br>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}

export default Uploader
