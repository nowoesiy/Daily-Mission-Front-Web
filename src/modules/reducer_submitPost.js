import axios from 'axios';
import { LoadToGetCurrentUser } from './reduer_loginAuth';
import { createBrowserHistory } from 'history';
import { Redirect } from 'react-router-dom';
const POST_BOARD_SUCCESS = 'POST_BOARD_SUCCESS';

// 액션 타입 함수
export const history = createBrowserHistory();

const postBoardSuccess = () => ({
  type: POST_BOARD_SUCCESS,
});

export const postBoard = (formData) => {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };

  return (dispatch) => {
    axios
      .post('https://api.daily-mission.com/api/post', formData, config)
      .then(() => {
        dispatch(LoadToGetCurrentUser());
      })
      .catch((error) => {
        console.log('failed', error);
      });
  };
};

//액션 생성함수

const initialState = {
  posts: '',
  errorMsg: '',
};
//초기 State

export default function SubmitPost(state = initialState, action) {
  switch (action.type) {
    case POST_BOARD_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
//리듀서 함수
