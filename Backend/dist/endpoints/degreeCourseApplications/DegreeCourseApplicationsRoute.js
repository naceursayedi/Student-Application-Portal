"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DegreeCourseApplicationsRoute = void 0;
const Helpers_1 = require("../utils/Helpers");
const express_1 = require("express");
const Validation_1 = require("../utils/Validation");
//import { getManyContentDegrees , getOneContentDegree} from '../utils/Helpers';
const DegreeCourseApplicationsService_1 = require("./DegreeCourseApplicationsService");
exports.DegreeCourseApplicationsRoute = (0, express_1.Router)();
// Creating a Course Application
exports.DegreeCourseApplicationsRoute.post('/', Validation_1.isVerified, function (req, res, next) {
    const userId = (0, Validation_1.getUserIdToken)(req);
    (0, DegreeCourseApplicationsService_1.createCourseApplication)(userId, req.body, function (err, result) {
        if (result) {
            res.status(201).json((0, Helpers_1.getOneContentDegreeApplication)(result));
        }
        else {
            if (err == "Duplicated Course Application") {
                res.status(400).json({ "Error": "Duplicated Course Application" });
            }
            else {
                res.status(400).json({ "Error": "Es gibt Probleme bei der Creating von dieser Bewerbung . " });
            }
        }
    });
});
// Finding Courses Applications by ID 
exports.DegreeCourseApplicationsRoute.get('/myApplications', Validation_1.isVerified, function (req, res, next) {
    const userId = (0, Validation_1.getUserIdToken)(req);
    (0, DegreeCourseApplicationsService_1.getDegreeCourseApplications)({ "applicantUserID": userId }, function (err, result) {
        if (result) {
            res.status(200).json((0, Helpers_1.getManyContentDegreeApplications)(result));
        }
        else if (result == null) {
            res.status(400).json({ "Error": "Application not found " });
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Suche von dieser Bewerbung . " });
        }
    });
});
//Retrieve all Degree Courses Applications with an Admin token for a specefic user
exports.DegreeCourseApplicationsRoute.get('/', Validation_1.isVerified, Validation_1.isAdmin, function (req, res, next) {
    let filterObject;
    if (req.query.applicantUserID) {
        filterObject = { "applicantUserID": req.query.applicantUserID };
    }
    if (req.query.courseDegreeID) {
        filterObject = { "courseDegreeID": req.query.courseDegreeID };
    }
    (0, DegreeCourseApplicationsService_1.getDegreeCourseApplications)(filterObject, function (err, result) {
        if (result) {
            res.status(200).json((0, Helpers_1.getManyContentDegreeApplications)(result));
        }
        else if (result == null) {
            res.status(400).json({ "Error": "Application not found " });
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Suche von dieser Bewerbung . " });
        }
    });
});
// Delete Application Course
exports.DegreeCourseApplicationsRoute.delete('/:_id', Validation_1.isVerified, function (req, res, next) {
    const id = req.params._id;
    (0, DegreeCourseApplicationsService_1.deleteCourseApplication)(id, function (err, result) {
        if (result) {
            res.status(204).json();
        }
        else if (result == null) {
            res.status(400).json({ "Error": "Application not found " });
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Entfernung von diesem Kurs . " });
        }
    });
});
// Update Application Course
exports.DegreeCourseApplicationsRoute.put('/:_id', Validation_1.isVerified, Validation_1.isAdmin, function (req, res, next) {
    const id = req.params._id;
    (0, DegreeCourseApplicationsService_1.updateCourseApplication)(id, req.body, function (err, result) {
        if (result) {
            res.status(200).json((0, Helpers_1.getOneContentDegreeApplication)(result));
        }
        else if (result == null) {
            res.status(400).json({ "Error": "Application not found " });
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Updating von dieser Bewerbung . " });
        }
    });
});
