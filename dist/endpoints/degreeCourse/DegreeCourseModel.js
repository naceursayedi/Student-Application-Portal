"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DegreeCourse = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/* Create User Schema */
const degreeCourseSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    universityName: { type: String, required: true },
    universityShortName: { type: String, required: true },
    departmentName: { type: String, required: true },
    departmentShortName: { type: String, required: true }
}, { timestamps: true });
degreeCourseSchema.statics.build = (attrs) => {
    return new exports.DegreeCourse(attrs);
};
exports.DegreeCourse = mongoose_1.default.model('DegreeCourse', degreeCourseSchema);
