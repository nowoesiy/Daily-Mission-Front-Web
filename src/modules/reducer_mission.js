import axios from 'axios';

const POST_ATTENDING_MISSION = 'POST_ATTENDING_MISSION';

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

const initialState = {};

export default function auth(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
