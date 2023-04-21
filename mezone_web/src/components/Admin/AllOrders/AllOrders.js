import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../../actions/Admin";
import { changeStatusOrder } from "../../../actions/Admin";
import { detailsUser } from '../../../actions/User';
import "./AllOrders.css";

const AllOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.adminOrderList.orders);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all"); // Thêm giá trị mặc định cho statusFilter
    const [userList, setUserList] = useState({});

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
                    <tr>
                        <th>Order ID</th>
                        <th>Products</th>
                        <th>Total Price</th>
                        <th>Address</th>
                        <th>User ID</th>
                        <th>Ordered At</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td className="order-info">
                                {order.products.map((product) => (
                                    <p key={product._id}>
                                        {product.product.name} x {product.quantity}
                                    </p>
                                ))}
                            </td>
                            <td>{order.totalPrice}</td>
                            <td>{order.address}</td>
                            <td>{order.userId}</td>
                            <td>{new Date(order.orderedAt).toLocaleString()}</td>
                            <td>
                                {(() => {
                                    switch (order.status) {
                                        case 0:
                                            return (
                                                <img
                                                    className="step-img"
                                                    alt="step 1 img"
                                                    src="https://res.cloudinary.com/ct466nlcntt/image/upload/v1677812368/stepOrder/step1.png"
                                                ></img>
                                            );
                                        case 1:
                                            return (
                                                <img
                                                    className="step-img"
                                                    alt="step 2 img"
                                                    src="https://res.cloudinary.com/ct466nlcntt/image/upload/v1677812368/stepOrder/step2.png"
                                                ></img>
                                            );
                                        case 2:
                                            return (
                                                <img
                                                    className="step-img"
                                                    alt="step 3 img"
                                                    src="https://res.cloudinary.com/ct466nlcntt/image/upload/v1677812368/stepOrder/step3.png"
                                                ></img>
                                            );
                                        case 4:
                                            return (
                                                <img
                                                    className="step-img"
                                                    alt="cancel img"
                                                    src="https://res.cloudinary.com/ct466nlcntt/image/upload/v1677812368/stepOrder/cancel.png"
                                                ></img>
                                            );
                                        case 3:
                                            return (
                                                <img
                                                    className="step-img"
                                                    alt="step 4 img"
                                                    src="https://res.cloudinary.com/ct466nlcntt/image/upload/v1677812368/stepOrder/step4.png"
                                                ></img>
                                            );
                                        default:
                                            return "";
                                    }
                                })()}
                            </td>
                            <td>
                                <button
                                    className="next-step-button"
                                    onClick={() => handleNextStepClick(order)}
                                    disabled={order.status >= 3}
                                >
                                    {order.status >= 2 ? "Deliver" : "Complete"}
                                </button>
                                <button
                                    className="cancel-button"
                                    onClick={() => handleCancelClick(order)}
                                    disabled={
                                        ![0, 1, 2].includes(order.status)
                                    }
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default AllOrders;
