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
})

export const changeIsHasMore = data => ({
  type: actionTypes.CHANGE_IS_HAS_MORE,
  data
})

export const getHotSingerList = () => {
  return async (dispatch) => {
    const res = await api.singers.getHotSingerListRequest(0)
    const { artists } = res;

    dispatch(changeSingerList(artists));
    dispatch(changeEnterLoading(false));
    dispatch(changeIsHasMore(false));
  }
}
