"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseApplication = exports.deleteCourseApplication = exports.getDegreeCourseApplications = exports.createCourseApplication = void 0;
const DegreeCourseApplicationsModel_1 = require("./DegreeCourseApplicationsModel");
// Create and save a new Application Degree Course
function createCourseApplication(userId, content, callback) {
    if (!(userId == "admin" && content.applicantUserID)) {
        content.applicantUserID = userId;
    }
    DegreeCourseApplicationsModel_1.DegreeCourseApplication.findOne({ applicantUserID: content.applicantUserID, courseDegreeID: content.courseDegreeID, targetPeriodYear: content.targetPeriodYear, targetPeriodShortName: content.targetPeriodShortName }, function (err1, result1) {
        if (result1) {
            return callback("Duplicated Course Application", null);
        }
        else {
            DegreeCourseApplicationsModel_1.DegreeCourseApplication.create(content, (function (err, result) {
                if (err) {
                    return callback(err, null);
                }
                else {
                    return callback(null, result);
                }
            }));
        }
    });
}
exports.createCourseApplication = createCourseApplication;
function getDegreeCourseApplications(filterObject, callback) {
    DegreeCourseApplicationsModel_1.DegreeCourseApplication.find(filterObject, function (err, Courses) {
        if (err) {
            return callback(err, null);
        }
        else {
            return callback(null, Courses);
        }
    });
}
exports.getDegreeCourseApplications = getDegreeCourseApplications;
// Delete Application Course
function deleteCourseApplication(_id, callback) {
    DegreeCourseApplicationsModel_1.DegreeCourseApplication.findOneAndDelete({ id: _id }, (function (err, result) {
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
exports.deleteCourseApplication = deleteCourseApplication;
// Update Application
function updateCourseApplication(_id, content, callback) {
    DegreeCourseApplicationsModel_1.DegreeCourseApplication.findOneAndUpdate({ id: _id }, content, { new: true }, (function (err, result) {
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
exports.updateCourseApplication = updateCourseApplication;
