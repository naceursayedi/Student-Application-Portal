import express, { Express, Request, Response } from 'express';

import { Router } from 'express';
import { User } from './UserModel';
const bcrypt = require('bcryptjs');
import { getUsers, getUserByID, createUser, updateUser, deleteUser } from './UserService';
export const PublicUserRoute = Router();

//Retrieve all Users
PublicUserRoute.get('/', function (req: Request, res: Response, next) {

  getUsers(function (err: any, result: any) {

    if (result) {
      res.status(200).json(result);;
    }
    else {
      res.status(400).json({ "Error": "Es gibt Probleme bei der Suche von  Users . " });
    }
  })
})

// Finding a User by userID 
PublicUserRoute.get('/:userID', function (req: Request, res: Response, next) {
  const userID = req.params.userID

  getUserByID(userID, function (err: any, result: any) {

    if (result) {
      res.status(200).json(result);
    } else if (result == null) {
      res.status(400).json({ "Error": "User not found " });
    }
    else {

      res.status(400).json({ "Error": "Es gibt Probleme bei der Suche von diesem User . " });
    }
  })
})

// Creating a user
PublicUserRoute.post('/', function (req: Request, res: Response, next) {

  createUser(req.body, function (err: any, result: any) {

    if (result) {
      res.status(201).json(result);
    }
    else {

      res.status(400).json({ "Error": "Es gibt Probleme bei der Creating von diesem User . " });
    }
  })
})


// Update a User

PublicUserRoute.put('/:userID', function (req: Request, res: Response, next) {
  const userID = req.params.userID

  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  updateUser(userID, req.body, function (err: any, result: any) {

    if (result) {
      res.status(200).json(result);
    } else if (result == null) {
      res.status(400).json({ "Error": "User not found " });
    }
    else {

      res.status(400).json({ "Error": "Es gibt Probleme bei der Updating von diesem User . " });
    }
  })
})


// Delete a User

PublicUserRoute.delete('/:userID', function (req: Request, res: Response, next) {
  const userID = req.params.userID


  deleteUser(userID, function (err: any, result: any) {

    if (result) {
      res.status(204).json();
    } else if (result == null) {
      res.status(400).json({ "Error": "User not found " });
    }
    else {

      res.status(400).json({ "Error": "Es gibt Probleme bei der Entfernung von diesem User . " });
    }
  })
})