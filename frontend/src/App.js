import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Uploader from './components/Uploader'
import SongList from './containers/SongList'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import NavContainer from './components/NavContainer'
import {
  BrowserRouter as Switch,
  Redirect,
  Route
} from 'react-router-dom';
import Transport from './components/Transport'

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

  logout = () => {
    localStorage.removeItem("auth")
    this.setState({ auth: null })
  }

  render() {
    console.log(this.state.songs)
    return (
      <div className="App">
        <div id="main-body">
          <NavContainer auth={this.state.auth} />
          <Route exact path="/" render={ (renderProps) =>
            <SongList songs={ this.state.songs } history={ renderProps.history }/>
          } />
          <Route path="/register" render={ (renderProps) =>
            <RegisterForm authSet={ this.authFetched } history={ renderProps.history } />
          } />
          <Route path="/upload" render={ (renderProps) =>
            this.state.auth ? <Uploader history={ renderProps.history } /> : <RegisterForm authSet={ this.authFetched } history={ renderProps.history } />
          } />
          <Route path="/login" render={ (renderProps) =>
            <LoginForm authSet={ this.authFetched } history={ renderProps.history } />
          } />
        </div>
        <Transport />
      </div>
    );
  }
}

export default App;
