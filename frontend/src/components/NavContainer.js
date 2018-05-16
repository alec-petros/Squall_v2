import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'

class NavBar extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Squall V1</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          { this.props.auth ?
            <Navbar.Text>
              Signed in as: {this.props.auth.username}
            </Navbar.Text> :
            <NavItem href="/register">
              Register
            </NavItem>
          }
          { !this.props.auth ?
            <NavItem href="/login">
              Login
            </NavItem> :
            <NavItem onClick={this.logout} href="/">
              Logout
            </NavItem>
          }
        </Nav>
      </Navbar>
    )
  }
}

export default NavBar
