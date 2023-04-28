import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/CartReducer';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer} from './reducers/OrderReducer';
import { productDetailsReducer, productListReducer } from './reducers/ProductReducer';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer, authReduce } from './reducers/UserReducer';
import { analyticsReducer } from './reducers/AnalyticsReducer';
import alertReducer from './reducers/AlertReducer';
import adReducer from './reducers/AdReducer';
import { allUsersReducer, adminOrderListReducer, requestReducer} from './reducers/adminReducer';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    cart: {
        cartItems: localStorage.getItem('userInfo')?.cart
            ? localStorage.getItem('userInfo').cart
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: 'PayPal',
    },
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userRegister: userRegisterReducer,
    userSignin: userSigninReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    allUsers: allUsersReducer,
    adminOrderList: adminOrderListReducer,
    analytics: analyticsReducer,
    alert: alertReducer, 
    ad: adReducer,
    auth: authReduce,
    requestList: requestReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(...[thunk])),
);

export default store;