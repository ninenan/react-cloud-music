import { 
  SET_SEQUENCE_PLAYLIST, 
  SET_CURRENT_INDEX, 
  SET_SHOW_PLAYLIST, 
  SET_PLAYING_STATE, 
  SET_CURRENT_SONG, 
  SET_FULL_SCREEN, 
  SET_PLAY_MODE,
  SET_PLAYLIST
} from './constant';
import { fromJS } from 'immutable';

export const changeSequencePlaylist = (data) => ({
  type: SET_SEQUENCE_PLAYLIST,
  data: fromJS(data)
})

export const changeCurrenIndex = data => ({
  type: SET_CURRENT_INDEX,
  data 
})

export const changeShowPlaylist = data => ({
  type: SET_SHOW_PLAYLIST,
  data
})

export const changePlaylist = data => ({
  type: SET_PLAYLIST,
  data: fromJS(data)
})

export const changePlayingState = data => ({
  tyep: SET_PLAYING_STATE,
  data
})

export const changeCurrentSong = data => ({
  type: SET_CURRENT_SONG,
  data: fromJS(data)
})

export const changeFullScreen = data => ({
  type: SET_FULL_SCREEN,
  data
})

export const changePlayMode = data => ({
  type: SET_PLAY_MODE,
  data
})

