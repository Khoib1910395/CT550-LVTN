import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { signin } from '../../actions/User';
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import "./SignIn.css"

const SignIn = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location && props.location.search
        ? props.location.search.split('=')[2]
        : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();


    const signInHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email,password));
    }

    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect);
        }
    }, [userInfo, redirect, props.history])
    
    return (
        <div className="signin-container">
            <form className="form" onSubmit={signInHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div className="form-ip-sec">
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" id="email"
                    placeholder="Enter email"
                    required
                    onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </div>

                <div className="form-ip-sec">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password"
                    placeholder="Enter password"
                    required
                    onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label/>
                    <button className="submit-btn" type="submit">
                        Sign In
                    </button>
                </div>
                <div className="new-user-register">
                    <label/>
                    <div>
                        New user?
                        <Link to={`/signup?redirect=${redirect}`}>
                            Create Account
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignIn
