import { User } from './UserModel';


// Rufe alle User ab.
export function getUsers(callback: any) {

    User.find(function (err, Users) {
        if (err) {
            return callback(err, null);
        }
        else {
            return callback(null, Users);
        }

    })

}

// Rufe ein User ab.
export function getUserByID(userId: string, callback: any) {

    User.findOne({ userID: userId }, function (err: string, user: any) {
        if (user) {
            return callback(null, user);
        }
        else {
            return callback(err, null);
        }
    })

}

// Create and save a new User
export function createUser(content: any, callback: any) {

    User.create(content,
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


// Updating a User
export function updateUser(userId: string, content: any, callback: any) {

    User.findOneAndUpdate({ userID: userId }, content, { new: true },
        (function (err: any, result: any) {
            if (err) {
                console.log(err)
                return callback(err, null);
                
            }
            else {
                if (result == null) {
                    console.log(err)
                    return callback(err, null);
                } else {
                    return callback(null, result);
                }
            }
        }
        )
    );
}

// deleting a User
export function deleteUser(userId: string, callback: any) {

    User.findOneAndDelete({ userID: userId },
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