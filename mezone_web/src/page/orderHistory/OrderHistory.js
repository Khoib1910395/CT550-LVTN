import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderMine } from '../../actions/Order'
import LoadingBox from "../../components/loadingBox/LoadingBox"
import MessageBox from "../../components/messageBox/MessageBox"
import "./OrderHistory.css"
import InfoIcon from '@material-ui/icons/Info';

const OrderHistory = (props) => {

    const dispatch = useDispatch();
    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading, error, orders } = orderMineList;

    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch]);

    return (
        <div className="orderhistory-container">
            <h1>Order History</h1>
            {loading ? <LoadingBox></LoadingBox>
                : error ? <MessageBox variant="danger">{error}</MessageBox>
                    : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PRODUCTS</th>
                                    <th>STATUS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, i) => (

                                    <tr key={order._id}>
                                        <td>{i + 1}</td>
                                        <td style={{ width: '8%' }}>{order._id}</td>
                                        <td style={{ width: '8%' }}>{new Date(order.orderedAt).toLocaleDateString()}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            <ul>
                                                {order.products.map((product) => (
                                                    <li key={product._id}>
                                                        <div><b>{product.product.name}</b></div>
                                                        <div>({product.quantity} x ${product.product.price})</div>
                                                        <hr />
                                                        <br />
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>
                                            {(() => {
                                                switch (order.status) {
                                                    case 0:
                                                        return <img className='step-img' src="https://res.cloudinary.com/ct466nlcntt/image/upload/v1677812368/stepOrder/step1.png"></img>;
                                                    case 1:
                                                        return <img className='step-img' src="https://res.cloudinary.com/ct466nlcntt/image/upload/v1677812368/stepOrder/step2.png"></img>;
                                                    case 2:
                                                        return <img className='step-img' src="https://res.cloudinary.com/ct466nlcntt/image/upload/v1677812367/stepOrder/step3.png"></img>;
                                                    case 4:
                                                        return <img className='step-img' src="https://res.cloudinary.com/ct466nlcntt/image/upload/v1677812368/stepOrder/cancel.png"></img>;
                                                    case 5:
                                                        return <img className='step-img' src="https://res.cloudinary.com/ct466nlcntt/image/upload/v1677812368/stepOrder/cancel.png"></img>;
                                                    default:
                                                        return <img className='step-img' src="https://res.cloudinary.com/ct466nlcntt/image/upload/v1677812368/stepOrder/step4.png"></img>;
                                                }
                                            })()}
                                        </td>
                                        <td>
                                            <button type="button" className="order-details-btn"
                                                onClick={() => props.history.push(`/orderDetails/${order._id}`)}>
                                                <InfoIcon />
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
        </div>
    )
}

export default OrderHistory;