import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { signup } from '../../actions/User';
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import "./SignUp.css"

const SignUp = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [isUserInfoSaved, setIsUserInfoSaved] = useState(false); 

    const redirect = props.location.search
        ? props.location.search.split('=')[0]
        : '/';

    const userSignUp = useSelector((state) => state.userSignUp);

    const { userInfo, loading, error } = userSignUp || {};

    const dispatch = useDispatch();

    const signUpHandler = (e) => {
        e.preventDefault();
        if(password !== confirmpassword){
            alert("Password does not match.")
        }
        else{
            dispatch(signup(name,email,password));
        }
        
    }


    useEffect(()=>{
        const savedUserInfo = localStorage.getItem('userInfo'); 
        if(userInfo || savedUserInfo){ 
            setIsUserInfoSaved(true); 
        }
    }, [userInfo])

    useEffect(()=>{
        if(isUserInfoSaved){ 
            props.history.push('/'); 
        }
    }, [props.history, redirect, isUserInfoSaved])
    
    return (
        <div className="register-container">
            <form className="form" onSubmit={signUpHandler}>
                <div>
                    <h1>SignUp</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}

                <div className="form-ip-sec">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name"
                    placeholder="Enter full name"
                    required
                    onChange={(e) => setName(e.target.value)}>
                    </input>
                </div>

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

                <div className="form-ip-sec">
                    <label htmlFor="confirmpassword">Password:</label>
                    <input type="password" id="confirmpassword"
                    placeholder="Confirm password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}>
                    </input>
                </div>


                <div>
                    <label/>
                    <button className="submit-btn" type="submit">
                        Sign Up
                    </button>
                </div>
                <div className="new-user-register">
                    <label/>
                    <div>
                        Already have an account?
                        <Link to={`/signin?redirect=${redirect}`}>
                            Sign In
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUp
