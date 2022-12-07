const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require("../dist/HttpServer");
chai.use(chaiHttp);


// 1) Register new user
let manfred = {
    "userID": "manfred",
    "firstName": "Manfred",
    "lastName": "Müller",
    "password": "asdf"
}
let naceur = {
    "userID": "naceur",
    "firstName": "Naceur",
    "lastName": "Sayedi",
    "password": "123456"
}

let studiengangID = ""

describe('User CRUD with login Workflow-Test', () => {

    it('get an Admin', (done) => {

        // 1) Get if Admin in the Database
        chai.request(server)
            .get('/api/publicUsers/admin')
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body.userID).equal('admin');
                expect(res.body.firstName).equal('Udo');
                expect(res.body.lastName).equal('Müller');
                expect(res.body.isAdministrator).to.be.true;
                expect(err).to.be.equal(null);
            });
        done();
    });



    it('Login with false credentials ', (done) => {

        chai.request(server)
            .get('/api/authenticate')
            .set({ Authorization: `Basic admin:9o8i` })
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(401);
                expect(err).to.be.equal(null);


            });
        done();
    });

    it('Get all users without Admin token ', (done) => {

        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(401);
                expect(err).to.be.equal(null);


            });
        done();
    });


    it('Login as Admin', (done) => {

        chai.request(server)
            .get('/api/authenticate')
            .set({ Authorization: `Basic YWRtaW46MTIz` })
            .end((err, res) => {
                // Asserts


                expect(res.status).to.be.equal(200);
                expect(err).to.be.equal(null);
                //this.adminAuthHeader = res.header.authorization;
                //var adminAuthHeader = res.header.authorization;
                //const adminToken = adminAuthHeader.split(" ")[1]
                //console.log(adminAuthHeader)
            });
            
        done();

    });
    
    it('Get all users with Admin token ', (done) => {
        
        chai.request(server)
            .get('/api/users')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NzAwODc0NzMsImV4cCI6MTY3MTc1Nzg2MTM1OX0.IBJwTUejtEp32naJ8ZxJXOYaViC1SZXY_JIOuC-CrZY' })
            .end((err, res) => {
                // Asserts
                console.log(this.adminAuthHeader)
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf(1);
                expect(err).to.be.equal(null);
            });
        done();
    });

    it('Create a user (Manfred) with Admin token ', (done) => {

        chai.request(server)
            .post('/api/users')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NzAwODc0NzMsImV4cCI6MTY3MTc1Nzg2MTM1OX0.IBJwTUejtEp32naJ8ZxJXOYaViC1SZXY_JIOuC-CrZY' })
            .send(manfred)
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a('object');
                expect(res.body.userID).equal('manfred');
                expect(res.body.firstName).equal('Manfred');
                expect(res.body.lastName).equal('Müller');
                expect(res.body.isAdministrator).to.be.false;
                expect(err).to.be.equal(null);
            });
        done();
    });

    it('Create a user (Naceur) with Admin token ', (done) => {

        chai.request(server)
            .post('/api/users')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NzAwODc0NzMsImV4cCI6MTY3MTc1Nzg2MTM1OX0.IBJwTUejtEp32naJ8ZxJXOYaViC1SZXY_JIOuC-CrZY' })
            .send(naceur)
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a('object');
                expect(err).to.be.equal(null);
            });
        done();
    });

    it('Create an existent user (Naceur) with Admin token ', (done) => {

        chai.request(server)
            .post('/api/users')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NzAwODc0NzMsImV4cCI6MTY3MTc1Nzg2MTM1OX0.IBJwTUejtEp32naJ8ZxJXOYaViC1SZXY_JIOuC-CrZY' })
            .send(naceur)
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(400);
            });
        done();
    });

    it('Get all users with Admin token ', (done) => {

        chai.request(server)
            .get('/api/users')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NzAwODc0NzMsImV4cCI6MTY3MTc1Nzg2MTM1OX0.IBJwTUejtEp32naJ8ZxJXOYaViC1SZXY_JIOuC-CrZY' })
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf(3);
                expect(err).to.be.equal(null);
            });
        done();
    });

    it('Update a user (Manfred) with Admin token ', (done) => {

        chai.request(server)
            .put('/api/users/manfred')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NzAwODc0NzMsImV4cCI6MTY3MTc1Nzg2MTM1OX0.IBJwTUejtEp32naJ8ZxJXOYaViC1SZXY_JIOuC-CrZY' })
            .send(
                {
                    "lastName": "Schreiber"
                })
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body.userID).equal('manfred');
                expect(res.body.firstName).equal('Manfred');
                expect(res.body.lastName).equal('Schreiber');
                expect(res.body.isAdministrator).to.be.false;
                expect(err).to.be.equal(null);
            });
        done();
    });


    it('Login as Manfred', (done) => {

        chai.request(server)
            .get('/api/authenticate')
            .set({ Authorization: `Basic bWFuZnJlZDphc2Rm` })
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(200);
                expect(err).to.be.equal(null);

                var manfredAuthHeader = res.header.authorization;
            });

        done();

    });

    it('Get all users with Manfred token (Not Authorized)', (done) => {


        chai.request(server)
            .get('/api/users')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFuZnJlZCIsImlhdCI6MTY3MDE1NDI0NiwiZXhwIjoxNjcxODI0NzAxMDQ3fQ.DexM3HLAGCt2-0LOLjkU5BsCTNBOti0aA4NPMS6wmpw' })
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(403);
            });
        done();
    });

    it('Get a user (Naceur) with Manfred token (Not Authorized)', (done) => {


        chai.request(server)
            .get('/api/users/naceur')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFuZnJlZCIsImlhdCI6MTY3MDE1NDI0NiwiZXhwIjoxNjcxODI0NzAxMDQ3fQ.DexM3HLAGCt2-0LOLjkU5BsCTNBOti0aA4NPMS6wmpw' })
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(403);
            });
        done();
    });

    it('Update isAdministrator for user (Manfred) with Manfred token (Not Authorized)', (done) => {


        chai.request(server)
            .put('/api/users/manfred')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFuZnJlZCIsImlhdCI6MTY3MDE1NDI0NiwiZXhwIjoxNjcxODI0NzAxMDQ3fQ.DexM3HLAGCt2-0LOLjkU5BsCTNBOti0aA4NPMS6wmpw' })
            .send(
                {
                    "isAdministrator": true
                })
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(403);
            });
        done();
    });

    it('Update a user (Naceur) with Manfred token (Not Authorized)', (done) => {


        chai.request(server)
            .put('/api/users/naceur')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFuZnJlZCIsImlhdCI6MTY3MDE1NDI0NiwiZXhwIjoxNjcxODI0NzAxMDQ3fQ.DexM3HLAGCt2-0LOLjkU5BsCTNBOti0aA4NPMS6wmpw' })
            .send(
                {
                    "lastName": "Amri"
                })
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(403);
            });
        done();
    });

    it('Create a user (Yasmine) with Manfred token (Not Authorized)', (done) => {


        chai.request(server)
            .post('/api/users')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFuZnJlZCIsImlhdCI6MTY3MDE1NDI0NiwiZXhwIjoxNjcxODI0NzAxMDQ3fQ.DexM3HLAGCt2-0LOLjkU5BsCTNBOti0aA4NPMS6wmpw' })
            .send(
                {
                    "userID": "yasmine",
                    "firstName": "Yasmine",
                    "lastName": "Boumali",
                    "password": "123789"
                })
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(403);
            });
        done();
    });

    it('Delete a user (Naceur) with Manfred token (Not Authorized)', (done) => {


        chai.request(server)
            .delete('/api/users/naceur')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFuZnJlZCIsImlhdCI6MTY3MDE1NDI0NiwiZXhwIjoxNjcxODI0NzAxMDQ3fQ.DexM3HLAGCt2-0LOLjkU5BsCTNBOti0aA4NPMS6wmpw' })
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(403);
            });
        done();
    });

    it('Delete a user (Naceur) with Admin token', (done) => {


        chai.request(server)
            .delete('/api/users/naceur')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NzAwODc0NzMsImV4cCI6MTY3MTc1Nzg2MTM1OX0.IBJwTUejtEp32naJ8ZxJXOYaViC1SZXY_JIOuC-CrZY' })
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(204);
            });
        done();
    });


    
    it('Delete a user (yas) with Admin token (Not exist)', (done) => {


        chai.request(server)
            .delete('/api/users/yas')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NzAwODc0NzMsImV4cCI6MTY3MTc1Nzg2MTM1OX0.IBJwTUejtEp32naJ8ZxJXOYaViC1SZXY_JIOuC-CrZY' })
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(400);
            });
        done();
    });
});






// 1) Register new Course
let OrchideenzuchtBachelor = {
    "universityName": "Beuth Hochschule für Technik Berlin",
    "universityShortName": "Beuth HS",
    "departmentName": "Informatik und Medien",
    "departmentShortName": "FB VI",
    "name": "Orchideenzucht Bachelor",
    "shortName": "OZ-BA"
}

let bht ={
    "universityName": "Berliner Hochschule für Technik Berlin",
    "universityShortName": "BHT",
    "departmentName": "Informatik und Medien",
    "departmentShortName": "FB VI",
    "name": "Medieninformatik Bachelor",
    "shortName": "MI-BA"
}


describe('Degree Course Workflow-Test', () => {

   
    it('Create a new Degree Course with Admin token ', (done) => {

        chai.request(server)
            .post('/api/degreeCourses')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NzAwODc0NzMsImV4cCI6MTY3MTc1Nzg2MTM1OX0.IBJwTUejtEp32naJ8ZxJXOYaViC1SZXY_JIOuC-CrZY' })
            .send(OrchideenzuchtBachelor)
            .end((err, res) => {
                // Asserts


                studiengangID = res.body.id
                this.courseId = res.body.id;
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a('object');
                expect(err).to.be.equal(null);
             
            });
        
        done();
    });

    it('Create a Degree Course with Manfred token (Not Authorized)', (done) => {


        chai.request(server)
            .post('/api/degreeCourses')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFuZnJlZCIsImlhdCI6MTY3MDE1NDI0NiwiZXhwIjoxNjcxODI0NzAxMDQ3fQ.DexM3HLAGCt2-0LOLjkU5BsCTNBOti0aA4NPMS6wmpw' })
            .send(bht)
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(403);
            });
        done();
    });


    it('Get many Degree Courses with Admin token ', (done) => {
        
        chai.request(server)
            .get('/api/degreeCourses')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NzAwODc0NzMsImV4cCI6MTY3MTc1Nzg2MTM1OX0.IBJwTUejtEp32naJ8ZxJXOYaViC1SZXY_JIOuC-CrZY' })
            .end((err, res) => {
                // Asserts
            
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf(1);
                expect(err).to.be.equal(null);
            });
        done();
    });

    
    it('Get one Degree Course with Admin token ', (done) => {
        
        chai.request(server)
            .get('/api/degreeCourses/' + studiengangID)
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NzAwODc0NzMsImV4cCI6MTY3MTc1Nzg2MTM1OX0.IBJwTUejtEp32naJ8ZxJXOYaViC1SZXY_JIOuC-CrZY' })
            .end((err, res) => {
                // Asserts
            
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                expect(err).to.be.equal(null);
            });
        done();
    });

    it('Update one Degree Course with Admin token ', (done) => {
        
        chai.request(server)
            .put('/api/degreeCourses/638cc2b8cd8058c3c273607c')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NzAwODc0NzMsImV4cCI6MTY3MTc1Nzg2MTM1OX0.IBJwTUejtEp32naJ8ZxJXOYaViC1SZXY_JIOuC-CrZY' })
            .send({
                "name": "Tulpenzucht"
            })
            .end((err, res) => {
                // Asserts
            
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                expect(err).to.be.equal(null);
            });
        done();
    });


    it('Get filtered (Beuth HS) one Degree Course with Admin token ', (done) => {
        
        chai.request(server)
            .get('/api/degreeCourses?universityShortName=Beuth HS')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NzAwODc0NzMsImV4cCI6MTY3MTc1Nzg2MTM1OX0.IBJwTUejtEp32naJ8ZxJXOYaViC1SZXY_JIOuC-CrZY' })
            .end((err, res) => {
                // Asserts
            
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf(1);
                expect(err).to.be.equal(null);
            });
        done();
    });
});





describe('Degree Course Application Workflow-Test', () => {

  manfredApplication =   {
        "degreeCourseID": "638cc2b8cd8058c3c273607c",
        "targetPeriodYear": 2024,
        "targetPeriodShortName": "WiSe"
    }
    it('Get all Course Applications with Admin token ', (done) => {
        
        chai.request(server)
            .get('/api/degreeCourseApplications')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NzAwODc0NzMsImV4cCI6MTY3MTc1Nzg2MTM1OX0.IBJwTUejtEp32naJ8ZxJXOYaViC1SZXY_JIOuC-CrZY' })
            .end((err, res) => {
                // Asserts
            
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf(0);
                expect(err).to.be.equal(null);
            });
        done();
    });

    it('Get Degree Course Application with Manfred token ', (done) => {


        chai.request(server)
            .get('/api/degreeCourseApplications/myApplications')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFuZnJlZCIsImlhdCI6MTY3MDE1NDI0NiwiZXhwIjoxNjcxODI0NzAxMDQ3fQ.DexM3HLAGCt2-0LOLjkU5BsCTNBOti0aA4NPMS6wmpw' })
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf(0);
                expect(err).to.be.equal(null);
            });
        done();
    });
    it('Create a Degree Course Application with Manfred token ', (done) => {


        chai.request(server)
            .post('/api/degreeCourseApplications')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFuZnJlZCIsImlhdCI6MTY3MDE1NDI0NiwiZXhwIjoxNjcxODI0NzAxMDQ3fQ.DexM3HLAGCt2-0LOLjkU5BsCTNBOti0aA4NPMS6wmpw' })
            .send(manfredApplication)
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a('object');
                expect(err).to.be.equal(null);
            });
        done();
    });

    it('Create a duplicated Degree Course Application with Manfred token ', (done) => {


        chai.request(server)
            .post('/api/degreeCourseApplications')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFuZnJlZCIsImlhdCI6MTY3MDE1NDI0NiwiZXhwIjoxNjcxODI0NzAxMDQ3fQ.DexM3HLAGCt2-0LOLjkU5BsCTNBOti0aA4NPMS6wmpw' })
            .send(manfredApplication)
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(400);
            });
        done();
    });


    it('Create a Degree Course Application for Manfred with Admin token ', (done) => {


        chai.request(server)
            .post('/api/degreeCourseApplications')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NzAwODc0NzMsImV4cCI6MTY3MTc1Nzg2MTM1OX0.IBJwTUejtEp32naJ8ZxJXOYaViC1SZXY_JIOuC-CrZY' })
            .send({
                "applicantUserID": "manfred",
                "degreeCourseID": "638cc2b8cd8058c3c273607c",
                "targetPeriodYear": 2023,
                "targetPeriodShortName": "WiSe"
            })
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a('object');
                expect(err).to.be.equal(null);
            });
        done();
    });

    it('Update Course Applications with Admin token ', (done) => {
        
        chai.request(server)
            .put('/api/degreeCourseApplications/6390aa06e0d73285ef1bc257')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NzAwODc0NzMsImV4cCI6MTY3MTc1Nzg2MTM1OX0.IBJwTUejtEp32naJ8ZxJXOYaViC1SZXY_JIOuC-CrZY' })
            .send({
                "targetPeriodShortName": "SoSe"
            })
            .end((err, res) => {
                // Asserts
            
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                expect(err).to.be.equal(null);
            });
        done();
    });

    it('Delete Course Applications with Admin token ', (done) => {
        
        chai.request(server)
            .delete('/api/degreeCourseApplications/6390aa06e0d73285ef1bc257')
            .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NzAwODc0NzMsImV4cCI6MTY3MTc1Nzg2MTM1OX0.IBJwTUejtEp32naJ8ZxJXOYaViC1SZXY_JIOuC-CrZY' })
            .end((err, res) => {
                // Asserts
            
                expect(res.status).to.be.equal(204);
                expect(res.body).to.be.a('object');
                expect(err).to.be.equal(null);
            });
        done();
    });

   
 });