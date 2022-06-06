import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../pages/Recommend/store";

console.log('recommendReducer: ', recommendReducer)

export default combineReducers({
  recommend: recommendReducer
});

