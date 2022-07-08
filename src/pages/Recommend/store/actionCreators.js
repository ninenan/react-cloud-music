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
  return async (dispatch) => {
    const data = await api.recommend.getBannerListRequest()

    dispatch(changeBannerList(data.banners));
  }
}

export const getRecommendList = () => {
  return async (dispatch) => {
    const data = await api.recommend.getRecommendListRequest();

    dispatch(changeRecommendList(data.result));
    dispatch(changeLoading(false));
  }
}
