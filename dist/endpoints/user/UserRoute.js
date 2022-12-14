"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const Validation_1 = require("../utils/Validation");
const Helpers_1 = require("../utils/Helpers");
const bcrypt = require('bcryptjs');
const UserService_1 = require("./UserService");
exports.UserRoute = (0, express_1.Router)();
//Retrieve all Users
exports.UserRoute.get('/', Validation_1.isVerified, Validation_1.isAdmin, function (req, res, next) {
    (0, UserService_1.getUsers)(function (err, result) {
        if (result) {
            res.status(200).json((0, Helpers_1.getManyContent)(result));
            ;
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Suche von  Users . " });
        }
    });
});
// Finding a User by userID 
exports.UserRoute.get('/:userID', Validation_1.isVerified, Validation_1.isAutorised, function (req, res, next) {
    const userID = req.params.userID;
    (0, UserService_1.getUserByID)(userID, function (err, result) {
        if (result) {
            res.status(200).json((0, Helpers_1.getOneContent)(result));
        }
        else if (result == null) {
            res.status(400).json({ "Error": "User not found " });
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Suche von diesem User . " });
        }
    });
});
// Creating a user
exports.UserRoute.post('/', Validation_1.isVerified, Validation_1.isAdmin, function (req, res, next) {
    (0, UserService_1.createUser)(req.body, function (err, result) {
        if (result) {
            res.status(201).json((0, Helpers_1.getOneContent)(result));
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Creating von diesem User . " });
        }
    });
});
// Update a User
exports.UserRoute.put('/:userID', Validation_1.isVerified, Validation_1.isAutorised, Validation_1.notToAdmin, Validation_1.updateUserAutorisation, function (req, res, next) {
    const userID = req.params.userID;
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    (0, UserService_1.updateUser)(userID, req.body, function (err, result) {
        if (result) {
            res.status(200).json((0, Helpers_1.getOneContent)(result));
        }
        else if (result == null) {
            res.status(400).json({ "Error": "User not found " });
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Updating von diesem User . " });
        }
    });
});
// Delete a User
exports.UserRoute.delete('/:userID', Validation_1.isVerified, Validation_1.isAdmin, function (req, res, next) {
    const userID = req.params.userID;
    (0, UserService_1.deleteUser)(userID, function (err, result) {
        if (result) {
            res.status(204).json();
        }
        else if (result == null) {
            res.status(400).json({ "Error": "User not found " });
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Entfernung von diesem User . " });
        }
    });
});
