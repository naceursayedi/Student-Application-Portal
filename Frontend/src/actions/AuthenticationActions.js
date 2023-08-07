export const SHOW_LOGIN_DIALOG = "SHOW_LOGIN_DIALOG";
export const HIDE_LOGIN_DIALOG = "HIDE_LOGIN_DIALOG";
export const AUTHENTICATION_PENDING = "AUTHENTICATION_PENDING";
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

const REST_API_URL = process.env.REACT_APP_REST_API_URL;

export function getShowLoginDialogAction() {
  return {
    type: SHOW_LOGIN_DIALOG,
  };
}

export function getHideLoginDialogAction() {
  return {
    type: HIDE_LOGIN_DIALOG,
  };
}
export function getAuthenticationUserPendingAction() {
  return {
    type: AUTHENTICATION_PENDING,
  };
}

export function getAuthenticationSuccessAction(userSession) {
  return {
    type: AUTHENTICATION_SUCCESS,
    user: userSession.user,
    accessToken: userSession.accessToken,
  };
}

export function getAuthenticationErrorAction(error) {
  return {
    type: AUTHENTICATION_ERROR,
    error: error,
  };
}

export function getLogoutSuccessAction() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function authenticateUser(userID, password) {
  return (dispatch) => {
    dispatch(getAuthenticationUserPendingAction());
    login(userID, password)
      .then(
        (userSession) => {
          const action = getAuthenticationSuccessAction(userSession);
          dispatch(action);
        },
        (error) => {
          dispatch(getAuthenticationErrorAction());
        }
      )
      .catch((error) => {
        dispatch(getAuthenticationErrorAction());
      });
  };
}

function login(userID, password) {
  let auth = btoa(`${userID}:${password}`);

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  };

  return fetch(REST_API_URL + "authenticate", requestOptions)
    .then(handleResponse)
    .then((userSession) => {
      return userSession;
    });
}

function handleResponse(response) {
  const authorizationHeader = response.headers.get("Authorization");

  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    var token;
    if (authorizationHeader) {
      token = authorizationHeader.split(" ")[1];
    }

    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    } else {
      let userSession = {
        user: data,
        accessToken: token,
      };

      return userSession;
    }
  });
}

function logout() {
  console.log("logout");
}
