import React, { Component } from 'react';
import './App.css';
import Uploader from './components/Uploader'
import SongList from './containers/SongList'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import NavContainer from './containers/NavContainer'
import SidebarContainer from './containers/SidebarContainer'
import Transport from './components/Transport'
import ShowTrack from './components/ShowTrack'
import ShowUser from './components/ShowUser'
import Simple from './containers/three/Simple'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import { setAuth, logout, setSongs, setSongsStream, getFavorites } from './actions/actions'
import {
  Route
} from 'react-router-dom';


class App extends Component {

  componentWillMount() {
    if (localStorage.auth) {
      const auth = JSON.parse(localStorage.auth)
      this.props.setAuth(auth)
      this.props.getFavorites(auth)
      this.props.setSongsStream(auth.user_id)
    } else {
      this.props.setSongs()
    }
  }

  authFetched = (auth) =>{
    localStorage.auth = JSON.stringify(auth);
    this.setState({ auth });
  }

  logout = () => {
    localStorage.removeItem("auth")
    this.props.logout()
    this.setState({ auth: null })
  }

  render() {
    return (
      <div className="App">
        <Route path="/simple" component={Simple} />
        <NavContainer history={this.props.history} logout={this.logout} />
        <SidebarContainer history={this.props.history} />
        <div id="mainBody">
          <Route exact path="/" render={ (renderProps) =>
              <SongList history={ renderProps.history } songs={ this.props.songs } />
            } />
          <Route path="/register" render={ (renderProps) =>
            <RegisterForm authSet={ this.authFetched } history={ renderProps.history } />
          } />
          <Route path="/upload" render={ (renderProps) =>
            this.props.auth ? <Uploader history={ renderProps.history } /> : <RegisterForm authSet={ this.authFetched } history={ renderProps.history } />
          } />
          <Route path="/login" render={ (renderProps) =>
            <LoginForm authSet={ this.authFetched } history={ renderProps.history } />
          } />
        <Route path="/tracks/:id" component={ShowTrack} />
        <Route path="/users/:id" component={ShowUser} />
        </div>
        {
          this.props.activeSong ?
          <Transport key="transport" /> :
          null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, songs: state.songs, activeSong: state.activeSong }
}

export default withRouter(connect(mapStateToProps, { setAuth, logout, setSongs, setSongsStream, getFavorites })(App));
