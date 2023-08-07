import { Component } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { getAllUsers } from "../../actions/UserActions";
import { connect } from "react-redux";
import CreateUserForm from "./CreateUserForm";
import { DeleteUserForm } from "./DeleteUserForm.js";
import EditUserForm from "./EditUserForm";

const mapStateToProps = (state) => {
  return state;
};

class UserList extends Component {
  constructor(props) {
    super(props);
    this.getUserList = this.getUserList.bind(this);
    this.refresUserList = this.refresUserList.bind(this);
    this.state = {
      userList: [],
    };
  }
  refresUserList() {
    this.getUserList();
  }
  getUserList() {
    getAllUsers(this.props.accessToken)
      .then((users) => {
        this.setState({
          userList: users,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  componentDidMount() {
    this.getUserList();
  }
  render() {
    const { userList } = this.state;

    const getString = (isAdministrator) => {
      if (isAdministrator) {
        return "true";
      } else {
        return "false";
      }
    };

    return (
      <div>
        <CreateUserForm
          accessToken={this.props.accessToken}
          refreshList={() => {
            this.refresUserList();
          }}
        />

        <div className="userList">
          {userList.map((user, index) => (
            <Card
              id={"UserItem" + user.userID}
              key={user.userID}
              style={{ width: "20rem", margin: "10px" }}
            >
              <Card.Header>
                {user.firstName} {user.lastName}
              </Card.Header>
              <Table responsive="sm">
                <tbody>
                  <tr>
                    <td>User ID : </td>
                    <td>{user.userID}</td>
                  </tr>
                  <tr>
                    <td>First Name : </td>
                    <td>{user.firstName}</td>
                  </tr>
                  <tr>
                    <td>Last Name : </td>
                    <td>{user.lastName}</td>
                  </tr>
                  <tr>
                    <td>Is Administrator : </td>
                    <td>{getString(user.isAdministrator)}</td>
                  </tr>
                </tbody>
              </Table>
              <Card.Footer>
                <EditUserForm
                  userData={user}
                  accessToken={this.props.accessToken}
                  refreshList={() => {
                    this.refresUserList();
                  }}
                />

                <DeleteUserForm
                  accessToken={this.props.accessToken}
                  data={user}
                  refreshList={() => {
                    this.refresUserList();
                  }}
                />
              </Card.Footer>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserList);
