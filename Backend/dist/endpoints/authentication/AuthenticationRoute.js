"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeAuth = void 0;
const express_1 = require("express");
exports.routeAuth = (0, express_1.Router)();
const AuthenticationService_1 = require("./AuthenticationService");
exports.routeAuth.get('/', function (req, res, next) {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        return res.json({ message: 'Missing Authorization Header Gib die daten' });
    }
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [userID, password] = credentials.split(':');
    (0, AuthenticationService_1.createTokenService)(userID, password, function (err, token, user) {
        if (token) {
            res.header("Authorization", "Bearer " + token);
            if (user) {
                const { id, userID, userName, isAdministrator } = user, partialObject = __rest(user, ["id", "userID", "userName", "isAdministrator"]);
                const subset = { id, userID, userName, isAdministrator };
                res.status(200).json(subset);
            }
            else {
                res.status(401).json(err);
            }
        }
        else {
            res.status(401).json(err);
        }
    });
});
