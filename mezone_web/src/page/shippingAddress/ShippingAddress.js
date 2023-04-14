import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/Cart';
import CheckoutSteps from '../../components/checkoutStep/CheckoutStep';
import "./ShippingAddress.css";

const ShippingAddress = ({ history }) => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.userSignin);
    const [address, setAddress] = useState(userInfo.address || ', , , -');

    const [pinCode, setPinCode] = useState('');
    const [house, setHouse] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        if (!userInfo) {
            history.push('/signin');
        } else {
            const [a_house, a_street, city_code] = address.split(", ");
            const [a_city, a_pincode] = city_code.split(" - ");
            setHouse(a_house);
            setStreet(a_street);
            setCity(a_city);
            setPinCode(parseInt(a_pincode, 10));
        }
    }, [userInfo, address, history]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newAddress = `${house}, ${street}, ${city} - ${pinCode}`;
        dispatch(saveShippingAddress({ name: userInfo.name, address: newAddress }));
        setAddress(newAddress);
        localStorage.setItem('shippingAddress', JSON.stringify(newAddress));
        history.push('/placeorder');
    };


    return (
        <>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className="shipping-address-form">
            <form onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="house">House / Apartment</label>
                    <input
                        type="text"
                        id="house"
                        placeholder="Enter house / apartment"
                        value={house}
                        onChange={(e) => setHouse(e.target.value)}
                        required
                        className="shipping-address-input"
                    />
                </div>
                <div>
                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        id="street"
                        placeholder="Enter street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                        className="shipping-address-input"
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="shipping-address-input"
                    />
                </div>
                <div>
                    <label htmlFor="pinCode">Pin Code</label>
                    <input
                        type="number"
                        id="pinCode"
                        placeholder="Enter pin code"
                        value={pinCode}
                        onChange={(e) => setPinCode(parseInt(e.target.value, 10))}
                        required
                        className="shipping-address-input"
                    />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Continue
                    </button>
                </div>
            </form>
        </div>
        </>
    );
};

export default ShippingAddress;
