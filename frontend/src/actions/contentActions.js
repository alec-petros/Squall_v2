const API_URL = "http://localhost:3000/"
const headers = {
  "Content-Type": "application/json",
  "Accept": "application/javascript"
}

export function postComment(track_id, content, auth) {
  return (dispatch) => {
    fetch(API_URL + '/api/v1/comments', {
      method: "POST",
      headers: {
        ...headers,
        "Authorization": `Token token=${ auth.token }`
      },
      body: JSON.stringify({
        user_id: auth.user_id,
        track_id: track_id,
        content: content
      })
    })
    .then(r => r.json())
    .then(json => {
      dispatch({
        type: "ADD_COMMENT",
        payload: json
      })
    })
  }
}

export function storeFFTData(func) {
  return (dispatch) => {
    dispatch({type: "SET_DATA", payload: func})
  }
}
