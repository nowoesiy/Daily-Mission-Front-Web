import { combineReducers } from 'redux';
import MissionReducer from './reducer_mission';
import submitpost from './reducer_submitPost';
import loginAuth from './reduer_loginAuth';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  MissionReducer,
  submitpost,
  loginAuth,
  form: formReducer,
});

export default rootReducer;
