import reducer from './reducer';
import {createStore} from 'redux';

export function makeStore(){
    return createStore(reducer);
}