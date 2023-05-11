import axios from '../Axios';

export const addToCart2 = (id) => async (dispatch, getState) => {
    try {
        const {
            userSignin: { userInfo },
        } = getState();

        const { data } = await axios.post(
            '/api/add-to-cart',
            { id },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userInfo.token,
                },
            }
        );
        const updatedUserInfo = {
            ...userInfo,
            cart: data.cart,
        };

        dispatch({ type: 'USER_SIGNIN_SUCCESS', payload: updatedUserInfo });
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
    } catch (error) {
        dispatch({ type: 'ADD_TO_CART_FAIL', payload: error.message });
    }
};

export const removeFromCart2 = (id) => async (dispatch, getState) => {
    try {
        const {
            userSignin: { userInfo },
        } = getState();

        const { data } = await axios.delete(`/api/remove-from-cart/${id}`, {
            headers: {
                'x-auth-token': userInfo.token,
            },
        });

        const updatedUserInfo = {
            ...userInfo,
            cart: data.cart,
        };

        dispatch({ type: 'USER_SIGNIN_SUCCESS', payload: updatedUserInfo });
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
    } catch (error) {
        dispatch({ type: 'REMOVE_FROM_CART_FAIL', payload: error.message });
    }
};

export const deleteFromCart2 = (id) => async (dispatch, getState) => {
    try {
        const {
            userSignin: { userInfo },
        } = getState();

        const { data } = await axios.delete(`/api/delete-from-cart/${id}`, {
            headers: {
                'x-auth-token': userInfo.token,
            },
        });

        const updatedUserInfo = {
            ...userInfo,
            cart: data.cart,
        };

        dispatch({ type: 'USER_SIGNIN_SUCCESS', payload: updatedUserInfo });
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
    } catch (error) {
        dispatch({ type: 'REMOVE_FROM_CART_FAIL', payload: error.message });
    }
};