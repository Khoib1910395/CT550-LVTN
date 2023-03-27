import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  SELLER_REQUEST_REQUEST,
  SELLER_REQUEST_SUCCESS,
  SELLER_REQUEST_FAIL,
} from "../constants/UserConstant"
import {
  USER_LOADED,
  AUTH_ERROR,
} from "../constants/AuctionConstant"
import setAuthToken from '../utils/setAuthToken';
import axios from "../Axios"

export const signup = (name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { email, password }
  });
  try {
    const { data } = await axios.post('/api/signup', { name, email, password });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password }
  });
  try {
    const { data } = await axios.post('/api/signin', { email, password });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const loadUser = () => async (dispath, getState) => {
  if (localStorage.token) setAuthToken(localStorage.token);
  const { userSignin: { userInfo } } = getState();
  try {
    const res = await axios.get(`/auth`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userInfo.token,
      },
    });
    dispath({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispath({
      type: AUTH_ERROR,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({
    type: USER_SIGNOUT
  });
}


export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userInfo?.token,
      },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};


export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`/api/profile`, user, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};

export const sellerRequest = (sellerInfo) => async (dispatch, getState) => {
  try {
    dispatch({ type: SELLER_REQUEST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    console.log(userInfo.token);
    const response = await axios.post("/api/seller/request", {
      headers: {
        "x-auth-token": userInfo.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sellerInfo),
    });
  
    const data = await response.json();

    dispatch({ type: SELLER_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SELLER_REQUEST_FAIL, payload: error.message });
  }
};