import { 
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_RESET, 
    ORDER_CREATE_SUCCESS, 
    ORDER_DETAILS_FAIL, 
    ORDER_DETAILS_REQUEST, 
    ORDER_DETAILS_SUCCESS, 
    ORDER_MINE_FAIL, 
    ORDER_MINE_REQUEST, 
    ORDER_MINE_SUCCESS, 
} from "../constants/OrderConstant";

export const orderCreateReducer2 = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };

        case ORDER_CREATE_SUCCESS:
            return { loading: true, success: true, order: action.payload };

        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };

        case ORDER_CREATE_RESET:
            return {};

        default:
            return state;
    }
}

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const orderDetailsReducer = (
    state = { loading: true, order: {} },
    action
) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const orderMineListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_MINE_REQUEST:
            return { loading: true };
        case ORDER_MINE_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_MINE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}