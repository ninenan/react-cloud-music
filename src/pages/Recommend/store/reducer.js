import * as actionTypes from "./constant";
import { fromJS } from "immutable";

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
  loading: true
});

const actionMap = new Map([
  [actionTypes.CHANGE_BANNER, (state, action) => state.set('bannerList', action.data)],
  [actionTypes.CHANGE_RECOMMEND_LIST, (state, action) => state.set('recommendList', action.data)],
  [actionTypes.CHANGE_LOADING, (state, action) => state.set('loading', action.data)],
  ["default", () => defaultState]
])

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  const { type } = action

  if (actionMap.get(type)) return actionMap.get(type)(state, action)
  return actionMap.get('default')()
}
