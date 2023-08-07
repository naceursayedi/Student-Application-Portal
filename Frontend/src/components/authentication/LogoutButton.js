import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { getLogoutSuccessAction } from "../../actions/AuthenticationActions";

class LogoutButton extends Component {
  constructor(props) {
    super(props);
    this.lougout = this.lougout.bind(this);
  }
  lougout() {
    const dispatch = this.props.dispatch;
    dispatch(getLogoutSuccessAction());
  }
  render() {
    return (
      <div>
        <Button
          id="LogoutButton"
          data-testid="LogoutButton"
          variant="light"
          onClick={this.lougout}
        >
          Logout
        </Button>
      </div>
    );
  }
}

export default connect()(LogoutButton);
