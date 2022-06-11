import { fromJS } from 'immutable';
import * as actionTypes from './constant';

const defaultState = fromJS({
  singerList: [],
  enterLoading: true,
  pageCount: 0,
  isHasMore: true,
})

const actionMap = new Map([
  [actionTypes.CHANGE_SINGER_LIST, (state, action) => state.set('singerList', action.data)],
  [actionTypes.CHANGE_ENTER_LOADING, (state, action) => state.set('enterLoading', action.data)],
  [actionTypes.CHANGE_PAGE_COUNT, (state, action) => state.set('pageCount', action.data)],
  [actionTypes.CHANGE_IS_HAS_MORE, (state, action) => state.set('isHasMore', action.data)],
  ['default', () => defaultState]
])

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  const { type } = action;
  if (actionMap.get(type)) return actionMap.get(type)(state, action);
  return actionMap.get('default')();
}
