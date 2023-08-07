import { DegreeCourse } from './DegreeCourseModel';


// Rufe alle Degrees ab.
export function getDegreeCourses(searchFilter: any, callback: any) {
    
    if (searchFilter) {
        DegreeCourse.find({ "universityShortName": searchFilter }, function (err: any, Courses: any) {
            if (err) {
                return callback(err, null);
            }
            else {
                return callback(null, Courses);
            }

        })
    } else {
        DegreeCourse.find(function (err: any, Courses: any) {
            if (err) {
                return callback(err, null);
            }
            else {
                return callback(null, Courses);
            }
        })
    }
}



// Create and save a new User

export function createCourse(content: any, callback: any) {

    DegreeCourse.create(content,
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


// deleting a Course
export function deleteCourse(_id: string, callback: any) {

    DegreeCourse.findOneAndDelete({ _id: _id },
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


export function updateCourse(_id: string, content: any, callback: any) {

    DegreeCourse.findOneAndUpdate({ _id: _id }, content, { new: true },
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



// Rufe ein Course ab.

export function getDegreeCourse(_id: string, callback: any) {

    DegreeCourse.findOne({ _id: _id }, function (err: string, course: any) {
        if (err) {
            return callback(err, null);
        }
        else {
            if (course == null) {
                return callback(err, null);
            } else {
                return callback(null, course);
            }
        }
    })
}
