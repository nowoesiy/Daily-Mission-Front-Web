import { getCurrentUser } from '../util/login-util';
import { ACCESS_TOKEN } from '../constants';

const LOAD_USER_START = 'LOAD_USER_START';
const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
const LOAD_USER_FAIL = 'LOAD_USER_FAIL';
const LOGOUT_USER = 'LOGOUT_USER';
const MISSION_SUBMIT_TRUE = 'MISSION_SUBMIT_TRUE';

export const handleLogout = () => {
  return dispatch => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch(logoutUser());
    document.location.href = '/';
  };
};

export const LoadToGetCurrentUser = () => {
  return dispatch => {
    dispatch(loadingBegin());

    getCurrentUser()
      .then(response => {
        dispatch(loadingSucess(response));
      })
      .catch(error => {
        dispatch(loadingFail(error));
      });
  };
};

export const missionSubmitTrue = id => ({
  type: MISSION_SUBMIT_TRUE,
  id,
});

const loadingBegin = () => ({
  type: LOAD_USER_START,
});

const loadingSucess = response => ({
  type: LOAD_USER_SUCCESS,
  response,
});

const loadingFail = error => ({
  type: LOAD_USER_FAIL,
});

const logoutUser = () => ({
  type: LOGOUT_USER,
});

const initialState = {
  authenticated: false,
  currentUser: null,
  loading: false,
};

export default function loginAuth(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_START:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        authenticated: true,
        currentUser: action.response,
        loading: false,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: null,
        authenticated: false,
      };

    case MISSION_SUBMIT_TRUE:
      return {
        ...state,
        currentUser: [
          ...state.currentUser,
          {
            missions: [
              ...state.missions,
              state.currentUser.missions.find(mission =>
                mission.id === action.id
                  ? { ...mission, submit: true }
                  : mission,
              ),
            ],
          },
        ],
      };
    default:
      return state;
  }
}
