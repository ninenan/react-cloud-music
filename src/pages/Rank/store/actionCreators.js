import { fromJS } from 'immutable';
import * as actionTypes from './constant';
import api from '../../../api';

export const changeRankList = data => ({
  type: actionTypes.CHANGE_RANK_LIST,
  data: fromJS(data)
});

// 获取排行榜
export const getRankList = () => {
  return async (dispatch) => {
    const { list = [] } = await api.rank.getRankListRequest();
    dispatch(changeRankList(list));
  }
}

