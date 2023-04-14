import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PlaceOrder.css';
import CheckoutSteps from '../../components/checkoutStep/CheckoutStep';
import { Link } from 'react-router-dom';
import { createOrder } from '../../actions/Order';
import { ORDER_CREATE_RESET } from '../../constants/OrderConstant';
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';

const PlaceOrder = (props) => {
    const { userInfo } = useSelector((state) => state.userSignin);
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    const cart = userInfo.cart;
    const address = shippingAddress;
    const dispatch = useDispatch();
    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const itemsPrice = cart.reduce((a, c) => a + c.product.price * c.quantity, 0);
    const totalPrice = itemsPrice;

    useEffect(() => {
        if (success) {
            props.history.push(`/orderDetails/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
            window.location.reload();
        }
    }, [success, order, dispatch, props.history]);

    const placeOrderHandler = () => {
        const order = {
            cart,
            address,
            totalPrice
        };
        dispatch(createOrder(order));
    }
    return (
        <div className="place-order">
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <h2>Place Order</h2>
            <div>
                <span>Name: {userInfo.name}</span>
            </div>
            <div>
                <span>Address: {shippingAddress}</span>
            </div>
            <div>
                <span>Order details:</span>
                <ul className='order-details'>
                    {cart.map((item) => (
                        <li key={item.product}>
                            <div>{item.name}</div>
                            <div>
                                Quantity: {item.quantity}
                            </div>
                            <div>
                                Price: ${item.product.price}
                            </div>
                            <div>
                                Total item price: {item.quantity} x ${item.product.price} = ${item.quantity * item.product.price}
                            </div>
                            <br />
                        </li>
                    ))}
                </ul>
                <div className='total-price'>Total Price: ${totalPrice}</div>
                <div className='notify'>Please pay when the order is shipped to you because we are being set up with a prepayment function. Sorry for the inconvenience</div>
                <div className='notify'>The order will be sent to the carrier, we will e-mail you to notify within 24 hours</div>
            </div>
            <div>
                <button type="submit" onClick={placeOrderHandler}>ORDER!</button>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
            </div>
        </div>
    );
};

export default PlaceOrder;
