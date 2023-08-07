import express, { Express, Request, Response } from 'express';
import { Router } from 'express';
export const routeAuth = Router();
import { createTokenService } from './AuthenticationService';

routeAuth.get('/', function (req: any, res: Response, next) {

        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
                res.statusCode = 401;
                res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
                return res.json({ message: 'Missing Authorization Header Gib die daten' });
        }

        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [userID, password] = credentials.split(':');

        createTokenService(userID, password, function (err: any, token: any, user: any) {

                if (token) {

                        res.header("Authorization", "Bearer " + token)

                        if (user) {
                                const { id, userID, userName,isAdministrator, ...partialObject } = user
                                const subset = { id, userID, userName, isAdministrator }
                                res.status(200).json(subset)
                        } else {
                                res.status(401).json(err)
                        }
                } else {
                        res.status(401).json(err)

                }

        });



})

