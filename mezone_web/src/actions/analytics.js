import axios from '../Axios';
import {
  ANALYTICS_REQUEST,
  ANALYTICS_SUCCESS,
  ANALYTICS_FAIL,
} from '../constants/analyticsConstants';

export const getAnalytics = () => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  try {
    dispatch({ type: ANALYTICS_REQUEST });
    const { data } = await axios.get('admin/analytics', {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userInfo.token,
      },
    });

    dispatch({
      type: ANALYTICS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANALYTICS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};