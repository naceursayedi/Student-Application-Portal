import express, { Express, Request, Response } from 'express';
const bodyParser = require('body-parser');
import { UserRoute } from './endpoints/user/UserRoute';
import { PublicUserRoute } from './endpoints/user/PublicUserRoute';
import { DegreeCourseRoute } from './endpoints/degreeCourse/DegreeCourseRoute';
import { DegreeCourseApplicationsRoute } from './endpoints/degreeCourseApplications/DegreeCourseApplicationsRoute';
import { routeAuth } from './endpoints/authentication/AuthenticationRoute';
import { initDb } from './database/db';
const fs = require('fs');

const key = fs.readFileSync('./certificates/key.pem');
const cert = fs.readFileSync('./certificates/cert.pem');

const https = require('https');

const app: Express = express();




/* Routes */
//app.use(express.json());

app.use(bodyParser.json());
app.use('/api/users', UserRoute);
app.use('/api/publicUsers', PublicUserRoute);
app.use('/api/degreeCourses', DegreeCourseRoute);
app.use('/api/degreeCourseApplications', DegreeCourseApplicationsRoute);
app.use('/api/authenticate', routeAuth);
app.use((req, res, next) => {
  res.status(404).json("Not Found")
});
initDb(function (err: any, db: any) {
  if (db) {
    console.log("Connection to Database with success");
  }
  else {
    console.log("Failure with connection to Database");
  }
});


const server = https.createServer({ key: key, cert: cert }, app);
app.get('/', (req, res) => { res.send('this is an secure server') });
const port = 80;

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
//server.listen(443, () => { console.log('listening on 443') });
module.exports = app;
