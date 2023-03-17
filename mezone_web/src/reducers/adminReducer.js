import {
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL,
    FETCH_USERS_REQUEST,
    ADMIN_GET_ORDERS_REQUEST,
    ADMIN_GET_ORDERS_SUCCESS,
    ADMIN_GET_ORDERS_FAIL,
    ADMIN_ORDER_UPDATE_REQUEST,
    ADMIN_ORDER_UPDATE_SUCCESS,
    ADMIN_ORDER_UPDATE_FAIL,
    ADMIN_ORDER_UPDATE_RESET
} from '../constants/adminConstants';

const initialState = {
    users: [],
    loading: false,
    error: null,
};

export const allUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const adminOrderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ADMIN_GET_ORDERS_REQUEST:
            return { loading: true, orders: [] };
        case ADMIN_GET_ORDERS_SUCCESS:
            return { loading: false, orders: action.payload };
        case ADMIN_GET_ORDERS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const adminOrderUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_ORDER_UPDATE_REQUEST:
            return { loading: true };
        case ADMIN_ORDER_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case ADMIN_ORDER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case ADMIN_ORDER_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};
