import axios from 'axios';
import { LoadToGetCurrentUser } from './reduer_loginAuth';
const POST_BOARD_SUCCESS = 'POST_BOARD_SUCCESS';

// 액션 타입 함수

const postBoardSuccess = () => ({
  type: POST_BOARD_SUCCESS,
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
        dispatch(LoadToGetCurrentUser());
        console.log('--------------------> 미션 글 Post 성공');
      })
      .catch(error => {
        console.log('failed', error);
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
    default:
      return state;
  }
}
//리듀서 함수
