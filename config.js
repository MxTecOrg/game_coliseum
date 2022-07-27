/* Base Config */
const config = {
    URL: "https://mxtec-org-xchat.glitch.me",
    PORT: process.env.PORT || 8081, //port
    DIRNAME: __dirname, //root folder
    DB: __dirname + "/database", //database
    LOGIC: __dirname + "/logic", //logic 
    WEBCLI: __dirname + "/webclient",
    TOKEN: {
        secret: "super_secret_token_keyword",
        expire: "365d"
    },
    GAME: {
        width: 25000,
        height: 25000,
        min_planets_per_solar: 3,
        max_planets_per_solar: 10
    },
    SERVER: { version: "v0.0.1" },
};

module.exports = config;
