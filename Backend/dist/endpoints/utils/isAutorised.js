"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isVerified = void 0;
const jwt = require('jsonwebtoken');
const UserService_1 = require("../user/UserService");
function isVerified(req, res, next) {
    // Getting and verifying a Token 
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    if (token == null) {
        res.status(400).json("Token not present");
    }
    else {
        jwt.verify(token, "r5u8x/A?D(G+KbPdSgVkYp3s6v9y$B&E", (err, user) => {
            if (err) {
                res.status(401).json("Token invalid! Sie haben keine Berechtigung, die Aktion auszuführen");
            }
            else {
                //req.user = user
                console.log("Token is valid");
                next(); //proceed to the next action in the calling function
            }
        });
    } //end of jwt.verify()
} //end of function
exports.isVerified = isVerified;
function isAdmin(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    const data = JSON.parse(payload.toString());
    console.log("Payload : " + payload);
    console.log("data : " + Object.values(data));
    console.log("userID : " + data.user);
    (0, UserService_1.getUserByID)(data.user, function (err, result) {
        console.log(result.isAdministrator);
        if (result.isAdministrator) {
            console.log("You are an admin");
            next();
        }
        else {
            res.status(403).json("You are not an Admin ! Sie haben keine Berechtigung, die Aktion auszuführen");
        }
    });
}
exports.isAdmin = isAdmin;
