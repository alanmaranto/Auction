import openSocket from 'socket.io-client';
import api from './api';

export const socket = openSocket(api.host);

export const registerUserIOToken = (token) => {
  socket.emit('registerUserIOToken', { token, id: socket.id });
};

export const sendUserMessage = (request) => {
  socket.emit('GetNewMessages', request);
};

export default socket;
