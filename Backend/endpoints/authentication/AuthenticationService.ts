import { getUsers, getUserByID } from '../user/UserService';
var config = require('config');
const jwt = require('jsonwebtoken');

export function createTokenService(userID: string, password: string, callback: any) {

    getUserByID(userID, function (err: any, user: any) {

        if (user) {
            user.comparedPassword(password, function (err: any, isMatch: any) {
                if (err) {
                    return callback({ "Error": "Password or userID incorrect" }, null)
                } else {
                    if (isMatch) {
                        var issueAt = new Date().getTime();
                        var expirationTime = config.session.timeout
                        var expireAt = issueAt + (expirationTime * 1000)
                        var privateKey = config.session.tokenKey
                        let token = jwt.sign({ "user": user.userID }, privateKey, { expiresIn: expireAt, algorithm: "HS256" })

                        return callback(null, token, user)
                    }
                    else {
                        return callback({ "Error": "Password incorrect" }, null)
                    }
                }
            })
        } else {
            return callback({ "Error": "user not found : " }, null)
        }
    });

}