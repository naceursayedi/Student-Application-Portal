import express, { Express, Request, Response } from 'express';
import { getManyContentDegreeApplications, getOneContentDegreeApplication } from '../utils/Helpers';
import { Router } from 'express';
import { isVerified, isAdmin, isAutorised, getUserIdToken } from '../utils/Validation';
//import { getManyContentDegrees , getOneContentDegree} from '../utils/Helpers';

import { createCourseApplication, getDegreeCourseApplications, deleteCourseApplication, updateCourseApplication } from './DegreeCourseApplicationsService';
export const DegreeCourseApplicationsRoute = Router();


// Creating a Course Application
DegreeCourseApplicationsRoute.post('/', isVerified, function (req: Request, res: Response, next) {
    const userId: string = getUserIdToken(req)

    createCourseApplication(userId, req.body, function (err: any, result: any) {

        if (result) {
            res.status(201).json(getOneContentDegreeApplication(result));
        }
        else {
            if (err == "Duplicated Course Application") {
                res.status(400).json({ "Error": "Duplicated Course Application" });
            } else {
                res.status(400).json({ "Error": "Es gibt Probleme bei der Creating von dieser Bewerbung . " });
            }

        }
    })
})





// Finding Courses Applications by ID 
DegreeCourseApplicationsRoute.get('/myApplications', isVerified, function (req: Request, res: Response, next) {

    const userId: string = getUserIdToken(req)

    getDegreeCourseApplications({ "applicantUserID": userId }, function (err: any, result: any) {

        if (result) {
            res.status(200).json(getManyContentDegreeApplications(result));
        } else if (result == null) {
            res.status(400).json({ "Error": "Application not found " });
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Suche von dieser Bewerbung . " });
        }
    })
})



//Retrieve all Degree Courses Applications with an Admin token for a specefic user
DegreeCourseApplicationsRoute.get('/', isVerified, isAdmin, function (req: Request, res: Response, next) {

    let filterObject;

    if (req.query.applicantUserID) {
        filterObject = { "applicantUserID": req.query.applicantUserID }
    }
    if (req.query.courseDegreeID) {
        filterObject = { "courseDegreeID": req.query.courseDegreeID }
    }

    getDegreeCourseApplications(filterObject, function (err: any, result: any) {
        if (result) {
            res.status(200).json(getManyContentDegreeApplications(result));
        } else if (result == null) {
            res.status(400).json({ "Error": "Application not found " });
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Suche von dieser Bewerbung . " });
        }
    })
})



// Delete Application Course

DegreeCourseApplicationsRoute.delete('/:_id', isVerified, function (req: Request, res: Response, next) {
    const id = req.params._id

    deleteCourseApplication(id, function (err: any, result: any) {

        if (result) {
            res.status(204).json();
        } else if (result == null) {
            res.status(400).json({ "Error": "Application not found " });
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Entfernung von diesem Kurs . " });
        }
    })
})


// Update Application Course

DegreeCourseApplicationsRoute.put('/:_id', isVerified, isAdmin, function (req: Request, res: Response, next) {
    
    const id = req.params._id

    updateCourseApplication(id, req.body, function (err: any, result: any) {
        if (result) {
            res.status(200).json(getOneContentDegreeApplication(result));
        } else if (result == null) {
            res.status(400).json({ "Error": "Application not found " });
        }
        else {
            res.status(400).json({ "Error": "Es gibt Probleme bei der Updating von dieser Bewerbung . " });
        }
    })
})

