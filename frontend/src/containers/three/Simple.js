import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import OBJLoader from 'three-obj-loader'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import grid from '../../images/grid.png'
import stars from '../../images/stars.png'
import Box from './Box'
import Resources from './Resources'
import mtn_obj from '../../models/mtn/mtn_obj.obj'
import Loader from './Loader'
import city from '../../models/city/city.obj'
import peak from '../../models/peak/peak.obj'

OBJLoader(THREE)

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 0, 5);
    this.extrudePosition = new THREE.Vector3(0, 0, -175)
    this.torusPosition = new THREE.Vector3(0, 250, -920)
    this.wallPos = new THREE.Vector3(0, 0, -990)
    this.mtnPos = new THREE.Vector3(0, 0, -880)
    this.cityPos = new THREE.Vector3(-500, -150, -800)
    this.peakPos = new THREE.Vector3(600, -50, -550)
    this.peakRot = new THREE.Euler(0, 90, 0)
    this.objPos = new THREE.Vector3(450, -150, -800)
    this.wavePosition = new THREE.Vector3(-80, -130, -500)
    this.floorPosition = new THREE.Vector3(0, -200, -100)

    let point = new THREE.Vector3(0, 0, 0)
    this.wirePoints = [new THREE.Vector3(30, 0, -10), new THREE.Vector3(30, 50, 0), new THREE.Vector3(-20, 30, 0), new THREE.Vector3(10, 0, 20), new THREE.Vector3(-30, 10, 14), new THREE.Vector3(30, 0, -10)]
    this.wirePos = new THREE.Vector3(0, 0, -100)

    this.blackMat = new THREE.MeshPhongMaterial({color: '#0b0019'})

    this.state = {
      cubeRotation: new THREE.Euler(),
      cubeSize: 0,
      rms: 0,
      waveLines: []
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
        let spacing = (window.innerWidth/this.props.dataArray().length) * 1.5
        let x = -(window.innerWidth / 2)
        const data = this.props.dataArray()
        let arr = []
        for (let i = 0; i < data.length; i++) {
          arr.push(new THREE.Vector3(x += spacing, data[i], 0))
        }
        this.setState({
          cubeRotation: new THREE.Euler(
            this.state.cubeRotation.x + 0.003,
            this.state.cubeRotation.y + 0.003,
            0
          ),
          waveLines: arr,
          cubeSize: (this.props.dataArray()[5] + (this.state.cubeSize * 10))/ 11,
          rms: tempRms
        });
      } else {
        this.setState({
          cubeRotation: new THREE.Euler(
            this.state.cubeRotation.x + 0.00,
            this.state.cubeRotation.y + 0.00,
            this.state.cubeRotation.z + 0.01
          ),
        });
      }
      let z = 1
      this.wirePoints = this.wirePoints.map(point => {
        let int = Math.random()
        int >= 0.5 ? z++ : z--
        return new THREE.Vector3(point.x + z, point.y + z, point.z + z)
      })
      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
    };
  }

  componentDidMount(){
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    const lightPos = new THREE.Vector3(20, 0, 0)
    const otherLightPos = new THREE.Vector3(0, 0, 0)
    // const otherLightRot = new THREE.Euler(51, 60, 0)
    const otherLightRot = new THREE.Euler(90, 0, 0)
    const sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0xCC0000
      });

    return (
      <div id="threeCanvas">
        <React3
          mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
          width={width}
          height={height}
          clearAlpha={0}
          alpha={true}
          antialias={true}
          onAnimate={this._onAnimate}
          >
          <Resources />
          <scene>
            <pointLight
              position={this.torusPosition}
              />
            <pointLight
              position={otherLightPos}
              />
            <perspectiveCamera
              name="camera"
              fov={80}
              aspect={width / height}
              near={0.1}
              far={1000}
              position={this.cameraPosition}
              />
            <line
              position={this.wavePosition}
              castShadow={true}
              >
              <geometry
                vertices={this.state.waveLines}
                />
              <lineBasicMaterial
                color={0x00ff00}
                blending={THREE.MultiplyBlending}
                />
            </line>
            <Loader object={city} scale={800} position={this.cityPos} material={this.blackMat} />
            <Loader object={peak} scale={350} position={this.peakPos} material={this.blackMat} rotation={this.peakRot} />
            <mesh
              position={this.torusPosition}
              rotation={this.state.cubeRotation}
              castShadow={true}
              >
              <torusKnotGeometry
                radius={this.state.rms / 3}
                tube={10 + (this.state.rms / 10)}
                p={4}
                tubularSegments={100}
                radialSegments={20}
                >
              </torusKnotGeometry>
              <meshPhongMaterial
                color={'#ffb50a'}
                metal={true}
                />
            </mesh>
            <mesh
              position={this.mtnPos}
              receiveShadow={true}
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
                    x={-1200}
                    y={-250}
                    />
                  <lineTo
                    x={-1200}
                    y={470 - (this.state.rms / 10)}
                    />
                  <lineTo
                    x={-1000}
                    y={140}
                    />
                  <lineTo
                    x={-860}
                    y={300 - (this.state.rms / 10)}
                    />
                  <lineTo
                    x={-650}
                    y={60}
                    />
                  <lineTo
                    x={-430}
                    y={420 - (this.state.rms / 10)}
                    />
                  <lineTo
                    x={-110}
                    y={-100}
                    />
                  <lineTo
                    x={0}
                    y={-160}
                    />
                  <lineTo
                    x={300}
                    y={560 - (this.state.rms / 10)}
                    />
                  <lineTo
                    x={650}
                    y={60}
                    />
                  <lineTo
                    x={800}
                    y={300 - (this.state.rms / 10)}
                    />
                  <lineTo
                    x={1200}
                    y={60}
                    />
                  <lineTo
                    x={1200}
                    y={-250}
                    />
                  <lineTo
                    x={-1200}
                    y={-250}
                    />
                </shape>
              </extrudeGeometry>
              <meshLambertMaterial
                color={'#290059'}
                />
            </mesh>
            <line
              position={this.wirePos}
              name="wireframe"
              >
              <geometry
                vertices={this.wirePoints}>
              </geometry>
              <lineBasicMaterial
                color={'#e5e5e5'}
                />
            </line>
            <mesh
              position={this.floorPosition}
              receiveShadow={true}
              name="floor"
              >
              <boxGeometry
                widthSegments={30}
                depthSegments={20}
                width={3000}
                height={1}
                depth={2000}
                />
              <meshPhongMaterial
                wireframe={true}
                wireframeLinewidth={20}
                color={'#d200f7'}
                >
              </meshPhongMaterial>
            </mesh>
            <mesh
              position={this.floorPosition}
              receiveShadow={true}
              name="subFloor"
              >
              <boxGeometry
                width={3000}
                height={1}
                depth={2000}
                />
              <meshLambertMaterial
                color={'#000000'}
                >
              </meshLambertMaterial>
            </mesh>

            <mesh
              position={this.wallPos}
              name="wall"
              >
              <boxGeometry
                width={3000}
                height={3000}
                depth={1}
                />
              <meshLambertMaterial>
                <texture
                  url={stars}
                  minFilter={THREE.NearestFilter}
                  repeat={new THREE.Vector2(1, 2)}
                  offset={new THREE.Vector2(0, -1)}
                  />
              </meshLambertMaterial>
            </mesh>
          </scene>
        </React3>
      </div>)
  }
}

function mapStateToProps (state) {
  return {dataArray: state.dataArray}
}

export default connect(mapStateToProps)(Simple)
