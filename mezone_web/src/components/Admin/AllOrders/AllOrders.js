import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../../actions/Admin";
import { changeStatusOrder } from "../../../actions/Admin";
import "./AllOrders.css";

const AllOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.adminOrderList.orders);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);


    const filteredOrders = orders.filter((order) => {
        let match =
            order._id.includes(searchTerm) || order.userId.includes(searchTerm);

        if (statusFilter === "all") {
            match = match;
        } else if (statusFilter !== "") {
            match = match && order.status === parseInt(statusFilter);
        }

        return match;
    });

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusFilterChange = (e) => {
        const value = e.target.value;
        setStatusFilter(value);
    };

    const handleNextStepClick = async (order) => {
        if (order.status < 3) {
            const newStatus = order.status + 1;
            await dispatch(changeStatusOrder(order._id, newStatus));
            dispatch(fetchOrders());
        }
    };

    const handleCancelClick = async (order) => {
        if (order.status < 3) {
            const newStatus = 4;
            await dispatch(changeStatusOrder(order._id, newStatus));
            dispatch(fetchOrders());
        }
    };

    const handleReturnClick = async (order) => {
        if (order.status < 3) {
            const newStatus = 5;
            await dispatch(changeStatusOrder(order._id, newStatus));
            dispatch(fetchOrders());
        }
    }

    return (
        <>
            <div className="filters">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search by Order ID or User ID"
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                    />
                </div>
                <div className="status-filter">
                    Filter by status
                    <select
                        value={statusFilter || "all"}
                        onChange={handleStatusFilterChange}
                    >
                        <option value="all">All</option>
                        <option value="0">Pending</option>
                        <option value="1">Completed</option>
                        <option value="2">Received</option>
                        <option value="3">Delivered</option>
                        <option value="4">Cancelled</option>
                    </select>
                </div>
            </div>
            <table className="all-orders">
                <thead>
                    <tr className="all-order-header">
                        <th className="all-order-header-title-id">Order ID</th>
                        <th className="all-order-header-title-product">Products</th>
                        <th className="all-order-header-title-price">Total Price</th>
                        <th className="all-order-header-title-address">Address</th>
                        <th className="all-order-header-title-userid">User ID</th>
                        <th className="all-order-header-title-username">User name</th>
                        <th className="all-order-header-title-time">Ordered At</th>
                        <th className="all-order-header-title-status">Status</th>
                        <th className="all-order-header-title-action">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order._id}>
                            <td className="all-order-id">{order._id}</td>
                            <td className="all-order-info">
                                {order.products.map((product) => (
                                    <p key={product._id}>
                                        {product.product.name} x {product.quantity}
                                    </p>
                                ))}
                            </td>
                            <td className="all-order-price">${order.totalPrice.toFixed(2)}</td>
                            <td className="all-order-address">{order.address}</td>
                            <td className="all-order-userID">
                                    {order.userId}
                            </td>
                            <td className="all-order-userName">
                                    {order.userName}
                            </td>
                            <td className="all-order-date">{new Date(order.orderedAt).toLocaleString()}</td>
                            <td className="all-order-status">
                                {order.status === 0 && <span className="status-pending"><img className='step-img' src="https://res.cloudinary.com/ct466nlcntt/image/upload/v1677812368/stepOrder/step1.png"></img></span>}
                                {order.status === 1 && <span className="status-completed"><img className='step-img' src="https://res.cloudinary.com/ct466nlcntt/image/upload/v1677812368/stepOrder/step2.png"></img></span>}
                                {order.status === 2 && <span className="status-received"><img className='step-img' src="https://res.cloudinary.com/ct466nlcntt/image/upload/v1677812367/stepOrder/step3.png"></img></span>}
                                {order.status === 3 && <span className="status-delivered"><img className='step-img' src="https://res.cloudinary.com/ct466nlcntt/image/upload/v1677812368/stepOrder/step4.png"></img></span>}
                                {order.status === 4  && <span className="status-cancelled"><img className='step-img' src="https://res.cloudinary.com/ct466nlcntt/image/upload/v1677812368/stepOrder/cancel.png"></img></span>}
                                {order.status === 5  && <span className="status-cancelled"><img className='step-img' src="https://res.cloudinary.com/ct466nlcntt/image/upload/v1677898067/stepOrder/returned.png"></img></span>}
                            </td>
                            <td className="all-order-button">
                                {order.status < 3 && (
                                    <>
                                        <button
                                            className="next-step-button"
                                            onClick={() => handleNextStepClick(order)}
                                        >
                                            Next Step
                                        </button>
                                        <button
                                            className="cancel-button"
                                            onClick={() => handleCancelClick(order)}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                                {order.status === 1 && (
                                    <button
                                        className="return-button"
                                        onClick={() => handleReturnClick(order)}
                                    >
                                        Return
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default AllOrders;
