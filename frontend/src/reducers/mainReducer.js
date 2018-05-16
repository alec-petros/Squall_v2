
export default function shoppingListItemReducer(state = {auth: null, songs: [], activeSong: null}, action) {
  switch(action.type) {
    case 'LOGIN_USER':
      return {...state, auth: action.payload};
    case 'LOGOUT':
      localStorage.removeItem("auth")
      return {...state, auth: null}
    default:
      return state;
  }
}
