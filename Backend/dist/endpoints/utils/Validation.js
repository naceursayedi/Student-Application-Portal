"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notToAdmin = exports.isAutorised = exports.updateUserAutorisation = exports.isAdmin = exports.getUserIdToken = exports.isVerified = void 0;
const jwt = require('jsonwebtoken');
const UserService_1 = require("../user/UserService");
var config = require('config');
function isVerified(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        // Getting and verifying a Token 
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        if (token == null) {
            res.status(400).json({ "Error": "Token not present" });
        }
        else {
            var privateKey = config.session.tokenKey;
            jwt.verify(token, privateKey, (err, user) => {
                if (err) {
                    res.status(401).json({ "Error": "Token invalid! Sie haben keine Berechtigung, die Aktion auszuführen" });
                }
                else {
                    (0, UserService_1.getUserByID)(user.user, function (err, result) {
                        if (result) {
                            next();
                        }
                        else {
                            res.status(401).json({ "Error": "Not Authorized user" });
                        }
                    });
                }
            });
        } //end of jwt.verify()
    }
    else {
        res.status(401).json({ "Error": "Not Authorized" });
    }
} //end of function
exports.isVerified = isVerified;
function getUserIdToken(req) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    const data = JSON.parse(payload.toString());
    return data.user;
}
exports.getUserIdToken = getUserIdToken;
function isAdmin(req, res, next) {
    const userIdToken = getUserIdToken(req);
    (0, UserService_1.getUserByID)(userIdToken, function (err, result) {
        if (result.isAdministrator != null && result.isAdministrator === true) {
            next();
        }
        else {
            res.status(403).json({ "Error": "You are not an Admin ! Sie haben keine Berechtigung, die Aktion auszuführen" });
        }
    });
}
exports.isAdmin = isAdmin;
function updateUserAutorisation(req, res, next) {
    (0, UserService_1.getUserByID)(req.params.userID, function (err, result) {
        if (req.body.userID) {
            res.status(403).json({ "Error": "You can not change UserID ! Sie haben keine Berechtigung, die Aktion auszuführen !" });
        }
        else {
            next();
        }
    });
}
exports.updateUserAutorisation = updateUserAutorisation;
function isAutorised(req, res, next) {
    const userIdToken = getUserIdToken(req);
    const userIdReq = req.params.userID;
    (0, UserService_1.getUserByID)(userIdToken, function (err, result) {
        if (userIdToken === userIdReq || (result.isAdministrator != null && result.isAdministrator === true)) {
            next();
        }
        else {
            res.status(403).json({ "Error": "Not the right User! Sie haben keine Berechtigung, die Aktion auszuführen !" });
        }
    });
}
exports.isAutorised = isAutorised;
function notToAdmin(req, res, next) {
    if ((req.body.isAdministrator === false)) {
        res.status(403).json({ "Error": "Sie haben keine Berechtigung sich als admin zu ändern" });
    }
    else {
        next();
    }
}
exports.notToAdmin = notToAdmin;
