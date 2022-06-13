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
export const getHotSingerList = () => {
  return async (dispatch) => {
    const res = await api.singers.getHotSingerListRequest(0)
    const { artists } = res;

    dispatch(changeSingerList(artists));
    dispatch(changeEnterLoading(false));
    dispatch(changeIsHasMore(false));
  }
};

// 加载更多歌手
export const getMoreHotSingerList = () => {
  return async (dispatch, getState) => {
    const {pageCount, singerList} = getState().toJS().singers;

    const { artists } = await api.singers.getHotSingerListRequest(pageCount);
    const data = [...singerList, artists];
    debugger;

    dispatch(changeSingerList(data));
  }
}

// 根据类型和字母获取歌手列表
export const getSingerListByTypeOrAlphabet = (type, alphabet) => {
  return async (dispatch, getState) => {
    const {pageCount, singerList} = getState().toJS().singers;

    const { artists } = await api.singers.getSingerListByTypeOrAlphabetRequest(type, alphabet, pageCount);
    const data = [...singerList, ...artists];

    dispatch(changeSingerList(data));
  }
}


