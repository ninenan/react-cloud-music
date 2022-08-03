import { fromJS } from 'immutable';
import * as actionTypes from './constant';
import { PLAY_MODE_MAP } from '../../help/config';

const defaultState = fromJS({
  // 是否全屏幕
  isFullScreen: false,
  // 是否正在播放
  isPlaying: false,
  // 顺序播放列表
  sequencePlaylist: [],
  // 播放列表
  playlist: [],
  // 播放模式
  mode: PLAY_MODE_MAP.seuqence,
  // 当前播放歌曲在播放列表中的下标
  currentIndex: -1,
  // 是否展示播放列表
  isShowPlaylist: false,
  // 当前播放的歌曲
  currentSong: {
    al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
    name: "木偶人",
    ar: [{ name: "薛之谦" }]
  }
})

const actionMap = new Map([
  [actionTypes.SET_PLAY_MODE, (state, action) => state.set('mode', action.data)],
  [actionTypes.SET_FULL_SCREEN, (state, action) => state.set('isFullScreen', action.data)],
  [actionTypes.SET_CURRENT_SONG, (state, action) => state.set('currentSong', action.data)],
  [actionTypes.SET_CURRENT_INDEX, (state, action) => state.set('currentIndex', action.data)],
  [actionTypes.SET_PLAYING_STATE, (state, action) => state.set('isPlaying', action.data)],
  [actionTypes.SET_PLAYLIST, (state, action) => state.set('playlist', action.data)],
  [actionTypes.SET_SHOW_PLAYLIST, (state, action) => state.set('isShowPlaylist', action.data)],
  [actionTypes.SET_CURRENT_INDEX, (state, action) => state.set('currentIndex', action.data)],
  [actionTypes.SET_SEQUENCE_PLAYLIST, (state, action) => state.set('sequencePlaylist', action.data)],
])

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  const { type } = action;
  if (actionMap.get(type)) {
    return actionMap.get(type)(state, action)
  }

  return state
}
