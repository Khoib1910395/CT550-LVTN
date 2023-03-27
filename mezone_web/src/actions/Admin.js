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
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL
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

export const addProduct = (product) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    try {
        const res = await axios.post("/admin/add-product",
            product,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userInfo.token,
                },
            },);
        dispatch({
            type: ADD_PRODUCT_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: ADD_PRODUCT_FAIL,
            payload: err.response.data,
        });
    }
};

export const cloudinaryUpload = (fileToUpload) => {
    return axios.post('/upload/cloudinary-upload', fileToUpload)
        .then(res => res.data)
        .catch(err => console.log(err))
};


export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userInfo.token,
            }
        };
        const { data } = await axios.post('/admin/delete-product', { id }, config);
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};