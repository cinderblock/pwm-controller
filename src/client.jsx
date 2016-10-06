import ReactDOM from 'react-dom';
import React from 'react';
import ControllerContainer from './client/ControllerContainer.jsx';

require('bootstrap/less/bootstrap.less');

ReactDOM.render(<ControllerContainer />, document.getElementById('container'));
