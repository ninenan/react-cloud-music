import { fromJS } from 'immutable';
import { CHANGE_ARTIST, CHANGE_PAGE_LOADING, CHANGE_SONG_OF_ARTIST } from './constant';

const defaultState = fromJS({
  artist: {},
  songsOfArtist: [],
  pageLoading: true
});

const actionMap = new Map([
  [CHANGE_ARTIST, (state, action) => state.set('artist', action.data)],
  [CHANGE_SONG_OF_ARTIST, (state, action) => state.set('songsOfArtist', action.data)],
  [CHANGE_PAGE_LOADING, (state, action) => state.set('pageLoading', action.data)],
])

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  const { type } = action;

  if (actionMap.get(type)) {
    return actionMap.get(type)(state, action);
  }

  return state;
}



