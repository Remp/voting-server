const io = require('socket.io');
import {increment, decrement, VOTE_LIMIT} from './constants';
import {ipStorage, addNote, removeNote, getNote, setNote} from './ip_storage';

export default (store) => {
    const server = io();
    
    store.subscribe(() => {
        server.sockets.emit("state", store.getState().toJS());
    })
    server.on('connect', socket => {
        let ip = socket.handshake.address;        
        console.log(`${ip} has joined`);
        addNote(ip);
        socket.on('disconnect', () => {
            decrement();
        });
        const newState = store.getState().toJS();
        newState.hasVoted = getNote(ip) && getNote(ip).hasVoted;;
        socket.emit("state", newState);
        socket.on("action", action => {
            setNote(ip, action.entry);            
            store.dispatch(action);
        });        
        increment();
    });
    server.attach(7000);
}
