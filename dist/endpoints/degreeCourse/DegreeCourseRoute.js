"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DegreeCourseRoute = void 0;
const express_1 = require("express");
const Validation_1 = require("../utils/Validation");
const Helpers_1 = require("../utils/Helpers");
const bcrypt = require('bcryptjs');
const DegreeCourseService_1 = require("./DegreeCourseService");
const DegreeCourseApplicationsService_1 = require("../degreeCourseApplications/DegreeCourseApplicationsService");
exports.DegreeCourseRoute = (0, express_1.Router)();
//Retrieve all Degree Courses
exports.DegreeCourseRoute.get('/', Validation_1.isVerified, function (req, res, next) {
    let universityShortNameQuery = req.query.universityShortName;
    (0, DegreeCourseService_1.getDegreeCourses)(universityShortNameQuery, function (err, result) {
        if (result) {
            res.status(200).json((0, Helpers_1.getManyContentDegrees)(result));
            ;
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Suche von  Degree Courses . " });
        }
    });
});
// Creating a Course
exports.DegreeCourseRoute.post('/', Validation_1.isAdmin, Validation_1.isVerified, function (req, res, next) {
    (0, DegreeCourseService_1.createCourse)(req.body, function (err, result) {
        if (result) {
            res.status(201).json((0, Helpers_1.getOneContentDegree)(result));
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Creating von diesem Kurs . " });
        }
    });
});
// Delete a Course
exports.DegreeCourseRoute.delete('/:_id', Validation_1.isVerified, Validation_1.isAdmin, function (req, res, next) {
    const id = req.params._id;
    (0, DegreeCourseService_1.deleteCourse)(id, function (err, result) {
        if (result) {
            res.status(204).json();
        }
        else if (result == null) {
            res.status(400).json({ "Error": "Course not found " });
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Entfernung von diesem Kurs . " });
        }
    });
});
// Update a Course
exports.DegreeCourseRoute.put('/:_id', Validation_1.isVerified, Validation_1.isAdmin, function (req, res, next) {
    const id = req.params._id;
    (0, DegreeCourseService_1.updateCourse)(id, req.body, function (err, result) {
        if (result) {
            res.status(200).json((0, Helpers_1.getOneContentDegree)(result));
        }
        else if (result == null) {
            res.status(400).json({ "Error": "Course not found " });
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Updating von diesem Kurs . " });
        }
    });
});
// Finding a Course by ID 
exports.DegreeCourseRoute.get('/:_id', Validation_1.isVerified, function (req, res, next) {
    const id = req.params._id;
    (0, DegreeCourseService_1.getDegreeCourse)(id, function (err, result) {
        if (result) {
            res.status(200).json((0, Helpers_1.getOneContentDegree)(result));
        }
        else if (result == null) {
            res.status(400).json({ "Error": "Course not found " });
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Suche von diesem Kurs . " });
        }
    });
});
exports.DegreeCourseRoute.get('/:courseDegreeID/degreeCourseApplications', Validation_1.isVerified, Validation_1.isAdmin, function (req, res, next) {
    const courseDegreeID = req.params.courseDegreeID;
    (0, DegreeCourseApplicationsService_1.getDegreeCourseApplications)({ "courseDegreeID": courseDegreeID }, function (err, result) {
        if (result) {
            res.status(200).json(result);
        }
        else if (result == null) {
            res.status(400).json({ "Error": "Application not found " });
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Suche von dieser Bewerbung . " });
        }
    });
});
