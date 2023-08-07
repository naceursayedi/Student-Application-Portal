import { DegreeCourseApplication } from './DegreeCourseApplicationsModel';





// Create and save a new Application Degree Course

export function createCourseApplication(userId: string, content: any, callback: any) {

    if (!(userId == "admin" && content.applicantUserID)) {
        content.applicantUserID = userId;
    }

    DegreeCourseApplication.findOne({ applicantUserID: content.applicantUserID, courseDegreeID: content.courseDegreeID, targetPeriodYear: content.targetPeriodYear, targetPeriodShortName: content.targetPeriodShortName },
        function (err1: any, result1: any) {

            if (result1) {
                return callback("Duplicated Course Application", null);
            } else {


                DegreeCourseApplication.create(content,
                    (function (err: any, result: any) {
                        if (err) {
                            
                            return callback(err, null);
                        }
                        else {
                           
                            return callback(null, result);
                        }
                    }
                    )
                );
            }


        })
}





export function getDegreeCourseApplications(filterObject: any, callback: any) {

    DegreeCourseApplication.find(filterObject, function (err: any, Courses: any) {
        if (err) {
            return callback(err, null);
        }
        else {
            return callback(null, Courses);
        }
    });
}


// Delete Application Course
export function deleteCourseApplication(_id: string, callback: any) {

    DegreeCourseApplication.findOneAndDelete({ id: _id },
        (function (err: any, result: any) {
            if (err) {
                return callback(err, null);
            }
            else {
                if (result == null) {
                    return callback(err, null);
                } else {
                    return callback(null, result);
                }
            }
        }
        )
    );
}


// Update Application

export function updateCourseApplication(_id: string, content: any, callback: any) {

    DegreeCourseApplication.findOneAndUpdate({ id: _id }, content, { new: true },
        (function (err: any, result: any) {
            if (err) {
                return callback(err, null);
            }
            else {
                if (result == null) {
                    return callback(err, null);
                } else {
                    return callback(null, result);
                }
            }
        }
        )
    );
}
