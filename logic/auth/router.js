const router = require("express").Router();
const login = require("./login.js"); 
const register = require("./register.js");
const config = require("../../config.js");

router.post("/login" , (req , res) => login(req, res));
router.post("/register" , (req , res) => register(req , res));
router.get("/login" , (req , res) => res.sendFile(config.WEBCLI + "/public/login.html"));
router.get("/register" , (req , res) => res.sendFile(config.WEBCLI + "/public/register.html"));

module.exports = router;
