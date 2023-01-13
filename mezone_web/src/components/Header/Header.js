import { React, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';


export const Header = (props) => {

    
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

    return (
        <>
            <header>
                <div className="container">
                    <div className="inner-content">
                        {/* brand name */}
                        <div className="brand">
                            <img className='logo' src='https://res.cloudinary.com/ct466nlcntt/image/upload/v1673407594/mezone_logo.png' />
                        </div>

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
                                <ShoppingCartIcon />
                                
                            </li>

                            <li>
                            <div className="header-dropdown">
                                        
                                        <p onClick={showDropDown}>
                                            User
                                            <ArrowDropDownIcon/>
                                        </p>

                                        <ul className={ dropdown? 'dropdown-content show' : 'dropdown-content'}>
                                            <li>
                                               Account
                                            </li>
                                            <li>
                                               Order History
                                            </li>
                                            <li>
                                               Sign out
                                            </li>
                                        </ul>
                                    </div>
                            </li>
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
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}
