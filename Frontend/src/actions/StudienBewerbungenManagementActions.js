const REST_API_URL = process.env.REACT_APP_REST_API_URL;

export async function createBewerbung(accessToken, bewerbung) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      Accept: "application/form-data",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bewerbung),
  };

  try {
    const response = await fetch(
      REST_API_URL + "degreeCourseApplications/",
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return err.message;
  }
}

export async function getAllStudienBewerbungen(accessToken, endpoint) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };

  try {
    const response = await fetch(REST_API_URL + endpoint, requestOptions);
    const data = await response.json();
    return data;
  } catch (err) {
    return err.message;
  }
}

export async function deleteBewerbung(accessToken, id) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };

  try {
    const response = await fetch(
      REST_API_URL + "degreeCourseApplications/" + id,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return err.message;
  }
}
