import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducer/RootReducer";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "../App";

let store = null;
beforeEach(() => {
  // eslint-disable-next-line no-undef
  store = createStore(rootReducer, applyMiddleware(thunk));
});

afterEach(() => {
  // cleanup on exiting
  store = null;
});
describe("Testing Private Page", () => {
  it("user can login and logout", async () => {
    const mockLoginApi = () => Promise.resolve({ success: true });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const loginDialogButton = screen.getByTestId("OpenLoginDialogButton");
    fireEvent.click(loginDialogButton);

    const loginUsername = screen.getByTestId("LoginDialogUserIDText");
    fireEvent.change(loginUsername, { target: { value: "admin" } });

    const loginPassword = screen.getByTestId("LoginDialogPasswordText");
    fireEvent.change(loginPassword, { target: { value: "123" } });

    const loginButton = screen.getByTestId("PerformLoginButton");
    fireEvent.click(loginButton);

    await waitFor(() => {
      const StartPage = screen.getByTestId("StartPage");
      expect(StartPage).toBeInTheDocument();
    });

    // Logout
    const logoutButton = screen.getByTestId("LogoutButton");
    fireEvent.click(logoutButton);

    // Wait for the PublicPage component to appear
    await waitFor(() => {
      const loginDialogButton = screen.getByTestId("OpenLoginDialogButton");
      expect(loginDialogButton).toBeInTheDocument();
    });

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });
});
