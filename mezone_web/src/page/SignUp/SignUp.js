import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signup } from '../../actions/User';
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import "./SignUp.css";

const SignUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isUserInfoSaved, setIsUserInfoSaved] = useState(false);

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userSignUp = useSelector((state) => state.userSignUp);

    const { userInfo, loading, error } = userSignUp || {};

    const dispatch = useDispatch();
    const history = useHistory();

    const signUpHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password does not match.');
        } else {
            dispatch(signup(name, email, password));
        }
    };

    useEffect(() => {
        const savedUserInfo = localStorage.getItem('userInfo');
        if (userInfo || savedUserInfo) {
            setIsUserInfoSaved(true);
        }
    }, [userInfo]);

    useEffect(() => {
        if (isUserInfoSaved) {
            history.push(redirect);
        }
    }, [history, isUserInfoSaved, redirect]);

    return (
        <div className="register-container">
            <form className="form" onSubmit={signUpHandler}>
                <div>
                    <h1>Sign Up</h1>
                </div>
                {loading && <LoadingBox />}
                {error && <MessageBox variant="danger">{error}</MessageBox>}

                <div className="regs-form">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter full name"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="regs-form">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="regs-form">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="regs-form">
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmpassword"
                        placeholder="Confirm password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label />
                    <button className="submit-btn" type="submit">
                        Sign Up
                    </button>
                </div>
                <div className="new-user-register">
                    <label />
                    <div>
                        Already have an account?{' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;