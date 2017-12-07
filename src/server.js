const io = require('socket.io');
import {increment, decrement, VOTE_LIMIT} from './constants';

export default (store) => {
    const server = io();
    
    store.subscribe(() => {
        server.sockets.emit("state", store.getState().toJS());
    })
    server.on('connect', socket => {
        console.log(`${socket.handshake.address} has joined`);
        socket.on('disconnect', () => {
            decrement();
        })
        socket.emit("state", store.getState().toJS());
        socket.on("action", store.dispatch.bind(store));
        increment();
    });
    server.attach(7000);
}