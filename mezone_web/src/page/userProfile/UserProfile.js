import React from 'react'
import {connect } from 'react-redux'

import { Link } from 'react-router-dom'
import LoadingBox from '../../components/loadingBox/LoadingBox';
import "./UserProfile.css";

import {
    Box,
    Paper,
    Typography,
    Table,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';

const UserProfile = (props) => {
    return props.loading ? (
        <LoadingBox />
    ) : (
        <div className="user-dets-container">
            <Box className="boxStyle">
                <Paper className="paperStyle">
                    <Typography variant='h5'>My Profile</Typography>
                    <Box className="profileTableStyle">
                        <Table sx={{ width: '60%', minWidth: '200px' }} aria-label='simple table'>
                            <TableBody>
                                <TableRow key='Username'>
                                    <TableCell align='right' className='tableCellStyle'>
                                        User name
                                    </TableCell>
                                    <TableCell align='left' className="tableCellStyle">
                                        {props.user?.name}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='right' className='tableCellStyle'>
                                        Email
                                    </TableCell>
                                    <TableCell align='left' className='tableCellStyle'>
                                        {props.user.email}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='right' className='tableCellStyle'>
                                        Phone
                                    </TableCell>
                                    <TableCell align='left' className='tableCellStyle'>
                                        {props.user.phone}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='right' className='tableCellStyle'>
                                        Address
                                    </TableCell>
                                    <TableCell align='left' className='tableCellStyle'>
                                        {props.user.address}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='right' className='tableCellStyle'>
                                        Type user
                                    </TableCell>
                                    <TableCell align='left' className='tableCellStyle'>
                                        {props.user.type}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Paper>
            </Box>
            <div>
                <Link to='/profile/update'>
                    <button>Update profile </button>
                </Link>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    isAuth: state.auth.isAuthenticated,
    user: state.userSignin.userInfo,
    purchased: state.ad.purchased,
    purchasedLoading: state.ad.purchasedLoading,
});

export default connect(mapStateToProps)(UserProfile);
