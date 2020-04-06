import axios from 'axios';
import { toast } from 'react-toastify';
import { LoadToGetCurrentUser } from './reduer_loginAuth';
import Alert from '../components/Alert';
const POST_ATTENDING_MISSION = 'POST_ATTENDING_MISSION';
const ON_CLICK_MISSION_LIST = 'ON_CLICK_MISSION_LIST';
const ON_CLICK_MY_MISSION_LIST = 'ON_CLICK_MY_MISSION_LIST';
const GET_MISSION_SUCCESS = 'GET_MISSION_SUCCESS';
const GET_HOME_MISSION_SUCCESS = 'GET_HOME_MISSION_SUCCESS';
const GET_HOT_MISSION_SUCCESS = 'GET_HOT_MISSION_SUCCESS';
const POST_MISSION_SUCCESS = 'POST_MISSION_SUCCESS';

export const getMissionList = () => {
  return dispatch => {
    axios
      .get('https://api.daily-mission.com/api/mission/all')
      .then(response => {
        dispatch(getMissionSuccess(response.data));
      })
      .catch(error => {
        console.log('failed', error);
      });
  };
};

export const getHotMissionList = () => {
  return dispatch => {
    axios
      .get('https://api.daily-mission.com/api/mission/hot')
      .then(response => {
        dispatch(getHotMissionSuccess(response.data));
      })
      .catch(error => {
        console.log('failed', error);
      });
  };
};

export const getHomeMissionList = () => {
  return dispatch => {
    axios
      .get('https://api.daily-mission.com/api/mission/new')
      .then(response => {
        dispatch(getHomeMissionSuccess(response.data));
      })
      .catch(error => {
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

export const postMission = formData => {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNTg1ODE3NzY0LCJleHAiOjE1ODY2ODE3NjR9.I3OhWBTVjNFBktuObGQ_-OSjK9WWyqxnq7EAFO9kfBcrYEzVn5jDH2C4n4KSFMKDaSKilIfZKA81SammIH4pXw`,
      //Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };
  return dispatch => {
    axios
      .post('https://api.daily-mission.com/api/mission', formData, config)
      .then(response => {
        window.alert(
          '해당 미션의 참여코드는' + response.data.credential + '입니다',
        );

        Alert(response.data.credential);
        dispatch(Alert(response.data.credential));
        dispatch(postMissionSuccess(response));
        dispatch(LoadToGetCurrentUser());
        dispatch(getHomeMissionList());
        dispatch(getMissionList());
      })
      .catch(error => {
        console.log('failed', error);
      });
  };
};

export const postAttednigMission = (_id, _password) => {
  return dispatch => {
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
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      )
      .then(() => {
        dispatch(LoadToGetCurrentUser());
      })
      .catch(error => {
        console.log('failed', error);
      });
  };
};

export const onClickMissionList = id => ({
  type: ON_CLICK_MISSION_LIST,
  id,
});

export const onClickMyMissionList = id => ({
  type: ON_CLICK_MY_MISSION_LIST,
  id,
});

const postMissionSuccess = response => ({
  type: POST_MISSION_SUCCESS,
  payload: response.data.credential,
});

const getMissionSuccess = response => ({
  type: GET_MISSION_SUCCESS,
  response,
});

const getHomeMissionSuccess = response => ({
  type: GET_HOME_MISSION_SUCCESS,
  response,
});

const getHotMissionSuccess = response => ({
  type: GET_HOT_MISSION_SUCCESS,
  response,
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
    // case GET_MISSION_DETAIL_SUCCESS:
    //   return {
    //     ...state,
    //     activeMission: action.response,
    //   };

    default:
      return state;
  }
}
