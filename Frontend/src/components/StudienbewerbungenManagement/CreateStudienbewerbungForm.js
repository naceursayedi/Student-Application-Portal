import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createBewerbung } from "../../actions/StudienBewerbungenManagementActions";

export default function CreateStudienbewerbungForm(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  let [applicantUserID, setuserId] = useState("");
  const [targetPeriodShortName, settargetPeriodShortName] = useState();
  const [targetPeriodYear, settargetPeriodYear] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const studienbewerbung = {
      degreeCourseID: props.studiengangData.id,
      applicantUserID: applicantUserID,
      targetPeriodYear: targetPeriodYear,
      targetPeriodShortName: targetPeriodShortName,
    };
    createBewerbung(props.accessToken, studienbewerbung)
      .then((res) => {
        setValidated(true);
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Button
        style={{ margin: "6px" }}
        id={
          "CreateDegreeCourseApplicationForDegreeCourse" +
          props.studiengangData.id
        }
        variant="outline-success"
        onClick={handleShow}
      >
        Create Application
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Create Application :</Modal.Title>
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
              <Form.Label>Studiengang</Form.Label>
              <Form.Control
                disabled
                type="text"
                name="name"
                id="CreateStudiengangComponentEditUserID"
                placeholder="Studiengang Name required"
                value={props.studiengangData.name}
              />
              <br />
              <Form.Label>User-ID</Form.Label>
              {props.userData.isAdministrator && (
                <Form.Control
                  required
                  type="text"
                  placeholder="User ID"
                  name="applicantUserID"
                  id="CreateDegreeCourseApplicationEditUserID"
                  onChange={(e) => setuserId(e.target.value)}
                />
              )}
              {!props.userData.isAdministrator && (
                <Form.Control
                  disabled
                  type="text"
                  value={props.userData.userID}
                  name="applicantUserID"
                  id="CreateDegreeCourseApplicationEditUserID"
                />
              )}
              <br />
              <Form.Label>Jahr</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Jahr"
                name="targetPeriodYear"
                id="CreateDegreeCourseApplicationEditTargetPeriodYear"
                onChange={(e) => settargetPeriodYear(e.target.value)}
              />
              <br />
              <Form.Label>Semester</Form.Label>
              <Form.Select
                id="CreateDegreeCourseApplicationEditTargetPeriodName"
                as="select"
                name="targetPeriodShortName"
                aria-label="Default select example"
                onChange={(e) => settargetPeriodShortName(e.target.value)}
              >
                <option value="">Bitte Semester auswählen</option>
                <option value="WiSe">WinterSemester</option>
                <option value="SoSe">Sommersemester</option>
              </Form.Select>
              <br />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="CreateDegreeCourseApplicationCreateButton"
            onClick={handleSubmit}
          >
            Create Application
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
