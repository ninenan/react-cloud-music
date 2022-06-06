import * as actionTypes from "./constant";
import { fromJS } from "immutable";

const defaultState = fromJS({
  bannerList: [],
  recommendList: []
});

const actionMap = new Map([
  [actionTypes.CHANGE_BANNER, (state, action) => state.set('bannerList', action.data)],
  [actionTypes.CHANGE_RECOMMEND_LIST, (state, action) => state.set('recommendList', action.data)],
  ["default", () => defaultState]
])

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.data);
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.data);
    default:
      return state;
  }
  // console.log('data: ', state)
  // console.log('action: ', action)

  // if (actionMap.get(action.type)) {
  //   return actionMap.get(action.type)(state, action);
  // }

  // return fromJS({
  //   bannerList: [],
  //   recommendList: []
  // })

  // return defaultState;
}
