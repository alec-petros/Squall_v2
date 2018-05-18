import React from 'react';
import play from '../images/play.png'
import pause from '../images/pause.png'
import { connect } from 'react-redux'
import {transportClick} from '../actions/actions'

class Transport extends React.Component {

  state = {
    activeSong: null
  }

  audioStore = {
    audioCtx: new (window.AudioContext || window.webkitAudioContext)()
  }

  componentDidMount() {
    this.audioStore.analyser = this.audioStore.audioCtx.createAnalyser();
    this.audioStore.canvas = document.getElementById("transport-canvas")
    this.audioStore.canvasCtx = this.audioStore.canvas.getContext('2d')

    this.audioStore.htmlElement = document.getElementById('transport-audio')
    this.audioStore.source = this.audioStore.audioCtx.createMediaElementSource(this.audioStore.htmlElement);
    this.audioStore.source.connect(this.audioStore.analyser);
    this.audioStore.analyser.connect(this.audioStore.audioCtx.destination);

    this.audioStore.analyser.fftSize = 2048;
    this.audioStore.bufferLength = this.audioStore.analyser.frequencyBinCount;
    this.audioStore.dataArray = new Uint8Array(this.audioStore.bufferLength);

    this.audioStore.analyser.getByteTimeDomainData(this.audioStore.dataArray);
    this.audioStore.htmlElement.play()
    this.draw();
  }

  draw = () => {
    requestAnimationFrame(this.draw);

    this.audioStore.canvas.width = document.body.clientWidth

    this.audioStore.analyser.getByteTimeDomainData(this.audioStore.dataArray)

    this.audioStore.canvasCtx.fillStyle = 'rgb(240, 240, 240)';
    this.audioStore.canvasCtx.fillRect(0, 0, this.audioStore.canvas.width, this.audioStore.canvas.height);

    this.audioStore.canvasCtx.lineWidth = 2;
    this.audioStore.canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

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
    this.audioStore.canvasCtx.lineTo(this.audioStore.canvas.width, this.audioStore.canvas.height/2);
    this.audioStore.canvasCtx.stroke();
  };

  startPlayback = () => {
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
        <audio crossOrigin="anonymous" src={this.props.activeSong.url} id="transport-audio"></audio>
        <canvas id="transport-canvas" width="800" height='100'></canvas>
      </div>
    )
  }
}

function mapPoopToProps(state) {
  return {activeSong: state.activeSong, transportMode: state.transportMode}
}

export default connect(mapPoopToProps, {transportClick})(Transport)
