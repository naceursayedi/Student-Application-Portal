import { Component } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import CreateStudiengangManagementForm from "./CreateStudiengangManagementForm";
import CreateStudienbewerbungForm from "../StudienbewerbungenManagement/CreateStudienbewerbungForm";
import { getAllStudiengangManagements } from "../../actions/StudiengangManagementActions";
import { connect } from "react-redux";
import { DeleteStudiengangManagementForm } from "./DeleteStudiengangManagementForm.js";
import EditStudiengangForm from "./EditStudiengangForm";

const mapStateToProps = (state) => {
  return state;
};

class StudiengangManagementListContent extends Component {
  constructor(props) {
    super(props);
    this.getStudiengangManagementList =
      this.getStudiengangManagementList.bind(this);
    this.refresStudiengangManagementList =
      this.refresStudiengangManagementList.bind(this);
    this.state = {
      studiengangManagementList: [],
    };
  }
  refresStudiengangManagementList() {
    this.getStudiengangManagementList();
  }
  getStudiengangManagementList() {
    getAllStudiengangManagements(this.props.accessToken)
      .then((studiengangManagements) => {
        this.setState({
          studiengangManagementList: studiengangManagements,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  componentDidMount() {
    this.getStudiengangManagementList();
  }
  render() {
    const { studiengangManagementList } = this.state;

    return (
      <div id="DegreeCourseManagementPageListComponent">
        <div>
          {this.props.user.isAdministrator && (
            <CreateStudiengangManagementForm
              accessToken={this.props.accessToken}
              refreshList={() => {
                this.refresStudiengangManagementList();
              }}
            />
          )}
        </div>

        {studiengangManagementList.map((studiengangManagement, index) => (
          <Card
            id={"DegreeCourseItem" + studiengangManagement.id}
            key={studiengangManagement.id}
            style={{ width: "20rem", margin: "10px" }}
          >
            <Card.Header>
              {studiengangManagement.shortName}: {studiengangManagement.name}
            </Card.Header>
            <Table responsive="sm">
              <tbody>
                <tr>
                  <td>Universität: </td>
                  <td id="UniversityName">
                    {studiengangManagement.universityName}
                  </td>
                </tr>
                <tr>
                  <td>Fachbereich: </td>
                  <td id="DepartmentName">
                    {studiengangManagement.departmentName}
                  </td>
                </tr>
                <tr>
                  <td>Studiengang: </td>
                  <td id="Name">{studiengangManagement.name}</td>
                </tr>
              </tbody>
            </Table>
            <Card.Footer>
              {this.props.user.isAdministrator && (
                <DeleteStudiengangManagementForm
                  accessToken={this.props.accessToken}
                  data={studiengangManagement}
                  refreshMyPage={() => {
                    this.refresStudiengangManagementList();
                  }}
                />
              )}

              {this.props.user.isAdministrator && (
                <EditStudiengangForm
                  studiengangManagementData={studiengangManagement}
                  accessToken={this.props.accessToken}
                  refreshMyPage={() => {
                    this.refresStudiengangManagementList();
                  }}
                />
              )}
              <CreateStudienbewerbungForm
                userData={this.props.user}
                accessToken={this.props.accessToken}
                studiengangData={studiengangManagement}
              />
            </Card.Footer>
          </Card>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(StudiengangManagementListContent);
