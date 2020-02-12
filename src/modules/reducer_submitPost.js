import axios from 'axios';

const UPDATE_TITLE_VALUE = 'UPDATE_TITLE_VALUE';
const UPDATE_CONTENT_VALUE = 'UPDATE_CONTENT_VALUE';
const HANDLE_DROP = 'HANDLE_DROP';
const POST_BOARD_SUCCESS = 'POST_BOARD_SUCCESS';

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

export const postBoard = (titleValue, contentValue) => {
  return dispatch => {
    axios
      .post('http://54.180.80.58/api/posts', {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        title: titleValue,
        content: contentValue,
        author: '수박씨',
      })
      .then(() => {
        dispatch(postBoardSuccess());
      })
      .catch(error => {
        console.log('failed', error);
      });
  };
};

const postBoardSuccess = () => ({
  type: POST_BOARD_SUCCESS,
});
//액션 생성함수

const initialState = {
  titleValue: '',
  contentValue: '',
  fileName: '',
  fileImgUrl: '',
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
      };
    case HANDLE_DROP:
      return {
        ...state,
        fileName: action.files[0].name,
        fileImgUrl: URL.createObjectURL(action.files[0]),
      };
    default:
      return state;
  }
}
//리듀서 함수
