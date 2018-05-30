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
        fetch(API_URL + `api/v1/users/${userData.user_id}/favorites`, {
          method: "GET",
          headers: {
            ...headers,
            "Authorization": `Token token=${ userData.token }`
          }
        })
        .then(r => r.json())
        .then(json => {
          console.log(json)
          dispatch({
            type: "SET_FAVORITES",
            payload: json
          })
        })
      }
    })
  }
}

export function swapMode() {
  return (dispatch) => {
    dispatch({type: "SWAP_MODE", payload: null})
  }
}

export function register(username, password) {
  return (dispatch) => {
    fetch(API_URL + '/api/v1/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/javascript"
      },
      body: JSON.stringify({username: username, password: password})
    }).then((resp) => resp.json())
    .then((data) => {
      if (data.errors) {
        alert("Please try again")
      } else {
        localStorage.auth = JSON.stringify(data)
        dispatch({
          type: "LOGIN_USER",
          payload: data
        })
      }
    })
  }
}

export function getFavorites(auth) {
  return (dispatch) => {
    fetch(API_URL + `api/v1/users/${auth.user_id}/favorites`, {
      method: "GET",
      headers: {
        ...headers,
        "Authorization": `Token token=${ auth.token }`
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log(json)
      dispatch({
        type: "SET_FAVORITES",
        payload: json
      })
    })
  }
}

export function like(track, auth){
  return (dispatch) => {
    fetch(API_URL + 'api/v1/favorites', {
      method: "POST",
      headers: {
        ...headers,
        "Authorization": `Token token=${ auth.token }`
      },
      body: JSON.stringify({user_id: auth.user_id, track_id: track.id})
    })
    .then(r => r.json())
    .then(json => {
      dispatch({
        type: "ADD_FAV",
        payload: json
      })
    })
  }
}

export function unlike(favObj, auth){
  return (dispatch) => {
    fetch(API_URL + `api/v1/favorites/${favObj.id}`, {
      method: "DELETE",
      headers: {
        ...headers,
        "Authorization": `Token token=${ auth.token }`
      }
    })
    .then(r => r.json())
    .then(json => {
      dispatch({
        type: "REMOVE_FAV",
        payload: favObj.id
      })
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

export function setSongs(songs) {
  return (dispatch) => {
    fetch('http://localhost:3000/api/v1/tracks')
    .then(r => r.json())
    .then(json => {
      dispatch({
        type: "SET_SONGS",
        payload: json
      })
    })
  }
}

export function setSongsStream(id) {
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/users/${id}/stream`)
    .then(r => r.json())
    .then(json => {
      dispatch({
        type: "SET_SONGS",
        payload: json
      })
    })
  }
}

export function setActive(song) {
  return (dispatch) => {
    dispatch({type: "SET_ACTIVE", payload: song})
  }
}

export function setTransportPlay(func) {
  return (dispatch) => {
    dispatch({type: "SET_TRANSPORT_PLAY", payload: func})
  }
}

export function transportClick() {
  return (dispatch) => {
    dispatch({type: 'TRANSPORT_CLICK', payload: null})
  }
}

export function addSong(song) {
  return (dispatch) => {
    dispatch({type: "ADD_SONG", payload: song})
  }
}

export function setShow(song) {
  return (dispatch) => {
    dispatch({type: "SET_SHOW", payload: song})
  }
}

export function setShowUser(id) {
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/javascript"
      }
    })
    .then(r => r.json())
    .then(json => dispatch({type: "SET_SHOW_USER", payload: json}))

  }
}

export function followArtist(id, auth) {
  return (dispatch) => {
    fetch(API_URL + '/api/v1/follows', {
      method: "POST",
      headers: {
        ...headers,
        "Authorization": `Token token=${ auth.token }`
      },
      body: JSON.stringify({follow: {id: id}})
    })
    .then(r => r.json())
    .then(json => dispatch({type: "ADD_FOLLOW", payload: json}))
  }
}

export function unfollowArtist(id, auth) {
  return (dispatch) => {
    fetch(API_URL + `/api/v1/follows/${id}`, {
      method: "DELETE",
      headers: {
        ...headers,
        "Authorization": `Token token=${ auth.token }`
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log(json)
      dispatch({type: "REMOVE_FOLLOW", payload: json})
    })
  }
}
