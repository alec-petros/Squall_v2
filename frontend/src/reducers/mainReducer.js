const defaultState = {
  auth: null,
  songs: [],
  activeSong: null,
  transportMode: "play",
  transportPlay: 'init',
  renderMode: 'transport',
  showSong: null,
  showUser: null,
  htmlAudio: null,
  favoriteList: [],
  followsList: [],
  dataArray: null
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
      let renMode = null
      state.transportMode === 'pause' ? renMode = 'play' : renMode = 'pause'
      return {...state, transportMode: renMode}
    case 'SWAP_MODE':
      let mode = null
      state.renderMode === 'transport' ? mode = 'vis' : mode = 'transport'
      return {...state, renderMode: mode}
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
    case 'SET_DATA':
      return {...state, dataArray: action.payload}
    default:
      return state;
  }
}
