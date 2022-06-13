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

// 获取热门歌手
export const getHotSingerList = (type = '', alphabet = '') => {
  return async (dispatch, getState) => {
    const {pageCount, singerList} = getState().toJS().singers;
    const res = await api.singers.getHotSingerListRequest(type, alphabet, pageCount);
    const { artists } = res;
    const data = !pageCount ? artists : [...singerList, ...artists];

    dispatch(changeSingerList(data));
    // dispatch(changeEnterLoading(false));
    // dispatch(changeIsHasMore(false));
  }
};

// 根据类型和字母获取歌手列表
export const getSingerListByTypeOrAlphabet = (type = '', alphabet = '') => {
  return async (dispatch, getState) => {
    const {pageCount, singerList} = getState().toJS().singers;

    const { artists } = await api.singers.getSingerListByTypeOrAlphabetRequest(type, alphabet, pageCount);
    const data = !pageCount ? [...artists] : [...singerList, ...artists];

    dispatch(changeSingerList(data));
  }
}


