import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { updateUser } from "../../actions/UserActions";

export default function EditUserForm(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [userID, setUserID] = useState(props.userData.userID);
  const [firstName, setFirstName] = useState(props.userData.firstName);
  const [lastName, setLastName] = useState(props.userData.lastName);
  const [password, setPassword] = useState(props.userData.password);
  const [isAdministrator, setIsAdministrator] = useState(
    props.userData.isAdministrator
  );
  const initialUserID = props.userData.userID;
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
    updateUser(props.accessToken, initialUserID, user)
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
      <Button
        id={"UserItemEditButton" + userID}
        variant="outline-primary"
        onClick={handleShow}
      >
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        id="UserManagementPageEditComponent"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Update User{" "}
            {props.userData.firstName + " " + props.userData.lastName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
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
                id="EditUserComponentEditUserID"
                placeholder="user-ID required"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
              />

              <Form.Label>Vorname</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Bitte Vorname eingeben"
                id="EditUserComponentEditFirstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <Form.Label>Nachname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bitte Nachname eingeben"
                name="lastName"
                id="EditUserComponentEditLastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />

              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password required"
                name="password"
                required
                id="EditUserComponentEditPassword"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Form.Check
                defaultChecked={isAdministrator}
                name="isAdministrator"
                label="Administrator-Rechte"
                id="EditUserComponentEditIsAdministrator"
                onChange={(e) => {
                  setIsAdministrator(e.target.checked);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button id="EditUserComponentSaveUserButton" onClick={handleSubmit}>
            Bearbeiten
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
