const expect = require("chai").expect;
const request = require("supertest");
const { User } = require("../dist/endpoints/user/UserModel");
const { DegreeCourse } = require("../dist/endpoints/degreeCourse/DegreeCourseModel");
const { DegreeCourseApplication } = require("../dist/endpoints/degreeCourseApplications/DegreeCourseApplicationsModel");
const app = require("../dist/HttpServer");
const mongoose = require('mongoose');
const config = require('config');

// Set an Envirement for Testing 
//process.env.NODE_ENV = 'test';



describe("Database Connection", () => {
  before(async () => {
    // before each test delete all users,DegreeCourse and DegreeCourseApplication data
    await User.deleteMany({});
    //await DegreeCourse.deleteMany({});
    await DegreeCourseApplication.deleteMany({});

  });



  it("Connect to mongodb", async () => {
      // console.log(mongoose.connection.states);
      //mongoose.disconnect();
      mongoose.connection.on('disconnected', () => {
        expect(mongoose.connection.readyState).to.equal(0);
      });
      mongoose.connection.on('connected', () => {
        expect(mongoose.connection.readyState).to.equal(1);
      });
      mongoose.connection.on('error', () => {
        expect(mongoose.connection.readyState).to.equal(99);
      });

      await mongoose.connect(config.get('db.connectionString'), config.db.connectionOptions);
  });

});
