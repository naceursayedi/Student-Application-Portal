import "./App.css";
import TopMenu from "./components/authentication/TopMenu";
import PublicPage from "./components/authentication/PublicPage";
import PrivatePage from "./components/authentication/PrivatePage";
import { connect } from "react-redux";
import { Component } from "react";

const mapStateToProps = (state) => {
  return state;
};

class App extends Component {
  render() {
    const isAuth = this.props.isAuth;
    let protectedPage;
    if (isAuth) {
      protectedPage = <PrivatePage />;
    } else {
      protectedPage = <PublicPage />;
    }
    return (
      <div className="App">
        <TopMenu />
        {protectedPage}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
