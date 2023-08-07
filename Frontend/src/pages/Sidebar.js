import React, { useState } from "react";
import { FaTh, FaBars, FaUserAlt, FaUniversity } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return state;
};

const Sidebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <FaTh />,
      idItem: "OpenStartPageButton",
    },
    {
      path: "/usermanagement",
      name: "User Management",
      icon: <FaUserAlt />,
      idItem: "OpenUserManagementPageButton",
    },
    {
      path: "/studiengangmanagement",
      name: "Studiengang Management",
      icon: <FaUniversity />,
      idItem: "OpenDegreeCourseManagementPageButton",
    },
    {
      path: "/studienbewerbungmanagement",
      name: "Studienbewerbungen Management",
      icon: <TiDocumentText />,
      idItem: "OpenDegreeCourseApplicationManagementPageButton",
    },
  ];
  if (!props.user.isAdministrator) {
    menuItem.splice(1, 1);
  }
  return (
    <div className="container" style={{ margin: "0", padding: "0" }}>
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>

        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
            id={item.idItem}
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{props.children}</main>
    </div>
  );
};
export default connect(mapStateToProps)(Sidebar);
