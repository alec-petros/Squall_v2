const defaultState = {
  auth: null,
  songs: [],
  activeSong: null,
  transportMode: "play",
  showSong: null,
  showUser: null,
  htmlAudio: null,
  favoriteList: []
}


export default function shoppingListItemReducer(state = defaultState, action) {
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
    case 'SET_SHOW':
      return {...state, showSong: action.payload}
    case 'SET_SHOW_USER':
      return {...state, showUser: action.payload}
    case 'ADD_FAV':
      return {...state, showUser: {...state.showUser, favorites: [...state.showUser.favorites, action.payload]}}
    case 'SET_FAVORITES':
      return {...state, favoriteList: action.payload}
    default:
      return state;
  }
}
