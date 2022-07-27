const config = require("../../config.js");
const { User , Planet } = require(config.LOGIC + "/helpers/DB.js");


const client = async (io, socket, id) => {
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


    socket.emit("user-data", JSON.stringify({
        level: user.level,
        xp: user.xp,
        gold: user.gold,
        gems: user.gems,
        spins: user.spins,
        vip: user.vip,
        planets: JSON.parse(user.planets)
    }));
    
    const planet = await Planet.findOne({
        where: {
            planet_id: JSON.parse(user.planets)[0]
        }
    })
    
    socket.emit("planet-data" , JSON.stringify(planet || {}) );

    socket.join("global-chat");

    socket.on("message", async (data) => {
        if (!data.mess || data.mess.length < 1 || !data.room) return;
        socket.to(data.room).emit("message", {
            user_id : id,
            nick: user.username,
            room: data.room,
            mess: data.mess
        });

    });
};

module.exports = client;
