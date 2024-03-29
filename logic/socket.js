const config = require("../config.js");
const io = require(config.DIRNAME + "/server.js");
const auth = require(config.LOGIC + "/auth/authenticator.js");
const client = require(config.LOGIC + "/client/client.js");
const { User } = require(config.LOGIC + "/helpers/DB.js");

io.on("connection", async (socket) => {
    if (!socket.handshake.query) {
        socket.emit("error", "EMPTY_TOKEN");
        socket.disconnect();
        return;
    }
    const token = socket.handshake.query.token;
    if (!token) {
        socket.emit("error", "EMPTY_TOKEN")
        socket.disconnect();
        return;
    }
    const id = auth.verify(token);
    if (!id) {
        socket.emit("error", "WRONG_TOKEN");
        socket.disconnect();
        return;
    }
    const user = await User.findOne({
        where: {
            user_id: id
        }
    });
    if (!user) { 
        socket.emit("error", "USER_NOT_FOUND");
        socket.disconnect();
        return;
    }

    if (io.sockets[id]) {
        io.sockets[id].emit("error", "OTHER_CONNECT");
        io.sockets[id].disconnect();
        delete io.sockets[id];
    }
    io.sockets[id] = socket;
    await user.setData({
        isOnline: true
    });
    
    socket.__id__ = id;
    
    client(io, socket, id);

    socket.on("disconnect", async (data) => {
        const _user = await User.findOne({
            where: {
                user_id: id
            }
        });
        await _user.setData({
            isOnline: false
        });
        delete io.sockets[id];
    });
});

module.exports = true;
