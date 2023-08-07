import { Component } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { connect } from "react-redux";
import UserSessionWidget from "./UserSessionWidget";
import LogoutButton from "./LogoutButton";

const mapStateToProps = (state) => {
  return state;
};

class TopMenu extends Component {
  render() {
    const isAuth = this.props.isAuth;
    if (isAuth) {
      return (
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand>Private Page</Navbar.Brand>
            <LogoutButton />
          </Container>
        </Navbar>
      );
    } else {
      return (
        <Navbar bg="light" expand="lg" id="TopMenu">
          <Container fluid>
            <Navbar.Brand>Landing Page</Navbar.Brand>
            <UserSessionWidget />
          </Container>
        </Navbar>
      );
    }
  }
}

export default connect(mapStateToProps)(TopMenu);
