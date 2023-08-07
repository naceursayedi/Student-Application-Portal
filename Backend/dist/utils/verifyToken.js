"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
function isAuth(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    if (token == null)
        res.status(400).json("Token not present");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(403).send("Token invalid");
        }
        else {
            //req.user = user
            next(); //proceed to the next action in the calling function
        }
    }); //end of jwt.verify()
} //end of function
function next() {
    throw new Error('Function not implemented.');
}
