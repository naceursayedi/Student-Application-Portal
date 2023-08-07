import { Component } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { DeleteStudienBewerbungManagementForm } from "./DeleteStudienBewerbungManagementForm";
import { getAllStudienBewerbungen } from "../../actions/StudienBewerbungenManagementActions";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return state;
};
class StudienBewerbungenManagementListContent extends Component {
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
    let restEndpoint = "";
    if (this.props.user.isAdministrator) {
      restEndpoint = "degreeCourseApplications/";
    } else {
      restEndpoint = "degreeCourseApplications/myApplications";
    }
    getAllStudienBewerbungen(this.props.accessToken, restEndpoint)
      .then((StudienBewerbungen) => {
        this.setState({
          studiengangManagementList: StudienBewerbungen,
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
      <div id="DegreeCourseApplicationManagementPageListComponent">
        {studiengangManagementList.map((studiengangManagement, index) => (
          <Card
            id={"DegreeCourseApplicationItem" + studiengangManagement.id}
            key={studiengangManagement.id}
            style={{ width: "20rem", margin: "10px" }}
          >
            <Card.Header>
              {studiengangManagement.applicantUserID}:{" "}
              {studiengangManagement.universityShortName}
              {studiengangManagement.targetPeriodShortName}
              {studiengangManagement.targetPeriodYear}
            </Card.Header>
            <Table responsive="sm">
              <tbody>
                <tr>
                  <td>User: </td>
                  <td id="ApplicantUserID">
                    {studiengangManagement.applicantUserID}
                  </td>
                </tr>
                <tr>
                  <td>Studiengang: </td>
                  <td id="DegreeCourseName">
                    {studiengangManagement.degreeCourseName}
                  </td>
                </tr>
                <tr>
                  <td>Bewerbungsjahr: </td>
                  <td id="TargetPeriodYear">
                    {studiengangManagement.targetPeriodYear}
                  </td>
                </tr>
                <tr>
                  <td>Bewerbungssemester: </td>
                  <td id="TargetPeriodShortName">
                    {studiengangManagement.targetPeriodShortName}
                  </td>
                </tr>
                <tr>
                  <td>Universität: </td>
                  <td id="UniversityShortName">
                    {studiengangManagement.universityShortName}
                  </td>
                </tr>
                <tr>
                  <td>Fachbereich: </td>
                  <td>{studiengangManagement.departmentShortName}</td>
                </tr>
              </tbody>
            </Table>
            <Card.Footer>
              <DeleteStudienBewerbungManagementForm
                accessToken={this.props.accessToken}
                data={studiengangManagement}
                refreshMyPage={() => {
                  this.refresStudiengangManagementList();
                }}
              />
            </Card.Footer>
          </Card>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(
  StudienBewerbungenManagementListContent
);
