import { React, useState, useEffect, useRef } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions/User'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';


export const Header = (props) => {

    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropDown(false);
                setSecondDropdown(false);
            }
        };
        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [dropdownRef]);

    const dispatch = useDispatch();

    const [dropdown, setDropDown] = useState(false);
    const [secondDropdown, setSecondDropdown] = useState(false);


    const showDropDown = () => {
        if (dropdown) setDropDown(false);
        else setDropDown(true);
    }

    const showSecondDropDown = () => {
        if (secondDropdown) setSecondDropdown(false);
        else setSecondDropdown(true);
    }


    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;


    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const signOutHandler = () => {
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
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search products"
                                value={query}>
                            </input>

                            <div className="search-btn">
                                <Link to={`/searchresults/${query}`}>
                                    <SearchIcon />
                                </Link>
                            </div>

                        </div>

                        {/*Link*/}
                        <ul className="nav-links">
                            <li>
                                <Link to="/cart"><ShoppingCartIcon />
                                    {
                                        cartItems.length > 0 &&
                                        (<p className="badge">{cartItems.length}</p>)
                                    }
                                </Link>
                            </li>
                            {userInfo && ['admin', 'seller'].includes(userInfo.type) && (
                                <li>
                                    <div className="header-dropdown" ref={dropdownRef}>
                                        <p>
                                            <Link to="/admin">Admin Panel</Link>
                                        </p>

                                    </div>
                                </li>
                            )}
                            <li>
                                {
                                    userInfo ? (
                                        <div className="header-dropdown" ref={dropdownRef}>

                                            <p onClick={showDropDown}>
                                                {userInfo.name}
                                                <ArrowDropDownIcon />
                                            </p>

                                            <ul className={dropdown ? 'dropdown-content show' : 'dropdown-content'} >
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
                                            <Link to="/signin"><AccountCircleIcon /></Link>
                                        )
                                }
                            </li>
                        </ul>
                    </div>
                    {/*Category */}
                    <div className="category-container">
                        <ul>
                            <li><Link to="/category/appliances">Appliances</Link></li>
                            <li><Link to="/category/book">Book</Link></li>
                            <li><Link to="/category/electronics">Electronics</Link></li>
                            <li><Link to="/category/essentials">Essentials</Link></li>
                            <li><Link to="/category/fashion">Fashion</Link></li>
                            <li><Link to="/category/mobiles">Mobiles</Link></li>

                            <li><Link to="/usedproduct">Used Product</Link></li>
                            <li><Link to="/auction">Auction</Link></li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}
