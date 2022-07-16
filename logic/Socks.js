class Socks {
    constructor() {
        this.port;
        this.net = require("net");
        this.socks;
        this.clients = {};
        this.rooms = {};
        this.handler = {};
    }

    listen(server) {
        this.socks.listen(server, () => console.log("Socks server listen on port " + server.port));
    }

    onConnection(callback) {
        this.socks = this.net.createServer((socket) => {
            socket.__id = "########".replace(/#/g, (n) => Math.round(Math.random() * 9));
            socket.name = socket.remoteAddress + "-" + socket.remotePort;
            socket.rooms = [];
            socket.emitData = (event, data) => {
                try {
                    const obj = JSON.stringify({ event: event, data: data });
                    socket.write(obj + "\r\n");
                } catch (err) { console.log(err) };
            };
            socket.joinRoom = (id) => {
                socks.joinRoom(id, socket);
            }
            this.clients[socket.id] = socket;
            if (callback) callback(socket);

            socket.on("data", (_data) => {

                let event, data;

                try {
                    const json = JSON.parse(_data.toString());
                    event = json.event;
                    data = json.data;
                    if (!event) throw new Error("Socket event expected!");
                    if (!data) throw new Error("Socket data expected!");
                    if (this.handler[event]) this.handler[event](socket, data);
                    if (this.handler.onAny) this.handler.onAny(socket, event, data);
                } catch (err) {

                    if (this.handler.onAny) this.handler.onAny(socket, event, _data.toString());
                }
            });

            socket.on("error", (error) => {
                if (this.handler.onError) this.handler.onError(socket, error);
                for(let room of socket.rooms){
                    this.getRoom(room).kick(socket);
                }
                socket.destroy();
                delete this.clients[socket.__id];
            });

            socket.on("close", (data) => {
                if (this.handler.onDisconnect) this.handler.onDisconnect(socket);
                for(let room of socket.room){
                    this.getRoom(room).kick(socket);
                }
                delete this.clients[socket.__id];
            });
        });
    }

    onDisconnect(callback) {
        this.handler.onDisconnect = callback;
    }

    onError(callback) {
        this.handler.onError = callback;
    }

    onEvent(event, callback) {
        this.handler[event] = callback;
    }

    onAny(callback) {
        this.handler.onAny = callback;
    }

    broadcast(event, data) {
        for (let id in this.clients) {
            this.clients[id].emitData(event, data);
        }
    }

    getClients() {
        return this.clients;
    }

    getNumClients() {
        return Object.keys(this.clients).length;
    }

    createRoom(id) {
        if (!this.rooms[id]) this.rooms[id] = {
            id: id,
            members: [],
            broadcast: (socket, event, data) => {
                for (let m of this.members) {
                    if (this.clients[m] && m != socket.__id) this.clients[m].emitData(event, data);
                }
            },
            emit: (event, data) => {
                for (let m of this.members) {
                    if (this.clients[m]) this.clients[m].emitData(event, data);
                }
            },
            kick: (socket) => {
                if (this.members.includes(socket.__id)) this.members.splice(this.members.indexOf(socket.__id), 1);
                socket.rooms.splice(socket.rooms.indexOf(id) , 1);
            }
        }
    }

    removeRoom(id) {
        if (this.rooms[id]) delete this.rooms[id];
    }

    joinRoom(id, socket) {
        if (!this.rooms[id]) {
            this.rooms[id] = {
                id: id,
                members: [socket.__id],
                broadcast: (socket, event, data) => {
                    for (let m of this.members) {
                        if (this.clients[m] && m != socket.__id) this.clients[m].emitData(event, data);
                    }
                },
                emit: (event, data) => {
                    for (let m of this.members) {
                        if (this.clients[m]) this.clients[m].emitData(event, data);
                    }
                },
                kick: (socket) => {
                    if (this.members.includes(socket.__id)) {
                        this.members.splice(this.members.indexOf(socket.__id), 1);
                        socket.rooms.splice(socket.rooms.indexOf(id) , 1);
                        
                    }
                }
            }
        } else {
            this.rooms[id].members.push(socket.__id);
        }
        
        socket.rooms.push(id);
    }
    
    getRoom(id){
        return this.rooms[id];
    }
}

module.exports = Socks;

/*
const socks = new Socks();
socks.onConnection((socket) => {
    socket.emitData("eventico", "data5jsjs");
    socks.broadcast("newUser", socket.__id);
});

socks.onEvent("value", (socket, data) => {
    console.log(data);
});

socks.onAny((socket, event, data) => {
    //console.log(data);
});

const express = require("express");
const app = express();
const http = require("http");

var server = http.createServer(app)
server.listen(6666)


socks.listen(server);
*/
