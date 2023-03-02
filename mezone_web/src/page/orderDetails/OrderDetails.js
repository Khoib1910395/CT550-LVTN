import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsOrder, payOrder } from '../../actions/Order';
import { ORDER_PAY_RESET } from '../../constants/OrderConstant';
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import { PayPalButton } from 'react-paypal-button-v2'
import "../placeOrder/PlaceOrder.css"
import "./OrderDetails.css"
import { Link } from 'react-router-dom'
import axios from 'axios';
import { detailsUser } from '../../actions/User';

function OrderDetailsPage(props) {
    const orderId = props.match.params.id;

    const [sdkReady, setSdkReady] = useState(false);

    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay]);


    //fetch user data

    
    const userSignin = useSelector((state) => state.userSignin);
    const userDetails = useSelector((state) => state.userDetails);
    const { userInfo } = userSignin;
    const { userLoading, userError, user } = userDetails;
    useEffect(() => {
        dispatch(detailsUser(userInfo._id));
    }, [dispatch, userInfo._id, user])


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            <h1>Order {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {userInfo.name} <br />
                                    <strong>Address: </strong> {order.address} <br />
                                </p>
                                {order.isDelivered ? (
                                    <MessageBox variant="success">
                                        Delivered at {order.deliveredAt}
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Not Delivered</MessageBox>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Not Paid</MessageBox>
                                )}
                            </div>
                        </li>
                        {order.products.length === 0 ? (<MessageBox>Order is empty</MessageBox>
                        ) : (
                            <li>
                                <div className="card card-body">
                                    <h2>Order Items</h2>
                                    <ul>
                                        {order.products.map((item) => (
                                            <li key={item.product}>
                                                <div className="row">
                                                    <div>
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="small"
                                                        ></img>
                                                    </div>
                                                    <div className="min-30">
                                                        <a href={`/product/${item.product}`}>{item.name}</a>
                                                    </div>

                                                    <div>
                                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong> Order Total</strong>
                                    </div>
                                    <div>
                                        <strong>${order.totalPrice.toFixed(2)}</strong>
                                    </div>
                                </div>
                            </li>
                            {!order.isPaid && (
                                <li>
                                    {!sdkReady ? (
                                        <LoadingBox></LoadingBox>
                                    ) : (
                                        <>
                                            {errorPay && (
                                                <MessageBox variant="danger">{errorPay}</MessageBox>
                                            )}
                                            {loadingPay && <LoadingBox></LoadingBox>}
                                            <PayPalButton
                                                amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            ></PayPalButton>
                                        </>
                                    )}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailsPage;
