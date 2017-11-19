import {List, Map} from 'immutable';

export function setEntries(state, entries){
    return state.set('entries', new List(entries));
}
export function next(state){
    const entries = state.get("entries").concat(getWinner(state.get('vote')));
    if (entries.size === 1)
        return state.remove('vote').remove('entries').set('winner', entries.first());
    return state.merge({
        vote: new Map({
            pairs: entries.take(2)
        }),
        entries: entries.skip(2)
    })
}
export function vote(state, entry){
    state.updateIn(['vote', 'pairs', entry], 0, tally => tally + 1)
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