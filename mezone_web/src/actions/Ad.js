import axios from '../Axios';
import {
    LOAD_ADS,
    LOAD_AD_DETAILS,
    LOAD_HIGHEST_BID,
    PLACE_BID,
    POST_AD,
    START_AUCTION,
    USER_PURCHASED_LOADED,
    AD_POSTED_BY_OTHER,
    UPDATE_AD_IN_AD_LIST,
    UPDATE_TIMER,
    UPDATE_AD_DETAILS,
    LOAD_AD_IMAGE,
    CLEAR_AD_IMAGE,
    IMAGE_LOADING,
    CLEAR_AD_DETAILS,
} from '../constants/AuctionConstant';
import { setAlert } from './Alert';
import setAuthToken from '../utils/setAuthToken';

// Load ads
export const loadAds = () => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    try {
        const res = await axios.get(
            `/ad`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": userInfo.token,
                },
            }
        );

        dispatch({
            type: LOAD_ADS,
            payload: res.data,
        });
    } catch (error) {
        // Get errors array sent by api
        if (!error.response) {
            return dispatch(setAlert('Server error', 'error'));
        }
        console.log(error.response);
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
        }
    }
};

// Load ad details
export const loadAdDetails = (adId) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    try {
        if (localStorage.getItem('token')) {
            setAuthToken(localStorage.getItem('token'));
        }
        const res = await axios.get(`/ad/${adId}`, {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": userInfo.token,
            },
        });

        dispatch({
            type: LOAD_AD_DETAILS,
            payload: res.data,
        });
    } catch (error) {
        // Get errors array sent by api
        if (!error.response) {
            return dispatch(setAlert('Server error', 'error'));
        }
        console.log(error.response);
        const errors = error.response.data.errors;
        if (errors) {
            console.log(errors);
            errors.forEach((error) => dispatch(setAlert(error.msg, 'error', 50000)));
        }
    }
};

// Clear ad details
export const clearAdDetails = () => (dispatch) => {
    dispatch({
        type: CLEAR_AD_DETAILS,
    });
};

// Load ad image
export const loadAdImage = (imageUrl) => async (dispatch) => {
    try {
        const res = await axios.get(imageUrl, {
            responseType: 'blob',
        });

        dispatch({
            type: LOAD_AD_IMAGE,
            payload: URL.createObjectURL(res.data),
        });
    } catch (error) {
        // Get errors array sent by api
        console.log(error);
        if (!error.response) {
            return dispatch(setAlert('Server error', 'error'));
        }
        const errors = error.response.data.errors;
        if (errors) {
            console.log(errors);
            errors.forEach((error) => dispatch(setAlert(error.msg, 'error', 50000)));
        }
    }
};

// Clear ad image
export const clearAdImage = (adId) => async (dispatch) => {
    dispatch({
        type: CLEAR_AD_IMAGE,
    });
};

// Set image status to loading
export const setImageLoadingStatus = () => async (dispatch) => {
    dispatch({
        type: IMAGE_LOADING,
    });
};

// Set ad details
export const setAdDetails = (ad) => (dispatch) => {
    dispatch({
        type: LOAD_AD_DETAILS,
        payload: ad,
    });
};

// Current highest bid on ad
export const loadHighestBid = (adId) => async (dispatch, getState) => {
    const url = `/bid/${adId}`;
    const { userSignin: { userInfo } } = getState();
    try {
        const res = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": userInfo.token,
            },
        }, { params: { option: 'highest' } });

        dispatch({
            type: LOAD_HIGHEST_BID,
            payload: res.data[0],
        });
    } catch (error) {
        // Get errors array sent by api
        if (!error.response) {
            return dispatch(setAlert('Server error', 'error'));
        }
        console.log(error.response);
        const errors = error.response.data.errors;
        if (errors) {
            console.log(errors);
            errors.forEach((error) => dispatch(setAlert(error.msg, 'error', 50000)));
        }
    }
};

// Place bid
export const placeBid = (adId, bidAmount) => async (dispatch, getState) => {
    const url = `/bid/${adId}`;
    const { userSignin: { userInfo } } = getState();
    try {
        const res = await axios.post(url, { amount: bidAmount }, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userInfo.token,
            },
        });
        const res2 = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userInfo.token,
            },
            params: { option: 'highest' }
        });
        dispatch({
            type: PLACE_BID,
            payload: { adDetails: res.data, highestBid: res2.data[0] },
        });
        setAlert('Bid submitted', 'success');
    } catch (error) {
        // Get errors array sent by api
        if (!error.response) {
            return dispatch(setAlert('Server error', 'error'));
        }
        console.log(error.response);
        const errors = error.response.data.errors;
        if (errors) {
            console.log(errors);
            errors.forEach((error) => dispatch(setAlert(error.msg, 'error', 50000)));
        }
    }
};

// Post ad
export const postAd = (data) => async (dispatch, getState) => {
    const url = `/ad`;
    const { userSignin: { userInfo } } = getState();
    try {
        const res = await axios.post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userInfo.token,
            },

        });

        dispatch({
            type: POST_AD,
            payload: res.data.ad,
        });
    } catch (error) {
        // Get errors array sent by api
        if (!error.response) {
            return dispatch(setAlert('Server error', 'error'));
        }
        console.log(error.response);
        const errors = error.response.data.errors;
        if (errors) {
            console.log(errors);
            errors.forEach((error) => dispatch(setAlert(error.msg, 'error', 50000)));
        }
    }
};

// Post ad
export const startAuction = (adId) => async (dispatch, getState) => {
    const url = `/auction/start/${adId}`;
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const res = await axios.get(url,
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": userInfo.token,
                },
            }
        );
        dispatch({
            type: START_AUCTION,
            payload: res,
        });
    } catch (error) {
        // Get errors array sent by api
        if (!error.response) {
            return dispatch(setAlert('Server error', 'error'));
        }
        console.log(error.response);
        const errors = error.response.data.errors;
        if (errors) {
            console.log(errors);
            errors.forEach((error) => dispatch(setAlert(error.msg, 'error', 50000)));
        }
    }
};

// Load ads purchased by user
export const getUserPurchasedAds = () => async (dispatch, getState) => {
    const url = `/products/purchased`;
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const res = await axios.get(url,
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": userInfo.token,
                },
            }
        );

        dispatch({
            type: USER_PURCHASED_LOADED,
            payload: res.data,
        });
    } catch (error) {
        // Get errors array sent by api
        if (!error.response) {
            return dispatch(setAlert('Server error', 'error'));
        }
        console.log(error.response);
        const errors = error.response.data.errors;
        if (errors) {
            console.log(errors);
            errors.forEach((error) => dispatch(setAlert(error.msg, 'error', 50000)));
        }
    }
};

// Load ads purchased by user
export const adPostedByOther = (ad) => (dispatch) => {
    dispatch({
        type: AD_POSTED_BY_OTHER,
        payload: ad,
    });
};

// Update ad in ad list
export const updateAdInList = (ad) => (dispatch) => {
    dispatch({
        type: UPDATE_AD_IN_AD_LIST,
        payload: ad,
    });
};

// Update current ad (adDetails)
export const updateTimer = (timer) => (dispatch) => {
    dispatch({
        type: UPDATE_TIMER,
        payload: timer,
    });
};

// Update current ad (adDetails)
export const updateAdDetails = (ad) => (dispatch) => {
    dispatch({
        type: UPDATE_AD_DETAILS,
        payload: ad,
    });
};
