// @ts-check
import { io } from 'socket.io-client';

import init from './main.js'

var socket = io();

init(socket).then(() => {});
