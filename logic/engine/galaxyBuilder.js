const config = require("../../config.js");
const { Planet, SolarSystem, Op } = require(config.LOGIC + "/helpers/DB.js");
const uid = require(config.LOGIC + "/helpers/uid.js");
const fs = require("fs");

const names = ["solaris", "calnary", "unit", "redo", "bite", "paka", "radi", "xan", "fix", "helio", "pendium", "trade", "abuk", "xedni", "sely",
"quta", "kaza", "winca", "butaka", "katar", "xurum", "andx", "astez", "taka", "flux", "planium", "requex", "cuaton"
, "zury", "daku", "saday", "apoc", "melt", "duo", "iris", "polis", "pram", "sec", "gaia", "alpha",
 "elicius", "amon", "kult", "ramsec", "xil", "andro", "regis", "baldur", "amenin", "wex", "yhipe"
 , "vulka", "gultra", "limor", "plasen", "melkor", "telius", "undom", "vision", "wamui", "quartz", "vexan", "gamma", "beta", "parseus", "anidos", "colapse", "raybon", "darfal", "ruboi", "tecnol"];

const randName = () => {
    return names[Math.floor(Math.random() * names.length)] + "-" + "###".replace(/#/g, (n) => Math.round(Math.random() * 9));
}

const GColor = (r,g,b) => { r = (typeof r === 'undefined')?0:r; g = (typeof g === 'undefined')?0:g; b = (typeof b === 'undefined')?0:b; return {r:r, g:g, b:b}; };

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const randColor = (c1, c2) => { var colorList = [], tmpColor; for (var i=0; i<255; i++) { tmpColor = new GColor(); tmpColor.r = c1.r + ((i*(c2.r-c1.r))/255); tmpColor.g = c1.g + ((i*(c2.g-c1.g))/255); tmpColor.b = c1.b + ((i*(c2.b-c1.b))/255); colorList.push(tmpColor); } return colorList; };


const galaxyBuild = async = (numSys) => {
    const GameConf = JSON.parse(fs.readFileSync(config.DIRNAME + "/config.json", "utf-8"));

    if (GameConf.active) return console.log("This galaxy is already active.");

    while (numSys > 0) {
        let x = Math.round(Math.random() * config.Game.width);
        let y = Math.round(Math.random() * config.Game.height);
        const onArea = await SolarSystem.findOne({
            where: {
                [Op.and]: {
                    x: {
                        [Op.gt]: x - 100
                    }
                },
                [Op.and]: {
                    x: {
                        [Op.lt]: x + 100
                    }
                },
                [Op.and]: {
                    y: {
                        [Op.gt]: y - 100
                    }
                },
                [Op.and]: {
                    y: {
                        [Op.lt]: y + 100
                    }
                }
            }
        });

        if (onArea) continue;

        const solar_id = uid.num(14);
        const solarName = randName();
        let planets = [];
        const sunType = ["single" , "double" , "triple"][Math.round(Math.random() * 2)];
        const sunSize = Math.round(Math.random() * 50) + 50;
        const rc = randColor({r: 255 , g : 0 , b : 0} , {r : 0 , g : 0 , b : 255});
        const sunColor = rgbToHex(rc[Math.floor(Math.random() * rc.length)]);
        const sunTemp = Math.round(Math.random() * 2000) + 3000
        const numPlanets = Math.round(Math.random() * (config.GAME.max_planets_per_solar - config.GAME.min_planets_per_solar)) + config.GAME.min_planets_per_solar;

        while (numPlanets > 0) {
            let _x;
            while (!_x || (_x > 450 && _x < 550)) _x = Math.round(Math.random() * 1000);
            let _y;
            while (!_y || (_y > 450 && _y < 550)) _y = Math.round(Math.random() * 1000);
            const ponArea = await Planet.findOne({
                where: {
                    [Op.and]: {
                        solar_id : solar_id
                    },
                    [Op.and]: {
                        x: {
                            [Op.gt]: _x - 100
                        }
                    },
                    [Op.and]: {
                        x: {
                           [Op.lt]: _x + 100
                        }
                    },
                    [Op.and]: {
                        y: {
                           [Op.gt]: _y - 100
                        }
                    },
                    [Op.and]: {
                        y: {
                           [Op.lt]: _y + 100
                        }
                    }
                }
            });
            
            if(ponArea) continue;
            
            const planet_id = uid.num(12);
            const planetName = randName();
            const planetSize = Math.floor(Math.random() * 75) + 50;
            const planetSlots = planetSize * 4;
            const dx = ( Math.floor(Math.abs(500 - _x)) / 50) - 5;
            const dy = ( Math.floor(Math.abs(500 - _y)) / 50) - 5;
            const planetTemp = sunTemp / 100 + ( dx > dy ? dx : dy);
            
            const planet = await Planet.create({
                planet_id : planet_id,
                solar_id : solar_id,
                name: planetName,
                x: _x ,
                y: _y ,
                size: planetSize,
                slots: planetSlots,
                temp: planetTemp,
                color: "#000000".replace(/0/g, function() { return (~~((Math.random() * 10) + 6)).toString(16); })
            });
            
            if(planet){
                planets.push(planet_id);
                numPlanets--;
            }
        }
        
        const ss = await SolarSystem.create({
            solar_id : solar_id,
            name: randName(),
            x: x,
            y: y,
            planets: JSON.stringify(planets),
            sunType: sunType,
            sunSize: sunSize,
            sunColor: sunColor,
            sunTemp: sunTemp
        });
        
        if(ss) {
            numSys--;
        }
    }
    
    GameConf.active = true;
    
    fs.writeFileSync(config.DIRNAME + "/config.json" , JSON.stringify(GameConf) , "utf-8");
    
    const solarS = await SolarSystem.findAll();
    const planetsS = await Planet.findAll();
    
    console.log(solarS.length + " Solar Systems and " + planetsS.length + " planets where created at the galaxy.");
};

module.exports = galaxyBuild;
