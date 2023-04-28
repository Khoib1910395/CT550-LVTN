import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom' 
import { detailsUser, updateUserProfile } from '../../actions/User';
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/UserConstant';
import { signout } from '../../actions/User';
import "./UpdateProfile.css";

const UserProfile = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const userDetails = useSelector((state) => state.userDetails);
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

    const { userInfo } = userSignin;
    const { loading, error, user } = userDetails;
    const {
        success: successUpdate,
        error: errorUpdate,
        loading: loadingUpdate
    } = userUpdateProfile;

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch({
                type: USER_UPDATE_PROFILE_RESET
            })
            dispatch(detailsUser(userInfo._id));
        }
        else {
            setName(user.name);
            setEmail(user.email);
        }

    }, [dispatch, userInfo._id, user]);

    const [redirect, setRedirect] = useState(false);

    const updateDetails = (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            alert('Password does not match.')
        }
        else {
            dispatch(updateUserProfile(
                {
                    name,
                    email,
                    password
                }
            ));
            alert("User info was updated successfully. Please login again to continue using the website.");
            setRedirect(true); 
        }
    }

    if (redirect) {
        dispatch(signout());
        return <Redirect to="/signin" />;
    }
    
    return (
        <div className="user-dets-container">
            
            <form className="form" onSubmit={updateDetails}>
                <h1>Update User Profile</h1>
                {
                    loading ? <LoadingBox></LoadingBox>
                        :
                        error ? (
                            <MessageBox variant="danger">{error}</MessageBox>
                        )
                            :
                            (
                                <>
                                    <div className="form-ip-sec">
                                        <label htmlFor="name">Name:</label>
                                        <input type="name" id="name"
                                            placeholder="Enter name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}>
                                        </input>
                                    </div>

                                    <div className="form-ip-sec">
                                        <label htmlFor="email">E-mail:</label>
                                        <input type="email" id="email"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}>
                                        </input>
                                    </div>

                                    <div className="form-ip-sec">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" id="password"
                                            placeholder="Enter password"
                                            onChange={(e) => setPassword(e.target.value)}>
                                        </input>
                                    </div>

                                    <div className="form-ip-sec">
                                        <label htmlFor="confirmpassword">Confirm password:</label>
                                        <input type="password" id="confirmpassword"
                                            placeholder="Confirm password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}>
                                        </input>
                                    </div>                                
                                    <div className="form-ip-sec">
                                        <button type="submit" className="btn btn-primary">
                                            Update
                                        </button>
                                    </div>
                                </>
                            )
                }
            </form>
        </div>
    )
}

export default UserProfile;
