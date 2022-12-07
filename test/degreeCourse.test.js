const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require("../dist/HttpServer");
chai.use(chaiHttp);

