import mongoose from "mongoose";
import { getUserByID } from '../endpoints/user/UserService';
import { User } from '../endpoints/user/UserModel';
const client = require("mongodb").MongoClient;
var config = require('config');






let _db: any;

const connectionString = config.get('db.connectionString');

const connectionOptions = config.db.connectionOptions;
export function initDb(callback: any) {
    if (_db) {
        if (callback) {
            return callback(null, _db);
        }
        else {
            return _db;
        }
    }
    else {
        mongoose.connect(connectionString, connectionOptions);
        _db = mongoose.connection;

        _db.on('error', console.error.bind(console, 'Connection error'));
        _db.once('open', function () {
            getUserByID("admin", function (err: any, result: any) {

                if (result == null) {
                    console.log("we will create a default admin");
                    var adminUser = new User();
                    adminUser.userID = "admin"
                    adminUser.password = "123"
                    adminUser.firstName = "Udo"
                    adminUser.lastName = "Müller"
                    adminUser.isAdministrator = true

                    adminUser.save(function (err: any) {
                        if (err) {

                            return callback(err, null);
                        } else {
                            return callback(null, adminUser);
                        }
                    })
                }
            })
            console.log('Connected to Database ' + connectionString + ' in db.ts .');
            callback(null, _db);
        });

    }


}

export function close() {
    return getDb().close();
}
export function getDb() {
    return _db;
}
