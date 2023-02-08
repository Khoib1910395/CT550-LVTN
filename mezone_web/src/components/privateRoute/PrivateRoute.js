import React from 'react'
import { Route, Navigate } from "react-router-dom";
import {useSelector} from 'react-redux';

const PrivateRoute = ({component: Component, ...rest}) => {

    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;

    return (
        <div>
            <Route 
            {...rest}
            render={(props) =>
                userInfo? (
                    <Component {...props}></Component>
                ) : 
                (
                    <Navigate to="/signin"/>
                )}>

            </Route>
        </div>
    )
}

export default PrivateRoute
