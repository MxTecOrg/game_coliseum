const config = require("../../config.js");
const uid = require(config.LOGIC + "/helpers/uid.js");
const bcrypt = require("bcryptjs");
const { User , Planet} = require(config.LOGIC + "/helpers/DB.js");

/* Funtion register
 * @params req{ body : {username , email , password , rpassword , token}}
 * @params res {}
 */

const register = async (req, res) => {

    let username,
        email,
        password,
        rpassword;

    try {
        const body = req.body;
        username = (body.username ? body.username : undefined);
        email = (body.email ? body.email : undefined);
        password = (body.password ? body.password : undefined);
        rpassword = (body.rpassword ? body.rpassword : undefined);
    } catch (err) {
        return res.json({
            status: false,
            data: "DATA_ERROR"
        });
    }

    if (!username) {
        return res.json({
            status: false,
            data: "EMPTY_USER"
        });
    }
    
    if(username.length < 5){
        return res.json({
            status: false,
            data: "USER_LENGTH"
        })
    }

    else if (!email) {
        return res.json({
            status: false,
            data: "EMPTY_MAIL"
        });
    }

    else if (!password) {
        return res.json({
            status: false,
            data: "EMPTY_PASS"
        });
    }

    else if (!validateEmail(email)) {
        return res.json({
            status: false,
            data: "WRONG_MAIL"
        });
    }

    if (await User.findOne({
            where: { username: username }
        })) return res.json({ status: false, data: "ACC_USE" });
    if (await User.findOne({
            where: { email: email }
        })) return res.json({ status: false, data: "MAIL_USE" });

    const char = /^[a-zA-Z0-9]+$/;
    if (!char.test(username)) {
        return res.json({
            status: false,
            data: "USERNAME_BAD_CHAR"
        });
    }

    if (password.length < 8) {
        return res.json({
            status: false,
            data: "PASS_LENGTH"
        });
    }

    if (password != rpassword) {
        return res.json({
            status: false,
            data: "PASS_NOT_MATCH"
        });
    }


    try {
        
        const planets = await Planet.findAll({
            where: {
                habitated: 0
            }
        });
        
        const planet = planets[Math.floor(Math.random() * planets.length)];
        
        const userid = parseInt(uid.num(12));
        await planet.setData({
            habitated: user_id,
            falodium: 5000,
            cristagen: 5000,
            badario: 2000,
            hidrolium: 500
        });

        const uc = await User.create({
            user_id: userid,
            username: username,
            planets: "[" + planet.planet_id + "]",
            color: "#000000".replace(/0/g, function() { return (~~((Math.random() * 10) + 6)).toString(16); }),
            email: email,
            password: bcrypt.hashSync(password, 10),
            verified: true
        });

        if(uc) return res.json({
            status: true,
            data: "REGISTERED"
        });
        
        return res.json({
            status: false,
            data: "DATA_ERROR",
            error: err
        });

    } catch (err) {
        console.log(err);
        return res.json({
            status: false,
            data: "DATA_ERROR",
            error: err
        });

    }
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = register;
