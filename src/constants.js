export let VOTE_LIMIT = 0;
export function increment(){
    VOTE_LIMIT++
}
export function decrement(){
    VOTE_LIMIT--
}
export function setLimit_forTest(val){
    VOTE_LIMIT = val
}