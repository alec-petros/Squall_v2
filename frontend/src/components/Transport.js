import React from 'react';
import play from '../images/play.png'
import pause from '../images/pause.png'
import ReactBootstrapSlider from 'react-bootstrap-slider';
import Panel from 'react-bootstrap/lib/Panel'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import { connect } from 'react-redux'
import { transportClick, setTransportPlay } from '../actions/actions'

class Transport extends React.Component {

  state = {
    activeSong: null,
    vol: 100
  }

  audioStore = {
    audioCtx: new (window.AudioContext || window.webkitAudioContext)()
  }

  componentDidMount() {
    this.audioStore.analyser = this.audioStore.audioCtx.createAnalyser();
    this.audioStore.gainNode = this.audioStore.audioCtx.createGain()
    this.audioStore.canvas = document.getElementById("transport-canvas")
    this.audioStore.canvasCtx = this.audioStore.canvas.getContext('2d')

    // this.audioStore.htmlElement = document.getElementById('transport-audio')
    this.audioStore.htmlElement = document.createElement('audio')
    this.audioStore.htmlElement.id = "transport-audio"
    this.audioStore.htmlElement.crossOrigin = "anonymous"
    this.audioStore.htmlElement.src = this.props.activeSong.url
    this.audioStore.source = this.audioStore.audioCtx.createMediaElementSource(this.audioStore.htmlElement);
    this.audioStore.source.connect(this.audioStore.analyser);
    this.audioStore.analyser.connect(this.audioStore.gainNode);
    this.audioStore.gainNode.connect(this.audioStore.audioCtx.destination)

    this.audioStore.analyser.fftSize = 2048;
    this.audioStore.bufferLength = this.audioStore.analyser.frequencyBinCount;
    this.audioStore.dataArray = new Uint8Array(this.audioStore.bufferLength);

    this.audioStore.analyser.getByteTimeDomainData(this.audioStore.dataArray);
    this.audioStore.htmlElement.play()

    this.audioStore.grd = this.audioStore.canvasCtx.createLinearGradient(0,0,this.audioStore.canvas.width,0);
    this.audioStore.grd.addColorStop(0, 'rgba(68, 68, 68, 255)');
    this.audioStore.grd.addColorStop(0.1, 'rgba(68, 68, 68, 255)');
    this.audioStore.grd.addColorStop(0.5, 'rgba(68, 68, 68, 0)');
    // grd.addColorStop(0.9, 'rgba(68, 68, 68, 255)');
    this.audioStore.grd.addColorStop(0.6,'rgba(68, 68, 68, 255)');

    this.props.setTransportPlay(this.switchPlayback)

    this.draw();
  }

  draw = () => {
    requestAnimationFrame(this.draw);

    this.audioStore.canvas.width = document.body.clientWidth

    this.audioStore.analyser.getByteTimeDomainData(this.audioStore.dataArray)

    this.audioStore.canvasCtx.fillStyle = 'rgba(68, 68, 68, 255)';
    this.audioStore.canvasCtx.fillRect(0, 0, this.audioStore.canvas.width, this.audioStore.canvas.height);

    this.audioStore.canvasCtx.lineWidth = 2;
    this.audioStore.canvasCtx.strokeStyle = '#efefef';

    this.audioStore.canvasCtx.beginPath();


    var sliceWidth = this.audioStore.canvas.width * 1.0 / this.audioStore.bufferLength;
    var x = 27;

    for(var i = 0; i < this.audioStore.bufferLength; i++) {

      var v = this.audioStore.dataArray[i] / 128.0;
      var y = v * this.audioStore.canvas.height/2;

      if(i === 0) {
        this.audioStore.canvasCtx.moveTo(x, y);
      } else {
        this.audioStore.canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }
    this.audioStore.canvasCtx.lineTo(this.audioStore.canvas.width * 2/3, this.audioStore.canvas.height/2);
    this.audioStore.canvasCtx.stroke();

    this.audioStore.canvasCtx.fillStyle=this.audioStore.grd;
    this.audioStore.canvasCtx.fillRect(0,0,this.audioStore.canvas.width,this.audioStore.canvas.height);
  };

  changeValue = (val) => {
    this.setState({vol: val})
  }

  switchPlayback = (song) => {
    this.audioStore.htmlElement.pause()
    this.audioStore.htmlElement = document.createElement('audio')
    this.audioStore.htmlElement.id = "transport-audio"
    this.audioStore.htmlElement.crossOrigin = "anonymous"
    this.audioStore.htmlElement.src = song.url
    this.audioStore.source = this.audioStore.audioCtx.createMediaElementSource(this.audioStore.htmlElement);
    this.audioStore.source.connect(this.audioStore.analyser);
    this.audioStore.htmlElement.play()
  }

  startPlayback = () => {
    this.audioStore.htmlElement.crossOrigin = "anonymous";
    this.audioStore.htmlElement.play()
    this.props.transportClick()
  }


  stopPlayback = () => {
    this.audioStore.htmlElement.pause()
    this.props.transportClick()
  }


  render() {
    return (
      <div  id="transport">
        {
          this.props.transportMode === 'pause' ?
          <img onClick={this.startPlayback} id="play-button" src={play}></img> :
          <img onClick={this.stopPlayback} id="play-button" src={pause}></img>
        }
        <Slider
          className="volSlider"
          value={this.state.vol}
          onChange={this.changeValue}
          />
        <Panel id="transport-meta">
          <h4>{this.props.activeSong.artist}</h4>
          <p>{this.props.activeSong.name}</p>
          <p>({this.props.activeSong.play_count} Plays)</p>
        </Panel>
        <canvas id="transport-canvas" width="800" height='100'></canvas>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {activeSong: state.activeSong, transportMode: state.transportMode}
}

export default connect(mapStateToProps, { transportClick, setTransportPlay })(Transport)
