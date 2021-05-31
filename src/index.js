// @ts-check
import { io } from 'socket.io-client';
import { render } from 'react-dom';

import init from './main.js';

const socket = io();

init(socket).then((vdom) => {
  render(vdom, document.querySelector('#chat'));
});
