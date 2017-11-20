import Server from "socket.io";

export function startServer(store){
    const io = new Server().attach("8090");

    //при каждом изменении state всем клиентам шлем новый state
    store.subscribe(() => {
        io.emit("state", store.getState().toJS());
    })

    //при подключении отослать текущий state
    io.on('conneсtion', socket => {
        socket.emit("state", store.getState().toJS());
        socket.on("action", store.dispatch.bind(store));
    })
}