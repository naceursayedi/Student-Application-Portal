const REST_API_URL = process.env.REACT_APP_REST_API_URL;

export async function getAllUsers(accessToken) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };

  try {
    const response = await fetch(REST_API_URL + "users", requestOptions);
    const data = await response.json();
    return data;
  } catch (err) {
    return err.message;
  }
}

export async function deleteUser(accessToken, userID) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };

  try {
    const response = await fetch(
      REST_API_URL + "users/" + userID,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return err.message;
  }
}
export async function updateUser(accessToken, userID, user) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + accessToken,
      Accept: "application/form-data",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(
      REST_API_URL + "users/" + userID,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return err.message;
  }
}
export async function createUser(accessToken, user) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      Accept: "application/form-data",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(REST_API_URL + "users/", requestOptions);
    const data = await response.json();
    return data;
  } catch (err) {
    return err.message;
  }
}
