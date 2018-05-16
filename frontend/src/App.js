import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Uploader from './components/Uploader'
import SongList from './containers/SongList'

class App extends Component {

  state = {
    songs: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/tracks')
    .then(r => r.json())
    .then(json => this.setState({songs: json}))
  }

  render() {
    console.log(this.state.songs)
    return (
      <div className="App">
        <Uploader />
        <SongList songs={this.state.songs}/>
      </div>
    );
  }
}

export default App;
