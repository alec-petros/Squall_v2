import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import { connect } from 'react-redux'
import { logout, setSongs, setSongsStream } from '../actions/actions'

class NavBar extends React.Component {
  render() {
    let navItems = null
    this.props.auth ?
    navItems = (
      <Nav pullRight>
        <Navbar.Text onClick={() => this.props.history.push(`/users/${this.props.auth.user_id}`)}>
          Signed in as: {this.props.auth.username}
        </Navbar.Text>
        <Navbar.Text onClick={() => this.props.history.push(`/upload`)}>
          Upload
        </Navbar.Text>
        <Navbar.Text onClick={this.props.logout}>
          Logout
        </Navbar.Text>
      </Nav>
    ) :
    navItems = (
      <Nav pullRight>
        <Navbar.Text onClick={() => this.props.history.push(`/register`)}>
          Register
        </Navbar.Text>
        <Navbar.Text onClick={() => this.props.history.push(`/login`)}>
          Login
        </Navbar.Text>
      </Nav>
    )
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a onClick={() => {
                this.props.setSongsStream(this.props.auth.user_id)
                this.props.history.push(`/`)
              }}>Squall V1</a>
          </Navbar.Brand>
        </Navbar.Header>
        {navItems}
      </Navbar>
    )
  }
}

function mapStateToProps(state) {
  return {auth: state.auth}
}

export default connect(mapStateToProps, { logout, setSongs, setSongsStream })(NavBar)
