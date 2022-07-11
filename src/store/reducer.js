import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../pages/Recommend/store";
import { reducer as singersReducer } from "../pages/Singers/store";
import { reducer as rankReducer } from "../pages/Rank/store";
import { reducer as albumReducer } from '../pages/Album/store';
import { reducer as singerReducer } from '../pages/Singer/store';
import { reducer as playerReducer } from './player';

export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
  singer: singerReducer,
  player: playerReducer
});

