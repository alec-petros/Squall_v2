import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Uploader from './components/Uploader'
import SongList from './containers/SongList'
import RegisterForm from './components/RegisterForm'
import NavBar from './components/NavBar'
import {
  BrowserRouter as Switch,
  Redirect,
  Route
} from 'react-router-dom';

class App extends Component {

  state = {
    songs: []
  }

  componentDidMount() {
    if (localStorage.auth) {
      const auth = JSON.parse(localStorage.auth)
      this.setState({ auth });
    }
    fetch('http://localhost:3000/api/v1/tracks')
    .then(r => r.json())
    .then(json => this.setState({songs: json}))
  }

  authFetched = (auth) =>{
    localStorage.auth = JSON.stringify(auth);
    this.setState({ auth });
  }

  render() {
    console.log(this.state.songs)
    return (
      <div className="App">
        <NavBar />
        <Route exact path="/" render={ (renderProps) =>
          <SongList songs={ this.state.songs } history={ renderProps.history }/>
        } />
        <Route path="/register" render={ (renderProps) =>
          <RegisterForm authSet={ this.authFetched } history={ renderProps.history } />
        } />
        <Route path="/upload" render={ (renderProps) =>
          this.state.auth ? <Uploader history={ renderProps.history } /> : <RegisterForm authSet={ this.authFetched } history={ renderProps.history } />
        } />



      </div>
    );
  }
}

export default App;
