import { combineReducers } from 'redux';
import MissionReducer from './reducer_mission';
import PostReducer from './reducer_ReadPost';
import submitpost from './reducer_submitPost';
import loginAuth from './reduer_loginAuth';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  PostReducer,
  MissionReducer,
  submitpost,
  loginAuth,
  form: formReducer,
});

export default rootReducer;
