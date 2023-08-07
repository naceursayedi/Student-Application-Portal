import React from "react";
import Sidebar from "../../pages/Sidebar";
import Home from "../../pages/Home";
import UserListContent from "../UserManagement/UserListContent.js";
import StudiengangManagementListContent from "../StudiengangManagement/StudiengangManagementListContent";
import StudienBewerbungenManagementListContent from "../StudienbewerbungenManagement/StudienBewerbungenManagementListContent";
import NotAllowed from "../../pages/NotAllowed";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return state;
};

function PrivatePage(props) {
  let protectedUserManagement;
  if (props.user.isAdministrator) {
    protectedUserManagement = <UserListContent />;
  } else {
    protectedUserManagement = <NotAllowed />;
  }
  return (
    <div id="StartPage" data-testid="StartPage">
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usermanagement" element={protectedUserManagement} />

            <Route
              path="/studiengangmanagement"
              element={<StudiengangManagementListContent />}
            />

            <Route
              path="/studienbewerbungmanagement"
              element={<StudienBewerbungenManagementListContent />}
            />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  );
}
export default connect(mapStateToProps)(PrivatePage);
