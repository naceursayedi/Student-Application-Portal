"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
const UserRoute_1 = require("./endpoints/user/UserRoute");
const PublicUserRoute_1 = require("./endpoints/user/PublicUserRoute");
const DegreeCourseRoute_1 = require("./endpoints/degreeCourse/DegreeCourseRoute");
const DegreeCourseApplicationsRoute_1 = require("./endpoints/degreeCourseApplications/DegreeCourseApplicationsRoute");
const AuthenticationRoute_1 = require("./endpoints/authentication/AuthenticationRoute");
const db_1 = require("./database/db");
const fs = require('fs');
const cors = require('cors');
const key = fs.readFileSync('./certificates/key.pem');
const cert = fs.readFileSync('./certificates/cert.pem');
const https = require('https');
const app = (0, express_1.default)();
/* Routes */
//app.use(express.json());
app.use("*", cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
});
app.use(bodyParser.json());
app.use('/api/users', UserRoute_1.UserRoute);
app.use('/api/publicUsers', PublicUserRoute_1.PublicUserRoute);
app.use('/api/degreeCourses', DegreeCourseRoute_1.DegreeCourseRoute);
app.use('/api/degreeCourseApplications', DegreeCourseApplicationsRoute_1.DegreeCourseApplicationsRoute);
app.use('/api/authenticate', AuthenticationRoute_1.routeAuth);
app.use((req, res, next) => {
    res.status(404).json("Not Found");
});
(0, db_1.initDb)(function (err, db) {
    if (db) {
        console.log("Connection to Database with success");
    }
    else {
        console.log("Failure with connection to Database");
    }
});
/**
const server = https.createServer({ key: key, cert: cert }, app);
app.get('/', (req, res) => { res.json('this is an secure server') });
*/
const port = 80;
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
/**
server.listen(443, () => { console.log('listening on 443') });
*/
module.exports = app;
