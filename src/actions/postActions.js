// define different post-related action creators
import {
  fetchPosts,
  createPost,
  updateExistingPost,
  deleteExistingPost,
  likeExistingPost,
} from "../api/index";

// inport action constants
import {
  CREATE,
  UPDATE,
  DELETE,
  FETCH_ALL,
  LIKE,
} from "../constants/actionTypes";

// consider the fetch_pending, fetch_success, fetch_failure action creators?
// Normal Action creators
export const fetchPostSuccess = (posts) => {
  return {
    type: FETCH_ALL,
    payload: posts,
  };
};

export const createPostSuccess = (_newPost) => {
  return {
    type: CREATE,
    payload: _newPost,
  };
};

export const updatePostSuccess = (_updatedPost) => {
  return {
    type: UPDATE,
    payload: _updatedPost,
  };
};

export const deletePostSuccess = (id) => {
  return {
    type: DELETE,
    payload: id,
  };
};

export const likePostSuccess = (post) => {
  return {
    type: LIKE,
    payload: post,
  };
};

// thunk action creator: fetch all posts from db
export const fetchPostsAsync = () => {
  return async (dispatch, getState) => {
    // async logic here...
    try {
      const { data } = await fetchPosts();
      // note we get an object with posts key from backend
      // data.posts are the posts array
      dispatch(fetchPostSuccess(data.posts));
      console.log("posts fetched and fetch success action also dispatched!");
    } catch (error) {
      console.log(error.message);
    }
  };
};

// thunk action creator: create a new post and save to db
export const createPostAsync = (post) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await createPost(post);
      const newPost = data.newPost; // post we just created
      dispatch(createPostSuccess(newPost)); // dispatch success action
    } catch (error) {
      console.log(error.message);
    }
  };
};

// thunk action creator: update an existing post
export const updatePostAsync = (id, post) => {
  return async (dispatch, getState) => {
    try {
      // call backend, update and save to db and then update frontend
      const { data } = await updateExistingPost(id, post);
      const updatedPost = data.updatedPost; // get updatedpost from backend
      dispatch(updatePostSuccess(updatedPost));
    } catch (error) {
      console.log(error.message);
    }
  };
};

// thunk action creator: delete an existing post
export const deletePostAsync = (id) => {
  return async (dispatch, getState) => {
    try {
      // call backend, update and save to db and then update frontend
      await deleteExistingPost(id);
      dispatch(deletePostSuccess(id));
    } catch (error) {
      console.log(error.message);
    }
  };
};

// thunk action creator: like an existing post
export const likePostAsync = (id) => {
  return async (dispatch, getState) => {
    // first call backend and db, then update frontend
    try {
      const { data } = await likeExistingPost(id);
      const updatedPost = data.updatedPost;
      // then dispatch and update state in store
      dispatch(likePostSuccess(updatedPost));
    } catch (error) {
      console.log(error.message);
    }
  };
};
