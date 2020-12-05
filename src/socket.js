import openSocket from 'socket.io-client';
import { host } from './api/api';

export const socket = openSocket(host);

export const registerUserIOToken = (userId) => {
  socket.emit('registerUserIOToken', { userId, id: socket.id });
};

export default socket;
