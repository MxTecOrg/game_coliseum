const config = require("../../config.js");
const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const UserModel = require("./models/user.js");
const SolarSystemModel = require("./models/solar-system.js");
const PlanetModel = require("./models/planet.js");


/**********************
 * Iniciando Conexion *
 **********************/
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.DB + '/database.sqlite',
    logging: false
});

(async () => {
    try {
        sequelize.authenticate();
    } catch (err) {
        throw new Error("" + err)
    }
})();

/*********************
 * Modelo de Usuario *
 *********************/
class User extends Model {
    getData() {
        const rows = ["user_id", "nickname", "email" , "color", "desc", "pic", "rooms", "bots", "channels", "own_rooms", "own_bots", "own_channels", "banList", "contacts", "statuses", "xcoins", "isOnline", "lastTimeOnline", "vip"];
        let ret = {};
        for (let row of rows) {
            if (this[row]) {
                try {
                    ret[row] = JSON.parse(this[row]);
                } catch (err) {
                    ret[row] = this[row];
                }
            }
        }
        return ret;
    }

    async setData(obj) {
        let parsedObj = {};
        for (let o in obj) {
            if (this[o] == undefined) continue;
            parsedObj[o] = (typeof(obj[o]) === "object" ? JSON.stringify(obj[o]) : obj[o]);
        }
        try {
            await this.update(parsedObj);
            return true;
        } catch (err) {
            console.err(err);
            return false;
        }
    }
}

User.init(
    UserModel(DataTypes),
    {
        sequelize
    }
);

(async () => {
    await User.sync();
})();


/*********************
 * Modelo de Usuario *
 *********************/
class SolarSystem extends Model {
    getData() {
        const rows = ["user_id", "nickname", "email", "color", "desc", "pic", "rooms", "bots", "channels", "own_rooms", "own_bots", "own_channels", "banList", "contacts", "statuses", "xcoins", "isOnline", "lastTimeOnline", "vip"];
        let ret = {};
        for (let row of rows) {
            if (this[row]) {
                try {
                    ret[row] = JSON.parse(this[row]);
                } catch (err) {
                    ret[row] = this[row];
                }
            }
        }
        return ret;
    }

    async setData(obj) {
        let parsedObj = {};
        for (let o in obj) {
            if (this[o] == undefined) continue;
            parsedObj[o] = (typeof(obj[o]) === "object" ? JSON.stringify(obj[o]) : obj[o]);
        }
        try {
            await this.update(parsedObj);
            return true;
        } catch (err) {
            console.err(err);
            return false;
        }
    }
}

SolarSystem.init(
    SolarSystemModel(DataTypes),
    {
        sequelize
    }
);

(async () => {
    await SolarSystem.sync();
})();


/*********************
 * Modelo de Usuario *
 *********************/
class Planet extends Model {
    getData() {
        const rows = ["user_id", "nickname", "email", "color", "desc", "pic", "rooms", "bots", "channels", "own_rooms", "own_bots", "own_channels", "banList", "contacts", "statuses", "xcoins", "isOnline", "lastTimeOnline", "vip"];
        let ret = {};
        for (let row of rows) {
            if (this[row]) {
                try {
                    ret[row] = JSON.parse(this[row]);
                } catch (err) {
                    ret[row] = this[row];
                }
            }
        }
        return ret;
    }

    async setData(obj) {
        let parsedObj = {};
        for (let o in obj) {
            if (this[o] == undefined) continue;
            parsedObj[o] = (typeof(obj[o]) === "object" ? JSON.stringify(obj[o]) : obj[o]);
        }
        try {
            await this.update(parsedObj);
            return true;
        } catch (err) {
            console.err(err);
            return false;
        }
    }
}

Planet.init(
    PlanetModel(DataTypes),
    {
        sequelize
    }
);

(async () => {
    await Planet.sync();
})();

module.exports = {
    User,
    SolarSystem,
    Planet,
    Op
}
