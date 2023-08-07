import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createStudiengang } from "../../actions/StudiengangManagementActions";
import { GrAdd } from "react-icons/gr";
import { IconContext } from "react-icons";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function CreateUserForm(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [universityName, setuniversityName] = useState("");
  const [universityShortName, setuniversityShortName] = useState("");
  const [departmentName, setdepartmentName] = useState("");
  const [departmentShortName, setdepartmentShortName] = useState("");
  const [name, setname] = useState("");
  const [shortName, setshortName] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    const studiengang = {
      universityName: universityName,
      universityShortName: universityShortName,
      departmentName: departmentName,
      departmentShortName: departmentShortName,
      name: name,
      shortName: shortName,
    };
    createStudiengang(props.accessToken, studiengang)
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
              id="DegreeCourseManagementPageCreateDegreeCourseButton"
            >
              {" "}
              <GrAdd />
            </Button>
          </IconContext.Provider>
        </Container>
      </Navbar>

      <Modal
        show={show}
        onHide={handleClose}
        id="DegreeCourseManagementPageCreateComponent"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Studiengang :</Modal.Title>
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
              <Form.Label>Studiengang-Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                id="CreateDegreeCourseComponentEditName"
                placeholder="Studiengang Name required"
                onChange={(e) => setname(e.target.value)}
              />

              <Form.Label>Studiengang-Kurzbezeichnung</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Studiengang Kurzbezeichnung"
                name="shortName"
                id="CreateDegreeCourseComponentEditShortName"
                onChange={(e) => setshortName(e.target.value)}
              />

              <Form.Label>Universität-Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Universität Name eingeben"
                name="universityName"
                id="CreateDegreeCourseComponentEditUniversityName"
                required
                onChange={(e) => setuniversityName(e.target.value)}
              />

              <Form.Label>Universität-Kuzbezeichnung</Form.Label>
              <Form.Control
                type="text"
                placeholder="Universität Kuzbezeichnung"
                name="universityShortName"
                id="CreateDegreeCourseComponentEditUniversityShortName"
                required
                onChange={(e) => setuniversityShortName(e.target.value)}
              />

              <Form.Label>Fachbereich-Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Fachbereich Name"
                name="departmentName"
                id="CreateDegreeCourseComponentEditDepartmentName"
                required
                onChange={(e) => setdepartmentName(e.target.value)}
              />

              <Form.Label>Fachbereich-Kuzbezeichnung</Form.Label>
              <Form.Control
                type="text"
                placeholder="Fachbereich Kuzbezeichnung"
                name="departmentShortName"
                id="CreateDegreeCourseComponentEditDepartmentShortName"
                required
                onChange={(e) => setdepartmentShortName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="CreateDegreeCourseComponentCreateDegreeCourseButton"
            onClick={handleSubmit}
          >
            Anlegen
          </Button>

          <Button
            id="OpenDegreeCourseManagementPageListComponentButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
