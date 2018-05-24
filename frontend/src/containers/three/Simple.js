import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 5);
    this.extrudePosition = new THREE.Vector3(0, 0, -175)

    this.state = {
      cubeRotation: new THREE.Euler(),
      cubeSize: 0,
      rms: 0
    };

    this._onAnimate = () => {
      // we will get this callback every frame

      if (this.props.dataArray) {
        let tempRms
        if (Math.abs(this.props.dataArray()[5]) > this.state.rms) {
          tempRms = (this.state.rms * 3 + Math.abs(this.props.dataArray()[5])) / 4
        } else {
          tempRms = this.state.rms - 1
        }
        this.setState({
          cubeRotation: new THREE.Euler(
            this.state.cubeRotation.x + 0.003,
            this.state.cubeRotation.y + 0.003,
            0
          ),
          cubeSize: (this.props.dataArray()[5] + (this.state.cubeSize * 10))/ 11,
          rms: tempRms
        });
      } else {
        this.setState({
          cubeRotation: new THREE.Euler(
            this.state.cubeRotation.x + 0.01,
            this.state.cubeRotation.y + 0.01,
            0
          ),
        });
      }
      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
    };
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    const lightPos = new THREE.Vector3(20, 0, 0)
    const sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0xCC0000
      });
    return (<React3
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={width}
      height={height}
      id="threeCanvas"
      clearAlpha={0}
      alpha={true}
      onAnimate={this._onAnimate}
    >
      <scene>
        <pointLight
          position={lightPos}
         />
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}
          position={this.cameraPosition}
        />
      <mesh
        position={this.extrudePosition}
        >
        <extrudeGeometry
          steps={5}
          amount={16}
          bevelEnabled={true}
          bevelThickness={1}
          bevelSize={4}
          bevelSegments={4}>
          <shape>
            <moveTo
              x={-(width / 2)}
              y={200-this.state.rms}
              />
            <lineTo
              x={(width / 2)}
              y={200-this.state.rms}
              />
            <lineTo
              x={(width / 2)}
              y={130}
              />
            <lineTo
              x={-(width / 2)}
              y={130}
              />
            <lineTo
              x={-(width / 2)}
              y={200-this.state.rms}
              />
          </shape>
        </extrudeGeometry>
        <meshLambertMaterial
          emissive="#600080"
          color={0x00ff00}
        />
      </mesh>
        <mesh
          rotation={this.state.cubeRotation}
        >
          <boxGeometry
            width={this.state.rms / 128}
            height={this.state.rms / 128}
            depth={this.state.rms / 128}
          />
          <meshLambertMaterial
            emissive="#600080"
            color={0x00ff00}
          />
        </mesh>
      </scene>
    </React3>);
  }
}

function mapStateToProps (state) {
  return {dataArray: state.dataArray}
}

export default connect(mapStateToProps)(Simple)
