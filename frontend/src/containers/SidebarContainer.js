import React from 'react';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'

class SidebarContainer extends React.Component {
  render() {
    return (
      <div id="sidebar">
        <ButtonGroup vertical block>
          <Button bsStyle="danger">/profile</Button>
          <Button bsStyle="danger">/streams</Button>
          <Button bsStyle="danger">/all</Button>
          <Button bsStyle="danger">/groups</Button>
        </ButtonGroup>
      </div>
    )
  }
}

export default SidebarContainer
