import { React, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


export const Header = () => {
    return (
        <>
            <header>
                <div className="container">
                    <div className="inner-content">
                        <div className="brand">
                            <img className='logo' src='https://res.cloudinary.com/ct466nlcntt/image/upload/v1673407594/mezone_logo.png' />
                        </div>
                        <div className="search-bar">
                            <input className="search-input"

                                placeholder="Search products"
                            >
                            </input>

                            <div className="search-btn">
                                search
                            </div>
                        </div>
                        <div className="category-container">
                            <ul>
                                <li>Mobile</li>
                                <li>Laptop</li>
                                <li>Monitor</li>
                                <li>Computer Accessories</li>
                                <li>Earphones</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
