import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteStudiengang } from "../../actions/StudiengangManagementActions";

export function DeleteStudiengangManagementForm(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(" delete : " + JSON.stringify(props));
  const handleSubmit = () => {
    deleteStudiengang(props.accessToken, props.data.id)
      .then((res) => {
        console.log(" Studiengang Delete Response Fetch : ");
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
        id={"DegreeCourseItemDeleteButton" + props.data.id}
        variant="outline-warning"
        onClick={handleShow}
      >
        Delete
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        id={"DeleteDialogDegreeCourse" + props.data.id}
      >
        <Modal.Header closeButton>
          <Modal.Title>Studiengang {props.data.name} löschen ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Soll Studiengang {props.data.name} gelöscht werden ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="DeleteDialogCancelButton"
            variant="outline-secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            id="DeleteDialogConfirmButton"
            variant="outline-warning"
            onClick={handleSubmit}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
