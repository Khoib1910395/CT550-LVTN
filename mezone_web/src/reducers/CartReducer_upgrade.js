export const cartReducer = (
    state = { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' },
    action
) => {
    switch (action.type) {
        case 'ADD_TO_CART_SUCCESS':
            const item = action.payload.cartItem;
            const existItem = state.cartItems.find((x) => x.product._id === item.product._id);
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product._id === existItem.product._id ? item : x
                    ),
                };
            } else {
                return { ...state, cartItems: [...state.cartItems, item] };
            }
        case 'ADD_TO_CART_FAIL':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
