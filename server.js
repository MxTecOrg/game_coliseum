
/*****************
 * Server Config *
 *****************/
 
const config = require("./config.js");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const Socks = require(config.LOGIC + "/Socks.js");
const router = require(config.LOGIC + "/router.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const {User} = require(config.LOGIC + "/helpers/DB.js");

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/webclient/public'));

/* Express router */
app.use("/", router);


// Wakeup route
app.post("/wakeup", (req, res) => {
    res.json({
        status: true
    });
});

app.get("/dropdb" , async (req , res) => {
    await User.sync({
        force: true
    });
    await Room.sync({
        force: true
    });
    await Message.sync({
        force: true
    });
    res.json({
        status : true,
        data: "DB dropped"
    })
});

//Error 404
app.use((req , res) => { 
    res.json({
    status: false, message: "ERROR 404"});
});


server.listen(config.PORT);

const socks = new Socks();

socks.onConnection((socket) => {
    console.log("Se connecto " + socket.__id );
});

socks.listen(server);