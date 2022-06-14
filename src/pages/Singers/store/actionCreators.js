import api from '../../../api';
import * as actionTypes from './constant';
import { fromJS } from "immutable";

const changeSingerList = data => ({
  type: actionTypes.CHANGE_SINGER_LIST,
  data: fromJS(data)
});

export const changePageCount = data => ({
  type: actionTypes.CHANGE_PAGE_COUNT,
  data
});

export const changeEnterLoading = data => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
});

export const changeIsHasMore = data => ({
  type: actionTypes.CHANGE_IS_HAS_MORE,
  data
});

export const changeIsShowPullDownLoading = data => ({
  type: actionTypes.CHANGE_IS_SHOW_PULL_DOWN_LOADING,
  data
});

export const changeIsShowPullUpLoading = data => ({
  type: actionTypes.CHANGE_IS_SHOW_PULL_UP_LOADING,
  data
});

const sleep = (timer) => new Promise(resolve => setTimeout(resolve, timer));

// 获取热门歌手
export const getHotSingerList = (type = '', alphabet = '') => {
  return async (dispatch, getState) => {
    const { pageCount, singerList } = getState().toJS().singers;
    const res = await api.singers.getHotSingerListRequest(type, alphabet, pageCount);
    const { artists, more } = res;
    const data = !pageCount ? artists : [...singerList, ...artists];

    sleep(2000).then(() => {
      dispatch(changeSingerList(data));
      dispatch(changeIsHasMore(more));
      dispatch(changeIsShowPullDownLoading(false));
      dispatch(changeIsShowPullUpLoading(false));
    })
  }
};

// 根据类型和字母获取歌手列表
export const getSingerListByTypeOrAlphabet = (type = '', alphabet = '') => {
  return async (dispatch, getState) => {
    const { pageCount, singerList } = getState().toJS().singers;

    const { artists, more } = await api.singers.getSingerListByTypeOrAlphabetRequest(type, alphabet, pageCount);
    const data = !pageCount ? [...artists] : [...singerList, ...artists];

    dispatch(changeSingerList(data));
    dispatch(changeIsHasMore(more));
    dispatch(changeIsShowPullDownLoading(false));
    dispatch(changeIsShowPullUpLoading(false));
  }
}


