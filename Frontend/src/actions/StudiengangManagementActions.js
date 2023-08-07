const REST_API_URL = process.env.REACT_APP_REST_API_URL;

export async function getAllStudiengangManagements(accessToken) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };

  try {
    const response = await fetch(
      REST_API_URL + "degreeCourses",
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return err.message;
  }
}

export async function deleteStudiengang(accessToken, id) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };

  try {
    const response = await fetch(
      REST_API_URL + "degreeCourses/" + id,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return err.message;
  }
}

export async function createStudiengang(accessToken, studiengang) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      Accept: "application/form-data",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studiengang),
  };

  try {
    const response = await fetch(
      REST_API_URL + "degreeCourses/",
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return err.message;
  }
}

export async function updateStudiengang(accessToken, id, studiengang) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + accessToken,
      Accept: "application/form-data",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studiengang),
  };

  try {
    const response = await fetch(
      REST_API_URL + "degreeCourses/" + id,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return err.message;
  }
}
