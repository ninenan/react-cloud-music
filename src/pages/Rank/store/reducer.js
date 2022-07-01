import * as actionTypes from './constant';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  rankList: []
});

const actionMap = new Map([
  [actionTypes.CHANGE_RANK_LIST, (state, action) => state.set('rankList', action.data)],
  ['default', () => defaultState]
]);

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  const { type } = action;
  if (actionMap.get(type)) return actionMap.get(type)(state, action);
  return state;
}
