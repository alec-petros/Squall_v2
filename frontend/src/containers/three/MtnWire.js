import React from 'react';
import * as THREE from 'three';
import {MeshLine, MeshLineMaterial} from 'three.meshline'
import vapor_mtn from '../../models/vapor_mtn.obj'

class MtnWire extends React.Component {

  state = {
    modArr: [0, 1, 2, 3, 2, 1, 0, -1, -2, -3, -2, -1]
  }

  objContainer = {
    line: new MeshLine()
  }

  componentDidMount() {
    this.THREE = THREE;
    const objLoader = new this.THREE.OBJLoader();
    objLoader.load(
      vapor_mtn,
      ( object ) => {
        // const material = new THREE.MeshPhongMaterial({color: '#0b0019'})
        console.log(object.children[0])
        var geometry = new THREE.Geometry()
        let vertices = []
        for (var i = 0; i < object.children[0].geometry.attributes.position.array.length; i) {
          geometry.vertices.push(new THREE.Vector3(object.children[0].geometry.attributes.position.array[i], object.children[0].geometry.attributes.position.array[i + 1], object.children[0].geometry.attributes.position.array[i + 2]))
          i = i + 3
        }
        object.children.forEach(child => child.material = this.props.material)
        this.objContainer.obj = object
        this.objContainer.line.setGeometry( geometry );
        this.objContainer.line.geometry.attributes.position.dynamic = true
        this.objContainer.line.geometry.attributes.position.needsUpdate = true

        const material = new MeshLineMaterial({color: new THREE.Color('#d200f7'), lineWidth: 1});
        var mesh = new THREE.Mesh( this.objContainer.line.geometry, material )
        this.refs.group.add(mesh)
      },
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      function ( error ) {
        console.log( error );
      }
    );

  }

  render() {
    // if (this.objContainer.box && this.props.sin.length === 430) {
    //   let i = 0
    //   let x = 0
    //   this.objContainer.box.vertices.forEach(vert => {
    //     // console.log(vert)
    //     vert.y += (this.props.sin[i])
    //     // vert.z += (this.props.sin[i] * 2)
    //     this.objContainer.line.geometry.attributes.position.array[x++] = vert.x
    //     this.objContainer.line.geometry.attributes.position.array[x++] = vert.y
    //     this.objContainer.line.geometry.attributes.position.array[x++] = vert.z
    //     i < (this.props.sin.length - 1) ? i++ : i = 0
    //   })
    //   this.objContainer.line.setGeometry( this.objContainer.box )
    // }
    return (
      <group
        position={this.props.position}
        rotation={this.props.rotation}
        scale={new THREE.Vector3(this.props.scale, this.props.scale, this.props.scale)}
        ref="group"
        />
    )
  }
}

export default MtnWire
