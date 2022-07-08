import { CHANGE_PAGE_LOADING, CHANGE_SONG_OF_ARTIST, CHANGE_ARTIST} from './constant';
import { fromJS } from 'immutable';
import api from '../../../api';

const changeArtist = (data) => ({
  type: CHANGE_ARTIST,
  data: fromJS(data)
});

const changeSongOfArtist = (data) => ({
  type: CHANGE_SONG_OF_ARTIST,
  data: fromJS(data)
});

const changePageLoading = (data) => ({
  type: CHANGE_PAGE_LOADING,
  data
});

export const getSingerDetails = (id) => {
  return async dispatch => {
    const res = await api.singers.getSingerDetails(id);

    dispatch(changeArtist(res.artist));
    dispatch(changeSongOfArtist(res.hotSongs));
    dispatch(changePageLoading(false));
  }
}
