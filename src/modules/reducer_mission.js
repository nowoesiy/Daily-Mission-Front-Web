import axios from 'axios';

const POST_ATTENDING_MISSION = 'POST_ATTENDING_MISSION';
const ON_CLICK_MISSION_LIST = 'ON_CLICK_MISSION_LIST';
const ON_CLICK_MY_MISSION_LIST = 'ON_CLICK_MY_MISSION_LIST';
const GET_MISSION_SUCCESS = 'GET_MISSION_SUCCESS';
const GET_HOME_MISSION_SUCCESS = 'GET_HOME_MISSION_SUCCESS';
const GET_HOT_MISSION_SUCCESS = 'GET_HOT_MISSION_SUCCESS';

export const getMissionList = () => {
  return dispatch => {
    axios
      .get('http://api.daily-mission.com/api/mission/all')
      .then(response => {
        dispatch(getMissionSuccess(response.data));
        console.log("('--------------->미션목록GET성공");
      })
      .catch(error => {
        console.log('failed', error);
      });
  };
};

export const getHotMissionList = () => {
  return dispatch => {
    axios
      .get('http://api.daily-mission.com/api/mission/hot')
      .then(response => {
        dispatch(getHotMissionSuccess(response.data));
        console.log("('--------------->Hot미션목록GET성공");
      })
      .catch(error => {
        console.log('failed', error);
      });
  };
};

export const getHomeMissionList = () => {
  return dispatch => {
    axios
      .get('http://api.daily-mission.com/api/mission/new')
      .then(response => {
        dispatch(getHomeMissionSuccess(response.data));
        console.log("('--------------->Home미션목록GET성공");
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

export const postAttednigMission = (_id, _password) => {
  return dispatch => {
    axios
      .post(
        'http://api.daily-mission.com/api/participant',
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
        console.log('--------------->미션참여 성공');
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
  //activeMission: '',
  missions: [],
  homeMissions: [],
  hotMissions: [],
  activeMissionId: '',
  activeMyMissionId: 1,
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
