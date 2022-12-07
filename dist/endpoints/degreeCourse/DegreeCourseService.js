"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDegreeCourse = exports.updateCourse = exports.deleteCourse = exports.createCourse = exports.getDegreeCourses = void 0;
const DegreeCourseModel_1 = require("./DegreeCourseModel");
// Rufe alle Degrees ab.
function getDegreeCourses(searchFilter, callback) {
    if (searchFilter) {
        DegreeCourseModel_1.DegreeCourse.find({ "universityShortName": searchFilter }, function (err, Courses) {
            if (err) {
                return callback(err, null);
            }
            else {
                return callback(null, Courses);
            }
        });
    }
    else {
        DegreeCourseModel_1.DegreeCourse.find(function (err, Courses) {
            if (err) {
                return callback(err, null);
            }
            else {
                return callback(null, Courses);
            }
        });
    }
}
exports.getDegreeCourses = getDegreeCourses;
// Create and save a new User
function createCourse(content, callback) {
    DegreeCourseModel_1.DegreeCourse.create(content, (function (err, result) {
        if (err) {
            return callback(err, null);
        }
        else {
            return callback(null, result);
        }
    }));
}
exports.createCourse = createCourse;
// deleting a Course
function deleteCourse(_id, callback) {
    DegreeCourseModel_1.DegreeCourse.findOneAndDelete({ _id: _id }, (function (err, result) {
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
exports.deleteCourse = deleteCourse;
function updateCourse(_id, content, callback) {
    DegreeCourseModel_1.DegreeCourse.findOneAndUpdate({ _id: _id }, content, { new: true }, (function (err, result) {
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
exports.updateCourse = updateCourse;
// Rufe ein Course ab.
function getDegreeCourse(_id, callback) {
    DegreeCourseModel_1.DegreeCourse.findOne({ _id: _id }, function (err, course) {
        if (err) {
            return callback(err, null);
        }
        else {
            if (course == null) {
                return callback(err, null);
            }
            else {
                return callback(null, course);
            }
        }
    });
}
exports.getDegreeCourse = getDegreeCourse;
