import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_MINE_FAIL, ORDER_MINE_REQUEST, ORDER_MINE_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/OrderConstant"
import axios from "../Axios"
import { CART_EMPTY } from "../constants/cartConstant";

export const createdOrder = (order) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_CREATE_REQUEST,
    payload: order
  })

  try {
    const { userSignin: { userInfo } } = getState();
    const { data } = await axios.post('/api/order', order, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userInfo.token,
      },
    });
    console.log(data);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data.order
    });
    dispatch({
      type: CART_EMPTY
    });

    localStorage.removeItem("cartItems");
  }
  catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const { data } = await axios.post('/api/order', order, 
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userInfo.token,
      },
    });
    const updatedUserInfo = {
      ...userInfo,
      cart: [],
  };
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': userInfo.token,
      },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({
    type: ORDER_MINE_REQUEST,
  });
  const {
    userSignin: { userInfo }
  } = getState();

  try {
    const { data } = await axios.get('/api/orders/me', {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userInfo.token,
      },
    });
    console.log(data);
    dispatch({ type: ORDER_MINE_SUCCESS, payload: data });
  }
  catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_MINE_FAIL, payload: message });
  }

}