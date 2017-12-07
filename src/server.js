const io = require('socket.io');
import {increment, decrement, VOTE_LIMIT} from './constants';

export default (store) => {
    const server = io();
    
    store.subscribe(() => {
        console.log('in store subscr');
        server.emit("state", store.getState().toJS());
    })
    server.on('connect', socket => {
        console.log(`${socket.handshake.address} has joined`);
        socket.on('disconnect', () => {
            decrement();
            console.log('disconnected');
            console.log(VOTE_LIMIT.toString());
        })
        socket.emit("state", store.getState().toJS());
        socket.on("action", store.dispatch.bind(store));
        increment();
        console.log(VOTE_LIMIT.toString());
    });
    server.attach(7000);
}