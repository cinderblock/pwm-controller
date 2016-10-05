import React from 'react';
import ReactSlider from 'react-slider';

import socketIO from 'socket.io-client';

import config from '../config.js';

// TODO: Parametrize this...
var id = 'demo';

const MAXslider = 100 * 1000;

export default class PWMController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duty: 10*1000,
      period: 20*1000,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    if (event[0] != this.state.duty) {
      this.setState({
        duty: event[0],
      });
      this.io.emit('command', {id, type: 'duty', data: event[0] * 1000});
    }
    if (event[1] != this.state.period) {
      this.setState({
        period: event[1],
      });
      this.io.emit('command', {id, type: 'period', data: event[1] * 1000});
    }
  }
  componentDidMount() {
    this.io = new socketIO(config.client.serverOrigin);
    this.io.emit('command', {id, type:'enable'});
  }
  render() {
    var perc = this.state.duty / this.state.period;
    var hz = 1 / (this.state.period);

    return (
      <div className="PWMController">
        <ReactSlider withBars snapDragDisabled
          value={[this.state.duty, this.state.period]}
          min={0} max={MAXslider}
          onChange={this.handleChange}
        >
          <div className="duty">{(perc*100).toFixed(2)}%</div>
          <div className="period">Hz</div>
        </ReactSlider>
      </div>
    );
  }
};
