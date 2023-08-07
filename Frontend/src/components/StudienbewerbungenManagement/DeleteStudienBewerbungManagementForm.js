import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteBewerbung } from "../../actions/StudienBewerbungenManagementActions";

export function DeleteStudienBewerbungManagementForm(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    deleteBewerbung(props.accessToken, props.data.id)
      .then((res) => {
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
        id={"DegreeCourseApplicationItemDeleteButton" + props.data.id}
        variant="outline-warning"
        onClick={handleShow}
      >
        Delete
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        id={"DeleteDialogDegreeCourseApplication" + props.data.id}
      >
        <Modal.Header closeButton>
          <Modal.Title>Diese Bewerbung {props.data.name} löschen ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Soll Bewerbung {props.data.name} gelöscht werden ?
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
