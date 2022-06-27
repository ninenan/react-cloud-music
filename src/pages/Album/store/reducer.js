import { fromJS } from 'immutable';
import { CHANGE_CURRENT_ALBUM } from './constant';

const defaultState = fromJS({
  currentAlbum: {}
})

const actionMap = new Map([
  [CHANGE_CURRENT_ALBUM, (state, action) => state.set('currentAlbum', action.data)],
  ['default', () => defaultState]
])

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  const { type } = action;
  if (actionMap.get(type)) {
    return actionMap.get(type)(state, action);
  }
  return actionMap.get('default')();
}
