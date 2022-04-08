// import action constants
import { AUTH, LOGOUT } from "../constants/actionTypes";

// initial state
const initialState = {
  authData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH: {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        authData: action?.payload,
      };
    }
    case LOGOUT: {
      localStorage.clear();
      return { ...state, authData: null };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
