
export default function shoppingListItemReducer(state = {auth: null, songs: [], activeSong: null}, action) {
  switch(action.type) {
    case 'LOGIN_USER':
      return {...state, auth: action.payload};
    default:
      return state;
  }
}
