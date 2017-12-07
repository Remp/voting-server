import {makeStore} from './src/store';
import startServer from './src/server';
import entries from './src/entries';
import io from 'socket.io';

export const store = makeStore();


startServer(store);

store.dispatch({
    type: "SET_ENTRIES",
    entries: entries
});
console.log('dispatched');
store.dispatch({
    type: "NEXT"
});
