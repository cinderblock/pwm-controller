import React from 'react';
import PWMController from './PWMController.jsx';

var config = require('../config.js').client;

export default class ControllerContainer extends React.Component {
  render() {
    return (
      <PWMController serverOrigin={config.serverOrigin} />
    );
  }
};
