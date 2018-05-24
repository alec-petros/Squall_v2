import React from 'react';
import * as THREE from 'three';

class Resources extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <mesh
        rotation={this.state.cubeRotation}
      >
        <boxGeometry
          width={this.props.width}
          height={this.props.height}
          depth={this.props.depth}
        />
        <meshLambertMaterial
          emissive="#600080"
          color={0x00ff00}
        />
      </mesh>
    )
  }
}

export default Resources
