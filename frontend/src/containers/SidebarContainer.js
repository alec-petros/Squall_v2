import React from 'react';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import { setSongs, setSongsStream } from '../actions/actions'
import { connect } from 'react-redux'

class SidebarContainer extends React.Component {
  render() {
    return (
      <div id="sidebar">
        <ButtonGroup vertical block>
          <Button style={{backgroundColor: 'rgba(68, 68, 68, 255)'}} className="sidebarButton">/profile</Button>
          <Button style={{backgroundColor: 'rgba(68, 68, 68, 255)'}} className="sidebarButton">/streams</Button>
          <Button
            style={{backgroundColor: 'rgba(68, 68, 68, 255)'}} className="sidebarButton"
            onClick={() => {
              this.props.setSongs()
              this.props.history.push('/')
            }}>/all</Button>
          <Button style={{backgroundColor: 'rgba(68, 68, 68, 255)'}} className="sidebarButton">/groups</Button>
        </ButtonGroup>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {auth: state.auth}
}

export default connect(mapStateToProps, {setSongs, setSongsStream})(SidebarContainer)
