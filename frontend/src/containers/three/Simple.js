import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import OBJLoader from 'three-obj-loader'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { swapMode } from '../../actions/actions'
import grid from '../../images/grid.png'
import stars from '../../images/stars.jpg'
import Box from './Box'
import Resources from './Resources'
import FloorWire from './FloorWire'
import mtn_obj from '../../models/mtn/mtn_obj.obj'
import Loader from './Loader'
import city from '../../models/city/city.obj'
import peak from '../../models/peak/peak.obj'
import vapor_mtn from '../../models/vapor_mtn.obj'
import rand from '../../models/rand.obj'
import MtnWire from './MtnWire'

OBJLoader(THREE)

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 0, 5);
    this.extrudePosition = new THREE.Vector3(0, 0, -175)
    this.spherePos = new THREE.Vector3(0, 250, -800)
    this.sphereRot = new THREE.Euler(0, 0, 0)
    this.ringRot = new THREE.Euler(0, 0, 0)
    this.otherRingRot = new THREE.Euler(0, 0, 0)
    this.wallPos = new THREE.Vector3(0, -650, -990)
    this.mtnPos = new THREE.Vector3(0, 0, -880)
    this.cityPos = new THREE.Vector3(-800, -150, -800)
    this.peakPos = new THREE.Vector3(700, -100, -550)
    this.peakRot = new THREE.Euler(0, 1.3, 0)
    this.objPos = new THREE.Vector3(450, -150, -800)
    this.vaporPos = new THREE.Vector3(-120, -250, -600)
    this.vaporRot = new THREE.Euler(0, 3.1, 0)
    this.leftWavePosition = new THREE.Vector3(210, -135, -500)
    this.rightWavePosition = new THREE.Vector3(10, -150, -500)
    this.leftWaveRot = new THREE.Euler(1.4, 0, 1.55)
    this.rightWaveRot = new THREE.Euler(-1.7, 0, 1.55)
    this.floorPosition = new THREE.Vector3(0, -250, -100)
    this.subPosition = new THREE.Vector3(0, -275, -100)

    this.blackMat = new THREE.MeshPhongMaterial({color: '#0b0019'})
    this.wireMat = new THREE.MeshPhongMaterial({wireframe: true, color: "red"})

    this.state = {
      cubeRotation: new THREE.Euler(),
      cubeSize: 0,
      rms: 0,
      waveLines: []
    };

    this.frameCount = 0

    this.sinFunc = []

    this._onAnimate = () => {
      // we will get this callback every frame
      // this.ringRot.x += 0.05;
      // this.ringRot.y += 0.05;
      this.ringRot = new THREE.Euler(this.ringRot.x + 0.005, this.ringRot.y + 0.005, 0)
      this.otherRingRot = new THREE.Euler(this.otherRingRot.x - 0.005, this.otherRingRot.y + 0.005, 0)

      this.sinFunc.push(Math.sin((this.frameCount++ / 10)))
      this.sinFunc.length === 431 ? this.sinFunc = this.sinFunc.slice(1, 431) : null
      // console.log(this.sinFunc)

      if (this.props.dataArray) {
        let tempRms
        if (Math.abs(this.props.dataArray()[5]) > this.state.rms) {
          tempRms = (this.state.rms * 3 + Math.abs(this.props.dataArray()[5])) / 4
        } else {
          tempRms = this.state.rms - 1
        }
        let spacing = (window.innerWidth/this.props.dataArray().length) * 1.5
        let x = window.innerWidth
        const data = this.props.dataArray()
        let arr = []
        for (let i = 0; i < data.length; i++) {
          arr.push(new THREE.Vector3(x -= spacing, data[i], 0))
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
      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
    };
  }

  componentDidMount(){
    this.props.swapMode()
  }

  componentWillUnmount() {
    this.props.swapMode()
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
            <perspectiveCamera
              name="camera"
              fov={80}
              aspect={width / height}
              near={0.1}
              far={1000}
              position={this.cameraPosition}
              />
            <line
              position={this.leftWavePosition}
              rotation={this.leftWaveRot}
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
            <line
              position={this.rightWavePosition}
              rotation={this.rightWaveRot}
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
            <Box
              position={this.spherePos}
              rotation={this.sphereRot}
              radius={100}
              widthSegments={35}
              heightSegments={35}
              data={this.props.dataArray}
              />
            <mesh
              position={this.spherePos}
              rotation={this.ringRot}
              castShadow={true}
              >
              <ringGeometry
                innerRadius={200}
                outerRadius={230}
                thetaSegments={40}
                phiSegments={8}
                />
              <meshPhongMaterial
                color={'#0b0019'}
                transparent={true}
                opacity={0.5}
                shininess={100}
                metal={true}

                />
            </mesh>
            <mesh
              position={this.spherePos}
              rotation={this.otherRingRot}
              castShadow={true}
              >
              <ringGeometry
                innerRadius={180}
                outerRadius={200}
                thetaSegments={40}
                phiSegments={8}
                />
              <meshPhongMaterial
                color={'#0b0019'}
                transparent={true}
                opacity={0.5}
                shininess={100}
                metal={true}

                />
            </mesh>
            <Loader object={rand} material={this.blackMat} scale={180} position={this.vaporPos} rotation={this.vaporRot} />
            <MtnWire scale={180} position={this.vaporPos} rotation={this.vaporRot} />
            <FloorWire position={this.floorPosition} sin={this.sinFunc} />
            <mesh
              position={this.subPosition}
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
                width={3500}
                height={3500}
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

export default connect(mapStateToProps, {swapMode})(Simple)
