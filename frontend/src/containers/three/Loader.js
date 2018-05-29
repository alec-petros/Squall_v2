import React from 'react';
import * as THREE from 'three';
import city from '../../models/city/city.obj'
import peak from '../../models/peak/peak.obj'

class Loader extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.THREE = THREE;
    const objLoader = new this.THREE.OBJLoader();
    objLoader.load(
      this.props.object,
      ( object ) => {
        // const material = new THREE.MeshPhongMaterial({color: '#0b0019'})
        console.log(object)
        object.children.forEach(child => child.material = this.props.material)
        this.refs.group.add(object);
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
    return (
      <group
        ref='group'
        scale={new THREE.Vector3(this.props.scale, this.props.scale, this.props.scale)}
        position={this.props.position}
        rotation={this.props.rotation}
        />
    )
  }
}

export default Loader
