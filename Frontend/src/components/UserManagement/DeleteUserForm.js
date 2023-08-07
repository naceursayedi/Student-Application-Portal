import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../actions/UserActions";

export function DeleteUserForm(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    deleteUser(props.accessToken, props.data.userID)
      .then((res) => {
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
        id={"UserItemDeleteButton" + props.data.userID}
        variant="outline-warning"
        onClick={handleShow}
      >
        Delete
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        id={"DeleteDialogUser" + props.data.userID}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            User {props.data.firstName + " " + props.data.lastName} löschen ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Soll User {props.data.firstName + " " + props.data.lastName} gelöscht
          werden ?
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
