import mongoose from 'mongoose';






interface IDegreeCourse {

  name: string,
  shortName: string,
  universityName: string,
  universityShortName: string,
  departmentName: string,
  departmentShortName: string
}




interface DegreeCourseModel extends mongoose.Model<DegreeCourseDoc> {
  build(attrs: IDegreeCourse): DegreeCourseDoc;
}

interface DegreeCourseDoc extends mongoose.Document {

  name: string,
  shortName: string,
  universityName: string,
  universityShortName: string,
  departmentName: string,
  departmentShortName: string
}


/* Create User Schema */

const degreeCourseSchema = new mongoose.Schema({


  name: { type: String, required: true },
  shortName: { type: String, required: true },
  universityName: { type: String, required: true },
  universityShortName: { type: String, required: true },
  departmentName: { type: String, required: true },
  departmentShortName: { type: String, required: true }
}, { timestamps: true }

);

degreeCourseSchema.statics.build = (attrs: IDegreeCourse) => {
  return new DegreeCourse(attrs);
};
export const DegreeCourse = mongoose.model<DegreeCourseDoc, DegreeCourseModel>('DegreeCourse', degreeCourseSchema);