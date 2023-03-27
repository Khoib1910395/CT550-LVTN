import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sellerRequest } from '../../actions/User';

const SellerRequestForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestData = {
            name,
            email,
            phone,
        };

        dispatch(sellerRequest(requestData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="phone-number">Phone number:</label>
            <input type="text" id="phone-number" value={phone} onChange={(e) => setPhone(e.target.value)} />

            <button type="submit">Submit</button>
        </form>
    );
};

export default SellerRequestForm;
