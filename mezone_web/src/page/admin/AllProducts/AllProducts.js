import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../../../actions/Product';
import ProductList from '../../../components/ProductList/ProductList'
import './AllProducts.css'

const AllProducts = () => {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <div className="admin-orders-page-container">
            <div className="header-sec">
                <h2>Hello {userInfo.name}!</h2>
            </div>
            <div className='Add-product'>
                <div>
                    Want to add a new product?
                    <Link to="/addproduct">
                        <button className='btn btn-primary'>
                            Add
                        </button>
                    </Link>
                </div>
            </div>
            <ProductList />
        </div>
    )
}

export default AllProducts
