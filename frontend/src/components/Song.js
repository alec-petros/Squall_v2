import React from 'react';

class Song extends React.Component {

  state = {
    audioCtx: new (window.AudioContext || window.webkitAudioContext)()
  }

  componentDidMount() {
    this.state.analyser = this.state.audioCtx.createAnalyser();
    this.state.canvas = document.getElementById(this.props.song.id)
    this.state.canvasCtx = this.state.canvas.getContext('2d')

    let source = this.state.audioCtx.createMediaElementSource(document.getElementById('song-' + this.props.song.id));
    source.connect(this.state.analyser);
    this.state.analyser.connect(this.state.audioCtx.destination);

    this.state.analyser.fftSize = 2048;
    this.state.bufferLength = this.state.analyser.frequencyBinCount;
    this.state.dataArray = new Uint8Array(this.state.bufferLength);

    this.state.analyser.getByteTimeDomainData(this.state.dataArray);
    this.draw();
  }

  draw = () => {
    let drawVisual = requestAnimationFrame(this.draw);

    this.state.canvas.width = document.body.clientWidth

    this.state.analyser.getByteTimeDomainData(this.state.dataArray)

    this.state.canvasCtx.fillStyle = 'rgb(255, 255, 255)';
    this.state.canvasCtx.fillRect(0, 0, this.state.canvas.width, this.state.canvas.height);

    this.state.canvasCtx.lineWidth = 2;
    this.state.canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    this.state.canvasCtx.beginPath();

    var sliceWidth = this.state.canvas.width * 1.0 / this.state.bufferLength;
    var x = 0;

    for(var i = 0; i < this.state.bufferLength; i++) {

      var v = this.state.dataArray[i] / 128.0;
      var y = v * this.state.canvas.height/2;

      if(i === 0) {
        this.state.canvasCtx.moveTo(x, y);
      } else {
        this.state.canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }
    this.state.canvasCtx.lineTo(this.state.canvas.width, this.state.canvas.height/2);
    this.state.canvasCtx.stroke();
  };

  render() {
    return (
      <div>
        <audio crossOrigin="anonymous" id={'song-' + this.props.song.id} src={this.props.song.url} controls> </audio>
        <canvas id={this.props.song.id} width="800" height='150'></canvas>
      </div>
    )
  }

}

export default Song
