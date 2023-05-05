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
    ADD_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    ADMIN_GET_REQUESTS_REQUEST,
    ADMIN_GET_REQUESTS_SUCCESS,
    ADMIN_GET_REQUESTS_FAIL,
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


export const updateUser = (id, user) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.put(`/api/users/${id}`, user, config);

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
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

export const editProduct = (product) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    try {
        const res = await axios.put(`/admin/edit-product/${product._id}`,
            product,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userInfo.token,
                },
            });
        dispatch({
            type: EDIT_PRODUCT_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: EDIT_PRODUCT_FAIL,
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

export const fetchAllRequests = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_GET_REQUESTS_REQUEST }); // dispatch action request
        const { userSignin: { userInfo } } = getState(); // lấy thông tin user đăng nhập từ state
        const { data } = await axios.get('/api/requests', { // gửi request lấy danh sách requests
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userInfo.token,
            },
        });
        dispatch({ type: ADMIN_GET_REQUESTS_SUCCESS, payload: data }); // dispatch action success và truyền danh sách requests vào payload
    } catch (error) {
        dispatch({ // dispatch action fail và truyền error message vào payload
            type: ADMIN_GET_REQUESTS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};