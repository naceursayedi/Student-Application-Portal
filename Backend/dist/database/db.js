"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.close = exports.initDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserService_1 = require("../endpoints/user/UserService");
const UserModel_1 = require("../endpoints/user/UserModel");
const client = require("mongodb").MongoClient;
var config = require('config');
let _db;
const connectionString = config.get('db.connectionString');
const connectionOptions = config.db.connectionOptions;
function initDb(callback) {
    if (_db) {
        if (callback) {
            return callback(null, _db);
        }
        else {
            return _db;
        }
    }
    else {
        mongoose_1.default.connect(connectionString, connectionOptions);
        _db = mongoose_1.default.connection;
        _db.on('error', console.error.bind(console, 'Connection error'));
        _db.once('open', function () {
            (0, UserService_1.getUserByID)("admin", function (err, result) {
                if (result == null) {
                    console.log("we will create a default admin");
                    var adminUser = new UserModel_1.User();
                    adminUser.userID = "admin";
                    adminUser.password = "123";
                    adminUser.firstName = "Udo";
                    adminUser.lastName = "Müller";
                    adminUser.isAdministrator = true;
                    adminUser.save(function (err) {
                        if (err) {
                            return callback(err, null);
                        }
                        else {
                            return callback(null, adminUser);
                        }
                    });
                }
            });
            console.log('Connected to Database ' + connectionString + ' in db.ts .');
            callback(null, _db);
        });
    }
}
exports.initDb = initDb;
function close() {
    return getDb().close();
}
exports.close = close;
function getDb() {
    return _db;
}
exports.getDb = getDb;
