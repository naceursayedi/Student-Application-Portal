export function getManyContentDegreeApplications(degreeApplication: any): any {

    const modifArra = degreeApplication.map((degreeApp: any) => { return { "id": degreeApp._id, "applicantUserID": degreeApp.applicantUserID, "courseDegreeID": degreeApp.courseDegreeID, "targetPeriodYear": degreeApp.targetPeriodYear, "targetPeriodShortName": degreeApp.targetPeriodShortName } })

    return modifArra

}

export function getOneContentDegreeApplication(degreeApplication: any): any {

    const { _id, applicantUserID, courseDegreeID, targetPeriodYear, targetPeriodShortName } = degreeApplication
    const subset = { "id": _id, "applicantUserID": applicantUserID, "courseDegreeID": courseDegreeID, "targetPeriodYear": targetPeriodYear, "universityShortName": targetPeriodShortName }

    return subset
}
export function getManyContentDegrees(degrees: any): any {

    const modifArra = degrees.map((degree: any) => { return { "id": degree._id, "name": degree.name, "shortName": degree.shortName, "universityName": degree.universityName, "universityShortName": degree.universityShortName, "departmentName": degree.departmentName, "departmentShortName": degree.departmentShortName } })

    return modifArra

}

export function getOneContentDegree(degree: any): any {

    const { _id, name, shortName, universityName, universityShortName, departmentName, departmentShortName } = degree
    const subset = { "id": _id, "name": name, "shortName": shortName, "universityName": universityName, "universityShortName": universityShortName, "departmentName": departmentName, "departmentShortName": departmentShortName }

    return subset

}


export function getManyContent(users: any): any {

    const modifArra = users.map((user: any) => { return { "userID": user.userID, "firstName": user.firstName, "lastName": user.lastName, "isAdministrator": user.isAdministrator } })

    return modifArra

}


export function getOneContent(user: any): any {

    const { userID, firstName, lastName, isAdministrator, ...partialObject } = user
    const subset = { "userID": userID, "firstName": firstName, "lastName": lastName, "isAdministrator": isAdministrator }

    return subset

}
