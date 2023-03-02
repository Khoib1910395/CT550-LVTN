import {
    ANALYTICS_REQUEST,
    ANALYTICS_SUCCESS,
    ANALYTICS_FAIL,
} from '../constants/analyticsConstants';

export const analyticsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case ANALYTICS_REQUEST:
            return { loading: true };
        case ANALYTICS_SUCCESS:
            return { loading: false, analyticsData: action.payload };
        case ANALYTICS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
