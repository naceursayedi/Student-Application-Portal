import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";
import * as AuthenticationActions from "../../actions/AuthenticationActions";
import { bindActionCreators } from "redux";

import { Component } from "react";
const mapStateToProps = (state) => {
  return state;
};

class UserSessionWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClose() {
    const { hideLoginDialogAction } = this.props;
    hideLoginDialogAction();
  }
  handleShow() {
    const { showLoginDialogAction } = this.props;
    showLoginDialogAction();
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { authenticateUserAction } = this.props;

    authenticateUserAction(username, password);
  }
  render() {
    var showDialog = this.props.showLoginDialog;
    if (showDialog === undefined) {
      showDialog = false;
    }
    return (
      <div>
        <Button id="OpenLoginDialogButton" onClick={() => this.handleShow()}>
          Login
        </Button>
        <Modal
          id="LoginDialog"
          data-testid="LoginDialog"
          show={showDialog}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  id="LoginDialogUserIDText"
                  data-testid="LoginDialogUserIDText"
                  type="text"
                  placeholder="Enter Username"
                  name="username"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  id="LoginDialogPasswordText"
                  data-testid="LoginDialogPasswordText"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                />
                <div className="d-flex align-items-center">
                  {this.props.error && (
                    <Form.Label style={{ color: "red" }}>
                      Invalid user ID or password
                    </Form.Label>
                  )}
                  {this.props.lo && (
                    <Spinner animation="border" variant="primary" />
                  )}
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              id="PerformLoginButton"
              data-testid="PerformLoginButton"
              variant="primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      showLoginDialogAction: AuthenticationActions.getShowLoginDialogAction,
      hideLoginDialogAction: AuthenticationActions.getHideLoginDialogAction,
      authenticateUserAction: AuthenticationActions.authenticateUser,
      loginPendingAction:
        AuthenticationActions.getAuthenticationUserPendingAction,
      authenticateErrorAction:
        AuthenticationActions.getAuthenticationErrorAction,
    },
    dispatch
  );

const connectedUserSessionWidget = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSessionWidget);
export default connectedUserSessionWidget;
