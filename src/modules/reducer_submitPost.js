import axios from 'axios';
import { missionSubmitTrue } from './reduer_loginAuth';
const POST_BOARD_SUCCESS = 'POST_BOARD_SUCCESS';
const POST_BOARD_FAIL = 'POST_BOARD_FAIL';

// 액션 타입 함수

const postBoardSuccess = () => ({
  type: POST_BOARD_SUCCESS,
});

const postBoardFail = () => ({
  type: POST_BOARD_FAIL,
});

export const postBoard = (id, titleValue, contentValue, file) => {
  const formData = new FormData();

  formData.set('missionId', id);
  formData.set('title', titleValue);
  formData.set('content', contentValue);
  formData.append('file', file);

  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };

  return dispatch => {
    axios
      .post('https://api.daily-mission.com/api/post', formData, config)
      .then(() => {
        dispatch(postBoardSuccess());
        dispatch(missionSubmitTrue(id));
        console.log('--------------------> 미션 글 Post 성공');
      })
      .catch(error => {
        dispatch(postBoardFail(error));
        console.log('failed', error.message);
      });
  };
};

export const DeleteBoard = id => {
  axios.delete(`https://api.daily-mission.com/api/posts/${id}`, {
    crossdomain: true,
  });
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

    case POST_BOARD_FAIL:
      return {
        ...state,
        errorMsg: action.response.message,
      };
    default:
      return state;
  }
}
//리듀서 함수
