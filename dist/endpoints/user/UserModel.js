"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt = require('bcryptjs');
/* Create User Schema */
const userSchema = new mongoose_1.default.Schema({
    userID: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: String,
    isAdministrator: { type: Boolean, default: false }
}, { timestamps: true });
userSchema.statics.build = (attrs) => {
    return new exports.User(attrs);
};
userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    ;
    bcrypt.hash(this.password, 10).then((hashedPassword) => {
        this.password = hashedPassword;
        next();
    });
});
userSchema.methods.comparedPassword = function (candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err)
            return next(err);
        else
            return next(null, isMatch);
    });
};
exports.User = mongoose_1.default.model('User', userSchema);
