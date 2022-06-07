import * as actionTypes from "./constant";
import { fromJS } from "immutable";
import api from "../../../api";

export const changeBannerList = data => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data)
})

export const changeRecommendList = data => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
})

export const changeLoading = data => ({
  type: actionTypes.CHANGE_LOADING,
  data
})

export const getBannerList = () => {
  return (dispatch) => {
    api.recommend.getBannerListRequest().then((data) => {
      dispatch(changeBannerList(data.banners));
    }).catch(() => console.log('getBannerList: err'))
  }
}

export const getRecommendList = () => {
  return (dispatch) => {
    api.recommend.getRecommendListRequest().then((data) => {
      dispatch(changeRecommendList(data.result));
      dispatch(changeLoading(false));
    }).catch(() => console.log('changeRecommendList: err'))
  }
}
