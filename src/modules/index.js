import { combineReducers } from 'redux';
import MissionReducer from './reducer_mission';
import submitpost from './reducer_submitPost';
import loginAuth from './reduer_loginAuth';

const rootReducer = combineReducers({
  MissionReducer,
  submitpost,
  loginAuth,
});

export default rootReducer;
