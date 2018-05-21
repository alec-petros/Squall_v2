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
          <Button bsStyle="danger">/profile</Button>
          <Button bsStyle="danger">/streams</Button>
          <Button
            bsStyle="danger"
            onClick={() => {
              this.props.setSongs()
              this.props.history.push('/')
            }}>/all</Button>
          <Button bsStyle="danger">/groups</Button>
        </ButtonGroup>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {auth: state.auth}
}

export default connect(mapStateToProps, {setSongs, setSongsStream})(SidebarContainer)
