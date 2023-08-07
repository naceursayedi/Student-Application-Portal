import * as AuthenticationActions from "../actions/AuthenticationActions";
const initialState = {
  user: null,
  loginPending: false,
  showLoginDialog: false,
  error: null,
  accessToken: null,
  isAuth: false,
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case AuthenticationActions.SHOW_LOGIN_DIALOG:
      return {
        ...state,
        showLoginDialog: true,
        error: null,
      };

    case AuthenticationActions.HIDE_LOGIN_DIALOG:
      return {
        ...state,
        showLoginDialog: false,
        error: null,
      };

    case AuthenticationActions.AUTHENTICATION_PENDING:
      return {
        ...state,
        loginPending: true,
        error: null,
      };

    case AuthenticationActions.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        showLoginDialog: false,
        loginPending: false,
        user: action.user,
        accessToken: action.accessToken,
        isAuth: true,
        error: null,
      };

    case AuthenticationActions.AUTHENTICATION_ERROR:
      return {
        ...state,
        showLoginDialog: true,
        loginPending: false,
        error: "Authentication failed",
      };

    case AuthenticationActions.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        loginPending: false,
        showLoginDialog: false,
        error: null,
        accessToken: null,
        isAuth: false,
      };
    default:
      return state;
  }
}
export default rootReducer;
