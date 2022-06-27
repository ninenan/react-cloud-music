import { fromJS } from 'immutable';
import { CHANGE_CURRENT_ALBUM } from './constant';
import api from '../../../api';

export const changeCurrentALbum = data => ({
  type: CHANGE_CURRENT_ALBUM,
  data: fromJS(data)
});

export const getAlbumList = id => {
  return async (dispatch) => {
    const { playlist } = await api.album.getAlbumDetailRequest(id);

    dispatch(changeCurrentALbum(playlist));
  }
}


