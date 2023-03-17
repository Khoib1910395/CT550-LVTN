import axios from '../Axios';
import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL,
    ADMIN_GET_ORDERS_REQUEST,
    ADMIN_GET_ORDERS_SUCCESS,
    ADMIN_GET_ORDERS_FAIL,
    ADMIN_ORDER_UPDATE_REQUEST,
    ADMIN_ORDER_UPDATE_SUCCESS,
    ADMIN_ORDER_UPDATE_FAIL,
} from '../constants/adminConstants';

export const fetchUsers = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: FETCH_USERS_REQUEST })
            const { userSignin: { userInfo } } = getState();
            const res = await axios.get('/admin/get-all-users', {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": userInfo.token,
                },
            });
            dispatch({
                type: FETCH_USERS_SUCCESS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: FETCH_USERS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };
};

export const fetchOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_GET_ORDERS_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get('/admin/get-orders', {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": userInfo.token,
            },
        });

        dispatch({
            type: ADMIN_GET_ORDERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_GET_ORDERS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const changeStatusOrder = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_ORDER_UPDATE_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.post(
            '/admin/change-order-status',
            { id, status },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": userInfo.token,
                },
            }
        );

        dispatch({ type: ADMIN_ORDER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADMIN_ORDER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};