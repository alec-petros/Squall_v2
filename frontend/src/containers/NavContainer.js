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
            <a onClick={() => this.props.history.push(`/`)}>Squall V1</a>
          </Navbar.Brand>
        </Navbar.Header>
        { this.props.auth ?
          <Navbar.Text onClick={() => this.props.history.push(`/user/${this.props.auth.user_id}`)}>
            Signed in as: {this.props.auth.username}
          </Navbar.Text> :
          null
        }
        <Nav pullRight>
          { !this.props.auth ?
            <Navbar.Text onClick={() => this.props.history.push(`/register`)}>
              Register
            </Navbar.Text> :
            null
          }
          { this.props.auth ?
            <Navbar.Text onClick={() => this.props.history.push(`/upload`)}>
              Upload
            </Navbar.Text> :
            null
          }
          { !this.props.auth ?
            <Navbar.Text onClick={() => this.props.history.push(`/login`)}>
              Login
            </Navbar.Text> :
            <Navbar.Text onClick={this.props.logout}>
              Logout
            </Navbar.Text>
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
