import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsOrder } from '../../actions/Order';
import LoadingDisplay from '../../components/LoadingDisplay/LoadingDisplay';
import './OrderDetails.css';
import axios from '../../Axios';

const OrderDetails = ({ match }) => {
    const orderId = match.params.id;
    const dispatch = useDispatch(); useEffect(() => {
        dispatch(detailsOrder(orderId));
    }, [dispatch, orderId]);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, error, order } = orderDetails;

    const [information, setInformation] = useState('');
    const [message, setMessage] = useState('');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Then you can access the user ID using
    const userId = userInfo._id;

    const handleReturn = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/requests', {
                user: userId,
                order: order._id,
                information,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userInfo.token,
                },
            });
            setMessage(data.message);
        } catch (err) {
            setMessage(err.response.data.message);
        }
    };

    return (
        <div className="order-details">
            <h1 className="order-details__title">Order Details</h1>
            {loading ? (
                <LoadingDisplay />
            ) : error ? (
                <p className="order-details__error">{error}</p>
            ) : (
                <div className="order-details__container">
                    <p className="order-details__id">Order Id: {order._id}</p>
                    <p className="order-details__ordered-at">
                        Ordered At: {new Date(order.orderedAt).toLocaleString()}
                    </p>
                    <p className="order-details__total-price">
                        Total Price: {order.totalPrice}
                    </p>
                    <p className="order-details__address">Address: {order.address}</p>
                    <p className="order-details__status">
                        Status: {order.status === 0 ? 'Pending' : 'Delivered'}
                    </p>
                    <h2 className="order-details__products-title">Products</h2>
                    <table className="order-details__table">
                        <thead>
                            <tr>
                                <th className="order-details__table-header">Name</th>
                                <th className="order-details__table-header">Quantity</th>
                                <th className="order-details__table-header">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.products.map((product) => (
                                <tr key={product._id} className="order-details__table-row">
                                    <td className="order-details__table-data">
                                        {product.product.name}
                                    </td>
                                    <td className="order-details__table-data">
                                        {product.quantity}
                                    </td>
                                    <td className="order-details__table-data">
                                        {product.product.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <h2>Want to return order?</h2>
                    <form className="order-details__form" onSubmit={handleReturn}>
                        <textarea
                            className="order-details__textarea"
                            placeholder="Please enter your return information here..."
                            value={information}
                            onChange={(e) => setInformation(e.target.value)}
                        />
                        <button type="submit" className="order-details__button">
                            Submit
                        </button>
                        {message && <p className="order-details__message">{message}</p>}
                    </form>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;