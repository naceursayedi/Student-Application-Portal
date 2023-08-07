"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenService = void 0;
const UserService_1 = require("../user/UserService");
var config = require('config');
const jwt = require('jsonwebtoken');
function createTokenService(userID, password, callback) {
    (0, UserService_1.getUserByID)(userID, function (err, user) {
        if (user) {
            user.comparedPassword(password, function (err, isMatch) {
                if (err) {
                    return callback({ "Error": "Password or userID incorrect" }, null);
                }
                else {
                    if (isMatch) {
                        var issueAt = new Date().getTime();
                        var expirationTime = config.session.timeout;
                        var expireAt = issueAt + (expirationTime * 1000);
                        var privateKey = config.session.tokenKey;
                        let token = jwt.sign({ "user": user.userID }, privateKey, { expiresIn: expireAt, algorithm: "HS256" });
                        return callback(null, token, user);
                    }
                    else {
                        return callback({ "Error": "Password incorrect" }, null);
                    }
                }
            });
        }
        else {
            return callback({ "Error": "user not found : " }, null);
        }
    });
}
exports.createTokenService = createTokenService;
