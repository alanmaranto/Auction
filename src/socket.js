import openSocket from 'socket.io-client';
import api from './api/api';

export const socket = openSocket(api.host);

export const registerUserIOToken = (userId) => {
  socket.emit('registerUserIOToken', { userId, id: socket.id });
};

export default socket;
