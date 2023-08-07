"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneContent = exports.getManyContent = exports.getOneContentDegree = exports.getManyContentDegrees = exports.getOneContentDegreeApplication = exports.getManyContentDegreeApplications = void 0;
function getManyContentDegreeApplications(degreeApplication) {
    const modifArra = degreeApplication.map((degreeApp) => { return { "id": degreeApp._id, "applicantUserID": degreeApp.applicantUserID, "courseDegreeID": degreeApp.courseDegreeID, "targetPeriodYear": degreeApp.targetPeriodYear, "targetPeriodShortName": degreeApp.targetPeriodShortName }; });
    return modifArra;
}
exports.getManyContentDegreeApplications = getManyContentDegreeApplications;
function getOneContentDegreeApplication(degreeApplication) {
    const { _id, applicantUserID, courseDegreeID, targetPeriodYear, targetPeriodShortName } = degreeApplication;
    const subset = { "id": _id, "applicantUserID": applicantUserID, "courseDegreeID": courseDegreeID, "targetPeriodYear": targetPeriodYear, "universityShortName": targetPeriodShortName };
    return subset;
}
exports.getOneContentDegreeApplication = getOneContentDegreeApplication;
function getManyContentDegrees(degrees) {
    const modifArra = degrees.map((degree) => { return { "id": degree._id, "name": degree.name, "shortName": degree.shortName, "universityName": degree.universityName, "universityShortName": degree.universityShortName, "departmentName": degree.departmentName, "departmentShortName": degree.departmentShortName }; });
    return modifArra;
}
exports.getManyContentDegrees = getManyContentDegrees;
function getOneContentDegree(degree) {
    const { _id, name, shortName, universityName, universityShortName, departmentName, departmentShortName } = degree;
    const subset = { "id": _id, "name": name, "shortName": shortName, "universityName": universityName, "universityShortName": universityShortName, "departmentName": departmentName, "departmentShortName": departmentShortName };
    return subset;
}
exports.getOneContentDegree = getOneContentDegree;
function getManyContent(users) {
    const modifArra = users.map((user) => { return { "userID": user.userID, "firstName": user.firstName, "lastName": user.lastName, "isAdministrator": user.isAdministrator }; });
    return modifArra;
}
exports.getManyContent = getManyContent;
function getOneContent(user) {
    const { userID, firstName, lastName, isAdministrator } = user, partialObject = __rest(user, ["userID", "firstName", "lastName", "isAdministrator"]);
    const subset = { "userID": userID, "firstName": firstName, "lastName": lastName, "isAdministrator": isAdministrator };
    return subset;
}
exports.getOneContent = getOneContent;
