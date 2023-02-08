import { React, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {signout} from '../../services/User'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';


export const Header = (props) => {


       const dispatch = useDispatch();

    const [dropdown, setDropDown] = useState(false);
    const [secondDropdown, setSecondDropdown] = useState(false);


    const showDropDown = () =>{
        if(dropdown) setDropDown(false);
        else setDropDown(true);
    }

    const showSecondDropDown = () =>{
        if(secondDropdown) setSecondDropdown(false);
        else setSecondDropdown(true);
    }


    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;


    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const signOutHandler = () =>{
        dispatch(signout());
    }

    const [query, setQuery] = useState('');

    return (
        <>
            <header>
                <div className="container">
                    <div className="inner-content">
                        {/* brand name */}
                        <Link to='/'>
                            <div className="brand">
                                <img className='logo' src='https://res.cloudinary.com/ct466nlcntt/image/upload/v1673407594/mezone_logo.png' />
                            </div>
                        </Link>

                        {/*search bar*/}
                        <div className="search-bar">
                            <input className="search-input"
                                placeholder="Search products"
                            >
                            </input>
                            <div className="search-btn">
                                <SearchIcon />
                            </div>
                        </div>

                        {/*Link*/}
                        <ul className="nav-links">
                        <li>
                            <Link to="/cart"><ShoppingCartIcon/>
                                {
                                    cartItems.length > 0 && 
                                    (<p className="badge">{cartItems.length}</p>)
                                }
                            </Link>
                        </li>
                        <li>
                            {
                                userInfo ? (
                                    <div className="header-dropdown">
                                        
                                        <p onClick={showDropDown}>
                                            {userInfo.name}
                                            <ArrowDropDownIcon/>
                                        </p>

                                        <ul className={ dropdown? 'dropdown-content show' : 'dropdown-content'}>
                                            <li>
                                               <Link to="/profile">Account</Link> 
                                            </li>
                                            <li>
                                               <Link to="/orderhistory">Order History</Link> 
                                            </li>
                                            <li>
                                               <Link to="/" onClick={signOutHandler}>Sign out</Link> 
                                            </li>
                                        </ul>
                                    </div>
                                    
                                ) :
                                (
                                    <Link to="/signin"><AccountCircleIcon/></Link>
                                )
                            }
                            
                        </li>

                        {userInfo && userInfo.type === 'admin' && (
                            <li>
                                <div className="header-dropdown">
                                    <p onClick={showSecondDropDown}>
                                        Admin 
                                        <ArrowDropDownIcon/>
                                    </p>
                            
                                    <ul className={ secondDropdown? 'dropdown-content show' : 'dropdown-content'}>
                                        
                                        <li>
                                           <Link to="/productlist">Products</Link> 
                                        </li>
                                          
                                    </ul>
                                </div>
                            </li>
                        )}
                        
                            
                    </ul>
                    </div>
                    {/*Category */}
                    <div className="category-container">
                        <ul>
                            <li>Appliances</li>
                            <li>Book</li>
                            <li>Electronics</li>
                            <li>Essentials</li>
                            <li>Fashion</li>
                            <li>Mobile</li>
                            <span>||</span>
                            <li>Used Product</li>
                            <li>Auction</li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}
