import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../loadingBox/LoadingBox';
import { fetchAllRequests } from '../../../actions/Admin';
import "./AllRequest.css"

const AllRequests = () => {
    const dispatch = useDispatch();
    const { loading, error, requests } = useSelector(
        (state) => state.requestList
    );

    useEffect(() => {
        dispatch(fetchAllRequests());
    }, [dispatch]);

    return (
        <div className='req-container'>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <div>{error}</div>
            ) : (
                <table className='req-list'>
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Order Id</th>
                            <th>Information</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests?.map((request) => (
                            <tr key={request._id}>
                                <td className='req-list-item'>{request.user}</td>
                                <td className='req-list-item'>{request.order}</td>
                                <td className='req-list-item'>{request.information}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllRequests;
