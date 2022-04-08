// import service api functions
import { userSignIn, userSignUp } from "../api/index";

// import action constants
import { AUTH, LOGOUT } from "../constants/actionTypes";

// Normal action creators
export const signInSuccess = (data) => {
  return {
    type: AUTH,
    payload: data,
  };
};

export const signUpSuccess = (data) => {
  return {
    type: AUTH,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

// Thunk action creators
export const userSignUpAsync = (formData, navigate) => {
  return async (dispatch, getState) => {
    // async logic here
    try {
      // sign up the user, get the user object and jwt token
      const { data } = await userSignUp(formData);
      console.log(data);
      dispatch(signUpSuccess(data));
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const userSignInAsync = (formData, navigate) => {
  return async (dispatch, getState) => {
    // async logic here
    try {
      // log in the user, get the user object and jwt token
      const { data } = await userSignIn(formData);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
};
