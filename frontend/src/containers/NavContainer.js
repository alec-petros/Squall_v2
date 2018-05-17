import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import { connect } from 'react-redux'
import { logout } from '../actions/actions'

class NavBar extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Squall V1</a>
          </Navbar.Brand>
        </Navbar.Header>
        { this.props.auth ?
          <Navbar.Text>
            Signed in as: {this.props.auth.username}
          </Navbar.Text> :
          null
        }
        <Nav pullRight>
          { !this.props.auth ?
            <NavItem href="/register">
              Register
            </NavItem> :
            null
          }
          { this.props.auth ?
            <NavItem href='/upload'>
              Upload
            </NavItem> :
            null
          }
          { !this.props.auth ?
            <NavItem href="/login">
              Login
            </NavItem> :
            <NavItem onClick={this.props.logout} href="/">
              Logout
            </NavItem>
          }
        </Nav>
      </Navbar>
    )
  }
}

function mapStateToProps(state) {
  return {auth: state.auth}
}

export default connect(mapStateToProps, { logout })(NavBar)
