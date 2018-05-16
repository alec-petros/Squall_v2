const API_URL = "http://localhost:3000/"
const headers = {
  "Content-Type": "application/json",
  "Accept": "application/javascript"
}

export function login(username, password){
  return (dispatch) => {
    fetch(API_URL + "/sessions", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({username, password})
    })
    .then(res => res.json())
    .then(userData => {
      dispatch({
        type: "LOGIN_USER",
        payload: userData
      })
    })
  }
}
