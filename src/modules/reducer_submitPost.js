import axios from 'axios';
import { missionSubmitTrue } from './reduer_loginAuth';
const UPDATE_TITLE_VALUE = 'UPDATE_TITLE_VALUE';
const UPDATE_CONTENT_VALUE = 'UPDATE_CONTENT_VALUE';
const HANDLE_DROP = 'HANDLE_DROP';
const POST_BOARD_SUCCESS = 'POST_BOARD_SUCCESS';
const GET_BOARD_SUCCESS = 'GET_BOARD_SUCCESS';
const CLOSE_MODAL = 'CLOSE_MODAL';

// 액션 타입 함수

export const updateTitleValue = e => ({
  type: UPDATE_TITLE_VALUE,
  payload: e.target.value,
});

export const updateContentValue = e => ({
  type: UPDATE_CONTENT_VALUE,
  payload: e.target.value,
});

export const handleDrop = (files, event) => ({
  type: HANDLE_DROP,
  files,
});

const postBoardSuccess = () => ({
  type: POST_BOARD_SUCCESS,
});

const getBoardSuccess = response => ({
  type: GET_BOARD_SUCCESS,
  response,
});

export const postBoard = (id, titleValue, contentValue, file) => {
  const formData = new FormData();

  //const json = { title: titleValue, content: contentValue, missionid: id };
  formData.set('missionId', id);
  formData.set('title', titleValue);
  formData.set('content', contentValue);
  //formData.append('requestJson', JSON.stringify(json));
  formData.append('file', file);
  console.log(formData);

  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };

  return dispatch => {
    axios
      .post('http://api.daily-mission.com/api/post', formData, config)
      .then(() => {
        dispatch(postBoardSuccess());
        dispatch(missionSubmitTrue(id));
        console.log('--------------------> 미션 글 Post 성공');
      })
      .catch(error => {
        console.log('failed', error);
      });
  };
};

export const getBoard = id => {
  return dispatch => {
    axios.get(`http://api.daily-mission.com/api/posts/${id}`).then(response => {
      getBoardSuccess(response);
    });
  };
};

export const DeleteBoard = id => {
  axios.delete(`http://api.daily-mission.com/api/posts/${id}`, {
    crossdomain: true,
  });
};

export const closeModel = () => ({
  type: CLOSE_MODAL,
});

//액션 생성함수

const initialState = {
  posts: '',
  titleValue: '',
  contentValue: '',
  fileName: '',
  fileImgUrl: '',
  file: '',
  submit: false,
};
//초기 State

export default function SubmitPost(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TITLE_VALUE:
      return {
        ...state,
        titleValue: action.payload,
      };
    case UPDATE_CONTENT_VALUE:
      return {
        ...state,
        contentValue: action.payload,
      };
    case POST_BOARD_SUCCESS:
      return {
        ...state,
        submit: true,
        titleValue: '',
        contentValue: '',
        fileName: '',
        fileImgUrl: '',
        file: '',
      };
    case GET_BOARD_SUCCESS:
      return {
        ...state,
        posts: action.response.data,
      };
    case HANDLE_DROP:
      return {
        ...state,
        fileName: action.files[0].name,
        fileImgUrl: URL.createObjectURL(action.files[0]),
        file: action.files[0],
      };
    case CLOSE_MODAL:
      return {
        ...state,
        titleValue: '',
        contentValue: '',
        fileName: '',
        fileImgUrl: '',
        file: '',
      };
    default:
      return state;
  }
}
//리듀서 함수
