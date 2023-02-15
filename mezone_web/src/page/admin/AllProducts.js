import React, {useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { listProducts } from '../../services/Product';
import ProductList from '../../components/ProductList/ProductList'
import "./AllProducts.css"

const AllProducts = () => {

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    return (
        <div className="admin-orders-page-container">
            <div className="header-sec">
                <h2>Hello {userInfo.name}!</h2>
            </div>
            
            <ProductList/>
        </div>
    )
}

export default AllProducts
