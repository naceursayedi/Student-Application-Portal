import mongoose, { Schema } from 'mongoose';



interface IDegreeCourseApplications {

  applicantUserID: string,
  courseDegreeID: Schema.Types.ObjectId,
  targetPeriodYear: string,
  targetPeriodShortName: string,
}




interface DegreeCourseApplicationsModel extends mongoose.Model<DegreeCourseApplicationsDoc> {
  build(attrs: IDegreeCourseApplications): DegreeCourseApplicationsDoc;
}

interface DegreeCourseApplicationsDoc extends mongoose.Document {

  applicantUserID: string,
  courseDegreeID: Schema.Types.ObjectId,
  targetPeriodYear: string,
  targetPeriodShortName: string,
}


/* Create User Schema */

const degreeCourseApplicationsSchema = new mongoose.Schema({


  applicantUserID: { type: Schema.Types.String, ref: 'User' },
  courseDegreeID: { type: Schema.Types.ObjectId, ref: 'DegreeCourse' },
  targetPeriodYear: { type: Number, required: true },
  targetPeriodShortName: { type: String, required: true }
}, { timestamps: true }

);

degreeCourseApplicationsSchema.statics.build = (attrs: IDegreeCourseApplications) => {
  return new DegreeCourseApplication(attrs);
};
export const DegreeCourseApplication = mongoose.model<DegreeCourseApplicationsDoc, DegreeCourseApplicationsModel>('DegreeCourseApplications', degreeCourseApplicationsSchema);