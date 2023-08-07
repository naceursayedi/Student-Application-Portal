import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { updateStudiengang } from "../../actions/StudiengangManagementActions";

export default function EditStudiengangManagement(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [universityName, setuniversityName] = useState(
    props.studiengangManagementData.universityName
  );
  const [universityShortName, setuniversityShortName] = useState(
    props.studiengangManagementData.universityShortName
  );
  const [departmentName, setdepartmentName] = useState(
    props.studiengangManagementData.departmentName
  );
  const [departmentShortName, setdepartmentShortName] = useState(
    props.studiengangManagementData.departmentShortName
  );
  const [name, setname] = useState(props.studiengangManagementData.name);
  const [shortName, setshortName] = useState(
    props.studiengangManagementData.shortName
  );
  const initialStudiengangID = props.studiengangManagementData.id;
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
    updateStudiengang(props.accessToken, initialStudiengangID, studiengang)
      .then((res) => {
        setValidated(true);
        handleClose();
        props.refreshMyPage();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Button
        style={{ margin: "6px" }}
        id={"DegreeCourseItemEditButton" + initialStudiengangID}
        variant="outline-primary"
        onClick={handleShow}
      >
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        id="DegreeCourseManagementPageEditComponent"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Studiengang :</Modal.Title>
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
              <Form.Label>Studiengang-Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                id="EditDegreeCourseComponentEditName"
                placeholder="Studiengang Name required"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />

              <Form.Label>Studiengang-Kurzbezeichnung</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Studiengang Kurzbezeichnung"
                name="shortName"
                id="EditDegreeCourseComponentEditShortName"
                value={shortName}
                onChange={(e) => setshortName(e.target.value)}
              />

              <Form.Label>Universität-Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Universität Name eingeben"
                name="universityName"
                id="EditDegreeCourseComponentEditUniversityName"
                value={universityName}
                required
                onChange={(e) => setuniversityName(e.target.value)}
              />

              <Form.Label>Universität-Kuzbezeichnung</Form.Label>
              <Form.Control
                type="text"
                placeholder="Universität Kuzbezeichnung"
                name="universityShortName"
                id="EditDegreeCourseComponentEditUniversityShortName"
                value={universityShortName}
                required
                onChange={(e) => setuniversityShortName(e.target.value)}
              />

              <Form.Label>Fachbereich-Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Fachbereich Name"
                name="departmentName"
                id="EditDegreeCourseComponentEditDepartmentName"
                value={departmentName}
                required
                onChange={(e) => setdepartmentName(e.target.value)}
              />

              <Form.Label>Fachbereich-Kuzbezeichnung</Form.Label>
              <Form.Control
                type="text"
                placeholder="Fachbereich Kuzbezeichnung"
                name="departmentShortName"
                id="EditDegreeCourseComponentEditDepartmentShortName"
                value={departmentShortName}
                required
                onChange={(e) => setdepartmentShortName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="EditDegreeCourseComponentSaveDegreeCourseButton"
            onClick={handleSubmit}
          >
            Bearbeiten
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
