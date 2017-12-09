export let ipStorage = []
export function addNote(ip){
    if (!ipStorage.some(elem => elem.ip === ip))
        ipStorage.push({
            ip: ip
        });
}
export function removeNote(ip){
    for(let i = 0; i < ipStorage.length; i++){
        if (ipStorage[i].ip === ip)
            ipStorage.splice(i, 1);
    }
}
export function getNote(ip){
    ipStorage.map((elem) => {
        if (elem.ip === ip)
            return elem
    })
}
export function reset(){
    ipStorage.forEach(elem => {
        elem.hasVoted = undefined;
    })
}
export function setNote(ip, entry){
    ipStorage.forEach(elem => {
        if (elem.ip === ip)
            elem.hasVoted = entry;
    })
}