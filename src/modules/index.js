import { combineReducers } from 'redux';
import MissionReducer from './reducer_mission';
import submitpost from './reducer_submitPost';

const rootReducer = combineReducers({
  posts: MissionReducer,
  submitpost,
});

export default rootReducer;
