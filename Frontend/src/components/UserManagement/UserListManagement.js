import React from "react";
import UserList from "./UserListContent.js";
import NavbarUserManagementActions from "./NavbarUserManagementActions.js";

function UserListManagement() {
  return (
    <div id="UserManagementPage">
      <NavbarUserManagementActions />
      <UserList />
    </div>
  );
}

export default UserListManagement;
