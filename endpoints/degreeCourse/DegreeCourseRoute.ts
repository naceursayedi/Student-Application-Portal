import express, { Express, Request, Response } from 'express';
import { Router } from 'express';
import { isVerified, isAdmin, isAutorised } from '../utils/Validation';
import { getManyContentDegrees, getOneContentDegree } from '../utils/Helpers';
const bcrypt = require('bcryptjs');
import { getDegreeCourses, createCourse, deleteCourse, updateCourse, getDegreeCourse } from './DegreeCourseService';
import { getDegreeCourseApplications } from '../degreeCourseApplications/DegreeCourseApplicationsService';
export const DegreeCourseRoute = Router();

//Retrieve all Degree Courses
DegreeCourseRoute.get('/', isVerified, function (req: Request, res: Response, next) {

  let universityShortNameQuery = req.query.universityShortName;

  getDegreeCourses(universityShortNameQuery, function (err: any, result: any) {
    if (result) {
      res.status(200).json(getManyContentDegrees(result));;
    }
    else {
      res.status(400).json({ "Error": "Es gibt Probleme bei der Suche von  Degree Courses . " });
    }
  })
})

// Creating a Course
DegreeCourseRoute.post('/',  isAdmin,isVerified, function (req: Request, res: Response, next) {

  createCourse(req.body, function (err: any, result: any) {
    if (result) {
      res.status(201).json(getOneContentDegree(result));
    }
    else {
      res.status(400).json({ "Error": "Es gibt Probleme bei der Creating von diesem Kurs . " });
    }
  })
})



// Delete a Course

DegreeCourseRoute.delete('/:_id', isVerified, isAdmin, function (req: Request, res: Response, next) {
  const id = req.params._id

  deleteCourse(id, function (err: any, result: any) {
    if (result) {
      res.status(204).json();
    } else if (result == null) {
      res.status(400).json({ "Error": "Course not found " });
    }
    else {
      res.status(400).json({ "Error": "Es gibt Probleme bei der Entfernung von diesem Kurs . " });
    }
  })
})

// Update a Course

DegreeCourseRoute.put('/:_id', isVerified, isAdmin, function (req: Request, res: Response, next) {
  const id = req.params._id

  updateCourse(id, req.body, function (err: any, result: any) {

    if (result) {
      res.status(200).json(getOneContentDegree(result));
    } else if (result == null) {
      res.status(400).json({ "Error": "Course not found " });
    }
    else {
      res.status(400).json({ "Error": "Es gibt Probleme bei der Updating von diesem Kurs . " });
    }
  })
})


// Finding a Course by ID 
DegreeCourseRoute.get('/:_id', isVerified, function (req: Request, res: Response, next) {

  const id = req.params._id

  getDegreeCourse(id, function (err: any, result: any) {

    if (result) {
      res.status(200).json(getOneContentDegree(result));
    } else if (result == null) {
      res.status(400).json({ "Error": "Course not found " });
    }
    else {
      res.status(400).json({ "Error": "Es gibt Probleme bei der Suche von diesem Kurs . " });
    }
  })
})

DegreeCourseRoute.get('/:courseDegreeID/degreeCourseApplications', isVerified, isAdmin, function (req: Request, res: Response, next) {

  const courseDegreeID = req.params.courseDegreeID

  getDegreeCourseApplications({ "courseDegreeID": courseDegreeID }, function (err: any, result: any) {

    if (result) {
      res.status(200).json(result);
    } else if (result == null) {
      res.status(400).json({ "Error": "Application not found " });
    }
    else {
      res.status(400).json({ "Error": "Es gibt Probleme bei der Suche von dieser Bewerbung . " });
    }
  })
})
