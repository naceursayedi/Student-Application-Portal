import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createUser } from "../../actions/UserActions";
import { FaUserPlus } from "react-icons/fa";
import { IconContext } from "react-icons";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function CreateUserForm(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [userID, setUserID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdministrator, setIsAdministrator] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    const user = {
      userID: userID,
      firstName: firstName,
      lastName: lastName,
      password: password,
      isAdministrator: isAdministrator,
    };
    createUser(props.accessToken, user)
      .then((res) => {
        setValidated(true);
        handleClose();
        props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Navbar bg="light">
        <Container>
          <IconContext.Provider
            value={{ size: "1em", style: { margin: "10px" } }}
          >
            <Button
              variant="outline-success"
              onClick={handleShow}
              id="UserManagementPageCreateUserButton"
            >
              {" "}
              <FaUserPlus />
            </Button>
          </IconContext.Provider>
        </Container>
      </Navbar>

      <Modal
        show={show}
        onHide={handleClose}
        id="UserManagementPageCreateComponent"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create User :</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            style={{
              width: "20rem",
              margin: "20px",
              padding: "10px",
              textAlign: "left",
            }}
          >
            <Form.Group>
              <Form.Label>User-ID</Form.Label>
              <Form.Control
                required
                type="text"
                name="userID"
                id="CreateUserComponentEditUserID"
                placeholder="user-ID required"
                onChange={(e) => setUserID(e.target.value)}
              />

              <Form.Label>Vorname</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Bitte Vorname eingeben"
                name="firstName"
                id="CreateUserComponentEditFirstName"
                onChange={(e) => setFirstName(e.target.value)}
              />

              <Form.Label>Nachname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bitte Nachname eingeben"
                name="lastName"
                id="CreateUserComponentEditLastName"
                required
                onChange={(e) => setLastName(e.target.value)}
              />

              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password required"
                name="password"
                id="CreateUserComponentEditPassword"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <Form.Check
                label="Administrator-Rechte"
                name="isAdministrator"
                id="CreateUserComponentEditIsAdministrator"
                onChange={(e) => {
                  if (e.target.value === "on") {
                    setIsAdministrator(true);
                  } else {
                    setIsAdministrator(false);
                  }
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="CreateUserComponentCreateUserButton"
            onClick={handleSubmit}
          >
            Anlegen
          </Button>

          <Button
            id="OpenUserManagementPageListComponentButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
