
export default function shoppingListItemReducer(state = {auth: null, songs: [], activeSong: null, transportMode: "pause"}, action) {
  switch(action.type) {
    case 'LOGIN_USER':
      return {...state, auth: action.payload};
    case 'LOGOUT':
      localStorage.removeItem("auth")
      return {...state, auth: null}
    case 'SET_SONGS':
      return {...state, songs: action.payload}
    case 'SET_ACTIVE':
      return {...state, activeSong: action.payload}
    case 'TRANSPORT_CLICK':
      let mode = null
      state.transportMode === 'pause' ? mode = 'play' : mode = 'pause'
      return {...state, transportMode: mode}
    case 'ADD_SONG':
      return {...state, songs: [action.payload, ...state.songs]}
    default:
      return state;
  }
}
