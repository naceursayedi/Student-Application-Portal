const jwt = require('jsonwebtoken');
import express, { Express, Request, Response } from 'express';
import { getUserByID } from '../user/UserService';
var config = require('config');

export function isVerified(req: Request, res: Response, next: () => void) {

    if (typeof req.headers.authorization !== "undefined") {
        // Getting and verifying a Token 
        const authHeader: any = req.headers.authorization
        const token = authHeader.split(" ")[1]

        if (token == null) {
            res.status(400).json({ "Error": "Token not present" })
        }
        else {
            var privateKey = config.session.tokenKey
            jwt.verify(token, privateKey, (err: any, user: any) => {
                if (err) {
                    res.status(401).json({ "Error": "Token invalid! Sie haben keine Berechtigung, die Aktion auszuführen" })
                }
                else {
                    getUserByID(user.user, function (err: any, result: any) {

                        if (result) {
                            next()
                        } else {
                            res.status(401).json({ "Error": "Not Authorized user" })
                        }
                    })

                }
            });
        }  //end of jwt.verify()
    } else {
        res.status(401).json({ "Error": "Not Authorized" });
    }

} //end of function


export function getUserIdToken(req: Request): string {

    const authHeader: any = req.headers.authorization
    const token = authHeader.split(" ")[1]
    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    const data = JSON.parse(payload.toString());

    return data.user;
}


export function isAdmin(req: Request, res: Response, next: () => void) {

    const userIdToken: string = getUserIdToken(req)

    getUserByID(userIdToken, function (err: any, result: any) {
        if (result.isAdministrator != null && result.isAdministrator === true) {
            next()
        } else {
            res.status(403).json({ "Error": "You are not an Admin ! Sie haben keine Berechtigung, die Aktion auszuführen" })
        }
    })

}
export function updateUserAutorisation(req: Request, res: Response, next: () => void) {

    getUserByID(req.params.userID, function (err: any, result: any) {
        if (req.body.userID) {
            res.status(403).json({ "Error": "You can not change UserID ! Sie haben keine Berechtigung, die Aktion auszuführen !" })
        }
        else {
            next();
        }
    });

}
export function isAutorised(req: Request, res: Response, next: () => void) {

    const userIdToken: string = getUserIdToken(req)
    const userIdReq: string = req.params.userID;

    getUserByID(userIdToken, function (err: any, result: any) {

        if (userIdToken === userIdReq || (result.isAdministrator != null && result.isAdministrator === true)) {
            next()
        }
        else {
            res.status(403).json({ "Error": "Not the right User! Sie haben keine Berechtigung, die Aktion auszuführen !" })
        }

    });

}


export function notToAdmin(req: Request, res: Response, next: () => void) {
    if ((req.body.isAdministrator === false)) {
        res.status(403).json({ "Error": "Sie haben keine Berechtigung sich als admin zu ändern" });
    }
    else {
        next()
    }
}