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
      if (userData.errors) {
        alert("stuff")
      } else {
        localStorage.auth = JSON.stringify(userData)
        dispatch({
          type: "LOGIN_USER",
          payload: userData
        })
      }
    })
  }
}

export function setAuth(auth){
  return (dispatch) => {
    dispatch({
      type: "LOGIN_USER",
      payload: auth
    })
  }
}

export function logout() {
  return (dispatch) => {
    dispatch({
      type: "LOGOUT",
      payload: null
    })
  }
}
