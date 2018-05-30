import React from 'react';
import * as THREE from 'three';

class Resources extends React.Component {

  container = {

  }

  componentDidMount() {
    this.container.sphere = new THREE.SphereBufferGeometry(this.props.radius, this.props.widthSegments, this.props.heightSegments)
    this.container.morphArr = [...this.container.sphere.attributes.position.array]
    this.container.sphere.dynamic = true
    this.container.mat = new THREE.MeshPhongMaterial({emissive: "#600080", color: '0x00ff00', emissiveIntensity: 10})
    this.container.mesh = new THREE.Mesh(this.container.sphere, this.container.mat)
    console.log('sphere', this.container.sphere)
    this.refs.group.add(this.container.mesh)
    console.log(this.container.mesh)
  }

  render() {
    if (this.props.data && this.container.sphere ) {
      this.container.mesh.geometry.attributes.position.needsUpdate = true
      let i = 0;
      let x = 0
      var position = this.container.mesh.geometry.attributes.position
      // for (let i = 0; i < position.count; i++) {
      //   position.setY(i, 10)
      // }
      // position.needsUpdate = true
      position.array.map(face => {
        if (position.array[i] > (this.container.morphArr[i] + ((this.props.data()[x] / 5) - 24))) {
          position.array[i] = (this.container.morphArr[i] + ((this.props.data()[x] / 5) - 24))
        } else {
          position.array[i] = (((position.array[i] * 20) + this.container.morphArr[i] + ((this.props.data()[x] / 5) - 24)) / 21)
        }
        i++
        x++
        x === this.props.data().length ? x = 0 : null
      })
      // console.log(this.props.data()[1] / 10)
      // console.log(this.props.data)
      // this.container.mesh.setGeometry(this.container.sphere)
      // console.log('this should work', this.container.mesh)
    }
    return (
      <group
        ref="group"
        position={this.props.position}
        rotation={this.props.rotation}
        />
    )
  }
}

export default Resources
