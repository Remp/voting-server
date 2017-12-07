import {List, Map} from 'immutable';
import {VOTE_LIMIT} from './constants';

export function setEntries(state, entries){
    return state.set('entries', new List(entries));
}
export function next(state){
    const entries = state.get("entries").concat(getWinner(state.get('vote')));
    if (entries.size === 1)
        return state.remove('vote').remove('entries').set('winner', entries.first());
    return state.merge(Map({
        vote: new Map({
            pairs: entries.take(2)
        }),
        entries: entries.skip(2)
    }))
}
export function vote(state, entry){
    const current = state.updateIn(['vote','tally', entry], 0, tally => tally + 1);
    let summ = 0;
    current.getIn(['vote', 'tally']).map(v => summ += v);
    console.log(summ);
    if (summ >= VOTE_LIMIT)
    {
        return next(current)        
    }
    return current
}
export const INITIAL_STATE = new Map();


function getWinner(vote){
    if (!vote) 
        return [];
    const [a, b] = vote.get('pairs');
    const valA = vote.getIn(['tally', a], 0);
    const valB = vote.getIn(['tally', b], 0);
    if (valA > valB)
        return [a];
    else if (valA < valB)
        return [b];
    else 
        return [a, b];
}