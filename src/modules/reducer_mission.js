import axios from 'axios';
import { toast } from 'react-toastify';
import { LoadToGetCurrentUser } from './reduer_loginAuth';
import Alert from '../components/common/Alert';
const POST_ATTENDING_MISSION = 'POST_ATTENDING_MISSION';
const ON_CLICK_MISSION_LIST = 'ON_CLICK_MISSION_LIST';
const ON_CLICK_MY_MISSION_LIST = 'ON_CLICK_MY_MISSION_LIST';
const GET_MISSION_SUCCESS = 'GET_MISSION_SUCCESS';
const GET_HOME_MISSION_SUCCESS = 'GET_HOME_MISSION_SUCCESS';
const GET_HOT_MISSION_SUCCESS = 'GET_HOT_MISSION_SUCCESS';
const POST_MISSION_SUCCESS = 'POST_MISSION_SUCCESS';
const CLOSE_ATTEND_CODE_MESSAGE = 'CLOSE_ATTEND_CODE_MESSAGE';
const POST_ATTEND_MISSION_FAIL = 'POST_ATTEND_MISSION_FAIL';
const CLOSE_ATTEND_MODAL = 'CLOSE_ATTEND_MODAL';
const POST_ATTEND_MISSION_SUCCESS = 'POST_ATTEND_MISSION_SUCCESS';

export const getMissionList = () => {
  return (dispatch) => {
    axios
      .get('https://api.daily-mission.com/api/mission/all')
      .then((response) => {
        dispatch(getMissionSuccess(response.data));
      })
      .catch((error) => {
        console.log('failed', error);
      });
  };
};

export const getHotMissionList = () => {
  return (dispatch) => {
    axios
      .get('https://api.daily-mission.com/api/mission/hot')
      .then((response) => {
        dispatch(getHotMissionSuccess(response.data));
      })
      .catch((error) => {
        console.log('failed', error);
      });
  };
};

export const getHomeMissionList = () => {
  return (dispatch) => {
    axios
      .get('https://api.daily-mission.com/api/mission/new')
      .then((response) => {
        dispatch(getHomeMissionSuccess(response.data));
      })
      .catch((error) => {
        console.log('failed', error);
      });
  };
};

// export const getMissionDetail = id => {
//   return dispatch => {
//     axios
//       .get(`http://api.daily-mission.com/api/mission/${id}`)
//       .then(response => {
//         dispatch(getMissionDetailSuccess(response.data));
//         console.log("('--------------->미션Detail GET성공");
//       })
//       .catch(error => {
//         console.log('failed', error);
//       });
//   };
// };

export const postMission = (formData) => {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
      //Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNTg1ODE3NzY0LCJleHAiOjE1ODY2ODE3NjR9.I3OhWBTVjNFBktuObGQ_-OSjK9WWyqxnq7EAFO9kfBcrYEzVn5jDH2C4n4KSFMKDaSKilIfZKA81SammIH4pXw`,
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };
  return (dispatch) => {
    axios
      .post('https://api.daily-mission.com/api/mission', formData, config)
      .then((response) => {
        dispatch(postMissionSuccess(response));
        dispatch(LoadToGetCurrentUser());
        dispatch(getHomeMissionList());
        dispatch(getMissionList());
      })
      .catch((error) => {
        console.log('failed', error);
      });
  };
};

export const postAttednigMission = (_id, _password) => {
  return (dispatch) => {
    axios
      .post(
        'https://api.daily-mission.com/api/participant',
        {
          mission: {
            id: _id,
          },
          credential: _password,
        },
        {
          headers: {
            'Content-type': 'application/json',
            //Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNTg2MzIzOTk3LCJleHAiOjE1ODcxODc5OTd9.-uW5uJY6WGJQEkLrW1QhBldPJHUpS3yZglu-gtvwdWBS3kLo1GqOy-rSKIZJ2WbAvgR-OJPncfTOuxu0NmYZww`,

            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      )
      .then((response) => {
        dispatch(LoadToGetCurrentUser());
        dispatch(postAttendMissionSuccess());
      })
      .catch((error) => {
        dispatch(postAttendMissionFail(error.response.status));
        console.log(error);
      });
  };
};

export const closetAttendModal = () => ({
  type: CLOSE_ATTEND_MODAL,
});

export const onClickMissionList = (id) => ({
  type: ON_CLICK_MISSION_LIST,
  id,
});

export const onClickMyMissionList = (id) => ({
  type: ON_CLICK_MY_MISSION_LIST,
  id,
});

export const closetAttendCodeMessage = () => ({
  type: CLOSE_ATTEND_CODE_MESSAGE,
});

const postMissionSuccess = (response) => ({
  type: POST_MISSION_SUCCESS,
  payload: response.data.credential,
});

const getMissionSuccess = (response) => ({
  type: GET_MISSION_SUCCESS,
  response,
});

const getHomeMissionSuccess = (response) => ({
  type: GET_HOME_MISSION_SUCCESS,
  response,
});

const getHotMissionSuccess = (response) => ({
  type: GET_HOT_MISSION_SUCCESS,
  response,
});

const postAttendMissionSuccess = () => ({
  type: POST_ATTEND_MISSION_SUCCESS,
});

const postAttendMissionFail = (status) => ({
  type: POST_ATTEND_MISSION_FAIL,
  isPasswordRight: status == 406 ? false : undefined,
});
// const getMissionDetailSuccess = response => ({
//   type: GET_MISSION_DETAIL_SUCCESS,
//   response,
// });

const initialState = {
  missions: [],
  homeMissions: [],
  hotMissions: [],
  activeMissionId: '',
  activeMyMissionId: 50,
  attendCode: '',
  isPasswordRight: undefined,
};

export default function MissionReducer(state = initialState, action) {
  switch (action.type) {
    case ON_CLICK_MISSION_LIST:
      return {
        ...state,
        activeMissionId: action.id,
      };
    case ON_CLICK_MY_MISSION_LIST:
      return {
        ...state,
        activeMyMissionId: action.id,
      };
    case POST_MISSION_SUCCESS:
      return {
        ...state,
        attendCode: action.payload,
      };
    case GET_MISSION_SUCCESS:
      return {
        ...state,
        missions: action.response,
      };
    case GET_HOME_MISSION_SUCCESS:
      return {
        ...state,
        homeMissions: action.response,
      };
    case GET_HOT_MISSION_SUCCESS:
      return {
        ...state,
        hotMissions: action.response,
      };
    case CLOSE_ATTEND_CODE_MESSAGE:
      return {
        ...state,
        attendCode: '',
      };
    case POST_ATTEND_MISSION_SUCCESS:
      return {
        ...state,
        isPasswordRight: true,
      };
    case POST_ATTEND_MISSION_FAIL:
      return {
        ...state,
        isPasswordRight: action.isPasswordRight,
      };

    case CLOSE_ATTEND_MODAL:
      return {
        ...state,
        isPasswordRight: undefined,
      };
    // case GET_MISSION_DETAIL_SUCCESS:
    //   return {
    //     ...state,
    //     activeMission: action.response,
    //   };

    default:
      return state;
  }
}
