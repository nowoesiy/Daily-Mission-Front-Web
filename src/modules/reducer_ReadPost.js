import axios from 'axios';
import { lazyLoad } from '../util/lazyLoad';

const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        'https://api.daily-mission.com/api/post/all',
      );
      dispatch(getPostsSuccess(data));
      lazyLoad();
    } catch (error) {
      console.log(error);
    }
  };
};

const getPostsSuccess = (data) => ({
  type: GET_POSTS_SUCCESS,
  payload: data,
});

const initialState = {
  posts: [],
};

export default function ReadPost(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
}
