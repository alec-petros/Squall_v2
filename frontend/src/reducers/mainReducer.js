const defaultState = {
  auth: null,
  songs: [],
  activeSong: null,
  transportMode: "",
  transportPlay: 'init',
  showSong: null,
  showUser: null,
  htmlAudio: null,
  favoriteList: [],
  followsList: []
}


export default function shoppingListItemReducer(state = defaultState, action) {
  switch(action.type) {
    case 'LOGIN_USER':
      return {...state, auth: action.payload};
    case 'LOGOUT':
      return {...state, auth: null}
    case 'SET_SONGS':
      return {...state, songs: action.payload}
    case 'SET_ACTIVE':
      return {...state, activeSong: action.payload}
    case 'SET_TRANSPORT_PLAY':
      console.log('action', action)
      return {...state, transportPlay: action.payload}
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
      return {
        ...state,
        favoriteList: [...state.favoriteList, action.payload]
      }
    case 'REMOVE_FAV':
      return {...state, favoriteList: state.favoriteList.filter(fav => fav.id !== action.payload)}
    case 'SET_FAVORITES':
      return {...state, favoriteList: action.payload.favorites, followsList: action.payload.followed_artists}
    case 'ADD_FOLLOW':
      return {...state, followsList: [...state.followsList, action.payload]}
    case 'REMOVE_FOLLOW':
      return {...state, followsList: state.followsList.filter(f => f.id !== action.payload.id)}
    case 'ADD_COMMENT':
      return {
        ...state,
        showSong: {
          ...state.showSong,
          comments: [...state.showSong.comments, action.payload]
        }
      }
    default:
      return state;
  }
}
