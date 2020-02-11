const UPDATE_TITLE_VALUE = 'UPDATE_TITLE_VALUE';
const UPDATE_CONTENT_VALUE = 'UPDATE_CONTENT_VALUE';
const POST_BOARD = 'POST_BOARD';

export const updateTitleValue = e => ({
  type: UPDATE_TITLE_VALUE,
  payload: e.target.value,
});

export const updateContentValue = e => ({
  type: UPDATE_CONTENT_VALUE,
  payload: e.target.value,
});

export const postBoard = ({ title, content }) => ({
  type: POST_BOARD,
  title,
  content,
});

const initialState = { titleValue: '', contentValue: '' };

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
    case POST_BOARD:
      return {
        ...state,
      };
    default:
      return state;
  }
}
