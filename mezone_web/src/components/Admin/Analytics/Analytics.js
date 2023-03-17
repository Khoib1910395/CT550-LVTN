import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalytics } from '../../../actions/analytics';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import './Analytics.css';
import LoadingBox from '../../loadingBox/LoadingBox';

const Analytics = () => {
    const dispatch = useDispatch();

    const analytics = useSelector((state) => state.analytics);
    const { loading, error, analyticsData } = analytics;

    useEffect(() => {
        dispatch(getAnalytics());
    }, [dispatch]);

    const dataLoaded = !!analyticsData;

    const chartData = [
        { name: 'Mobile', earnings: dataLoaded ? analyticsData.mobileEarnings : 0 },
        { name: 'Essential', earnings: dataLoaded ? analyticsData.essentialEarnings : 0 },
        { name: 'Appliance', earnings: dataLoaded ? analyticsData.applianceEarnings : 0 },
        { name: 'Books', earnings: dataLoaded ? analyticsData.booksEarnings : 0 },
        { name: 'Fashion', earnings: dataLoaded ? analyticsData.fashionEarnings : 0 },
    ];

    return (
        <div>
            {loading ? (
                <div><LoadingBox /></div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                    <div className='analytics-chart'>
                        <h2>Total Earnings: ${analyticsData.totalEarnings}</h2>
                        <BarChart width={600} height={300} data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `$${value}`} />
                            <Tooltip formatter={(value) => `$${value}`} />
                            <Legend />
                            <Bar dataKey="earnings" fill="#8884d8" />
                        </BarChart>
                    </div>
                </>
            )}
        </div>
    );
};

export default Analytics;
