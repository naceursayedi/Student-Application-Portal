"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByID = exports.getUsers = void 0;
const UserModel_1 = require("./UserModel");
// Rufe alle User ab.
function getUsers(callback) {
    UserModel_1.User.find(function (err, Users) {
        if (err) {
            return callback(err, null);
        }
        else {
            return callback(null, Users);
        }
    });
}
exports.getUsers = getUsers;
// Rufe ein User ab.
function getUserByID(userId, callback) {
    UserModel_1.User.findOne({ userID: userId }, function (err, user) {
        if (user) {
            return callback(null, user);
        }
        else {
            return callback(err, null);
        }
    });
}
exports.getUserByID = getUserByID;
// Create and save a new User
function createUser(content, callback) {
    UserModel_1.User.create(content, (function (err, result) {
        if (err) {
            return callback(err, null);
        }
        else {
            return callback(null, result);
        }
    }));
}
exports.createUser = createUser;
// Updating a User
function updateUser(userId, content, callback) {
    UserModel_1.User.findOneAndUpdate({ userID: userId }, content, { new: true }, (function (err, result) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else {
            if (result == null) {
                console.log(err);
                return callback(err, null);
            }
            else {
                return callback(null, result);
            }
        }
    }));
}
exports.updateUser = updateUser;
// deleting a User
function deleteUser(userId, callback) {
    UserModel_1.User.findOneAndDelete({ userID: userId }, (function (err, result) {
        if (err) {
            return callback(err, null);
        }
        else {
            if (result == null) {
                return callback(err, null);
            }
            else {
                return callback(null, result);
            }
        }
    }));
}
exports.deleteUser = deleteUser;
