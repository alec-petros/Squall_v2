
export default function shoppingListItemReducer(state = {auth: null, songs: [], activeSong: null}, action) {
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
    default:
      return state;
  }
}
