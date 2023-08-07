import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

const bcrypt = require('bcryptjs');

interface IUser {
  userID: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  isAdministrator: Boolean
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: IUser): UserDoc;
}

interface UserDoc extends mongoose.Document {
  userID: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  isAdministrator: Boolean
}


/* Create User Schema */

const userSchema = new mongoose.Schema({

  userID: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: String,
  isAdministrator: { type: Boolean, default: false }
}, { timestamps: true }

);

userSchema.statics.build = (attrs: IUser) => {
  return new User(attrs);
};

userSchema.pre('save', function (next: () => void) {

  if (!this.isModified('password')) { return next() };
  bcrypt.hash(this.password, 10).then((hashedPassword: string) => {
    this.password = hashedPassword;
    next();
  })
});


userSchema.methods.comparedPassword = function (candidatePassword: string, next: any) {

  bcrypt.compare(candidatePassword, this.password, function (err: any, isMatch: any) {
    if (err)
      return next(err)
    else
      return next(null, isMatch)
  });

}

export const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
