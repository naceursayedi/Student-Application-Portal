import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducer/RootReducer";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

let store = null;
beforeEach(() => {
  store = createStore(rootReducer);

});

afterEach(() => {
  // cleanup on exiting
  store = null;
});
describe("Testing Public Page", () => {
  it("Landing Page", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const landingPageElement = screen.getByTestId("LandingPage");
    expect(landingPageElement).toBeInTheDocument();
  });

  it("Top Menu", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const topMenuElement = screen.getByTestId("TopMenu");
    expect(topMenuElement).toBeInTheDocument();
  });

  it("opens the login modal when the login button is clicked", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const loginDialogButton = screen.getByTestId("OpenLoginDialogButton");
    fireEvent.click(loginDialogButton);
    const loginModal = screen.getByTestId("LoginDialog");
    expect(loginModal).toBeInTheDocument();
  });

  it("closes the login modal when the close button is clicked", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const loginDialogButton = screen.getByTestId("OpenLoginDialogButton");
    fireEvent.click(loginDialogButton);

    const loginUsername = screen.queryByTestId("LoginDialogUserIDText");
    expect(loginUsername).toBeInTheDocument();

    const loginPassword = screen.queryByTestId("LoginDialogPasswordText");
    expect(loginPassword).toBeInTheDocument();

    const loginButton = screen.queryByTestId("PerformLoginButton");
    expect(loginButton).toBeInTheDocument();

    const closeButton = screen.ge("LoginDialogCloseButton");
    fireEvent.click(closeButton);

    //const loginModal = screen.queryByTestId("LoginDialog");
    //expect(loginModal).not.toBeInTheDocument();
  });
});
