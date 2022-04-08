// import the action constants
import {
  CREATE,
  UPDATE,
  DELETE,
  FETCH_ALL,
  LIKE,
} from "../constants/actionTypes";

const initialState = {
  currPosts: [], // give some initial test post
  message: "",
};

// A reducer is a funciton that takes in prev state and an action and
// then return a new current state
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        currPosts: action.payload,
      };
    case CREATE:
      return {
        ...state,
        currPosts: [...state.currPosts, action.payload],
      };
    case UPDATE:
      return {
        ...state,
        currPosts: state.currPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        currPosts: state.currPosts.filter(
          (post) => post._id !== action.payload
        ),
      };
    case LIKE:
      return {
        ...state,
        currPosts: state.currPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    default:
      return state;
  }
};

export default postReducer;
