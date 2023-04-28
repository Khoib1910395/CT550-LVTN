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
                        <th className="all-order-header-title">Order ID</th>
                        <th className="all-order-header-title">Products</th>
                        <th className="all-order-header-title">Total Price</th>
                        <th className="all-order-header-title">Address</th>
                        <th className="all-order-header-title">User ID</th>
                        <th className="all-order-header-title">Ordered At</th>
                        <th className="all-order-header-title">Status</th>
                        <th className="all-order-header-title">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order._id}>
                            <td className="all-order-id">{order._id}</td>
                            <td className="all-order-info">
                                {order.products.map((product) => (
                                    <p key={product._id}>
                                        {product.name} x {product.quantity}
                                    </p>
                                ))}
                            </td>
                            <td className="all-order-price">${order.totalPrice.toFixed(2)}</td>
                            <td className="all-order-address">{order.address}</td>
                            <td>
                                    {order.userId}
                            </td>
                            <td className="all-order-date">{new Date(order.orderedAt).toLocaleString()}</td>
                            <td className="all-order-status">
                                {order.status === 0 && <span className="status-pending">Pending</span>}
                                {order.status === 1 && <span className="status-completed">Completed</span>}
                                {order.status === 2 && <span className="status-received">Received</span>}
                                {order.status === 3 && <span className="status-delivered">Delivered</span>}
                                {order.status === 4  && <span className="status-cancelled">Cancelled</span>}
                                {order.status === 5  && <span className="status-cancelled">Cancelled</span>}
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
