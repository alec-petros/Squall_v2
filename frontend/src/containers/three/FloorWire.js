import React from 'react';
import * as THREE from 'three';
import {MeshLine, MeshLineMaterial} from 'three.meshline'

class FloorWire extends React.Component {

  state = {
    modArr: [0, 1, 2, 3, 2, 1, 0, -1, -2, -3, -2, -1]
  }

  objContainer = {
    line: new MeshLine()
  }

  componentDidMount() {
    this.objContainer.box = new THREE.BoxGeometry(3000, 1, 2000, 400, 1, 15)
    this.objContainer.line.setGeometry( this.objContainer.box );
    this.objContainer.line.geometry.attributes.position.dynamic = true
    this.objContainer.line.geometry.attributes.position.needsUpdate = true

    const material = new MeshLineMaterial({color: new THREE.Color('#56e5ff'), lineWidth: 2});
    var mesh = new THREE.Mesh( this.objContainer.line.geometry, material )
    console.log('mesh', mesh.geometry.attributes.position)
    this.refs.group.add(mesh)
  }

  render() {
    if (this.objContainer.box && this.props.sin.length === 430) {
      let i = 0
      let x = 0
      this.objContainer.box.vertices.forEach(vert => {
        // console.log(vert)
        vert.y += (this.props.sin[i])
        // vert.z += (this.props.sin[i] * 2)
        this.objContainer.line.geometry.attributes.position.array[x++] = vert.x
        this.objContainer.line.geometry.attributes.position.array[x++] = vert.y
        this.objContainer.line.geometry.attributes.position.array[x++] = vert.z
        i < (this.props.sin.length - 1) ? i++ : i = 0
      })
      this.objContainer.line.setGeometry( this.objContainer.box )
    }
    return (
      <group
        position={this.props.position}
        ref="group"
        />
    )
  }
}

export default FloorWire
