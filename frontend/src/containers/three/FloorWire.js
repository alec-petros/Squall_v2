import React from 'react';
import * as THREE from 'three';
import {MeshLine, MeshLineMaterial} from 'three.meshline'

class FloorWire extends React.Component {

  componentDidMount() {
    const box = new THREE.BoxGeometry(3000, 1, 2000, 20, 1, 30)
    var line = new MeshLine();
    line.setGeometry( box );
    const material = new MeshLineMaterial({color: new THREE.Color('#d200f7'), lineWidth: 5});
    var mesh = new THREE.Mesh( line.geometry, material )
    this.refs.group.add(mesh)
  }

  render() {
    return (
      <group
        position={this.props.position}
        ref="group"
        />
    )
  }
}

export default FloorWire
