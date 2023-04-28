import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
// Material UI Componeents
import { Button, Link } from '@mui/material';
// Files
import './Nav.css';
// Actions

const Nav = (props) => {
    return (
        <div className='nav'>
            <div className='nav__group1'>
                {props.isAuth && (
                    <div className='nav__buttons'>
                        <RouterLink to='/auction/dashboard' style={{ textDecoration: 'none' }}>
                            <Button>Dashboard auction</Button>
                        </RouterLink>
                        <RouterLink to='/auction/postad' style={{ textDecoration: 'none' }}>
                            <Button>Post Auction</Button>
                        </RouterLink>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Nav);
