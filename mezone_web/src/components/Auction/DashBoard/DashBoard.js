import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
// MUI
import {
    Box,
    Paper,
    Typography,
    Table,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
// Style files
import { boxStyle, paperStyle } from '../AuctionPost/adStyles';
import { profileTableStyle, tableCellStyle } from './dashStyle';
// Actions
import { clearAlerts } from '../../../actions/Alert';

// Project files
import LoadingBox from '../../loadingBox/LoadingBox';
import DashboardAdList from '../DashBoardAdList/DashBoardAdList';
import LoadingDisplay from '../LoadingDisplay/LoadingDisplay';
// Actions
import { getUserPurchasedAds } from '../../../actions/Ad';
import DashPurchasedList from '../DashPurchasedList/DashPurchasedList';

const Dashboard = (props) => {
    useEffect(() => {
        if (props.isAuth) {
            props.getUserPurchasedAds();
        }
    }, [props.loading]);

    useEffect(() => {
        return () => {
            props.clearAlerts();
        };
    }, []);

    return props.loading ? (
        <LoadingBox />
    ) : (
        <Fragment>
            <Box sx={boxStyle}>
                <Paper sx={paperStyle}>
                    <Typography variant='h5'>My Profile</Typography>
                    <Box sx={profileTableStyle}>
                        <Table sx={{ width: '60%', minWidth: '200px' }} aria-label='simple table'>
                            <TableBody>
                                <TableRow key='Username'>
                                    <TableCell align='right' sx={tableCellStyle}>
                                        User name
                                    </TableCell>
                                    <TableCell align='left' sx={tableCellStyle}>
                                        {props.user?.name}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='right' sx={tableCellStyle}>
                                        Email
                                    </TableCell>
                                    <TableCell align='left' sx={tableCellStyle}>
                                        {props.user.email}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='right' sx={tableCellStyle}>
                                        Phone
                                    </TableCell>
                                    <TableCell align='left' sx={tableCellStyle}>
                                        {props.user.phone}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='right' sx={tableCellStyle}>
                                        Address
                                    </TableCell>
                                    <TableCell align='left' sx={tableCellStyle}>
                                        {props.user.address}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Paper>
            </Box>

            <Box sx={boxStyle}>
                <Paper sx={paperStyle}>
                    <Typography variant='h5'>My Posts</Typography>
                    <DashboardAdList />
                </Paper>
            </Box>

            <Box sx={boxStyle}>
                <Paper sx={paperStyle}>
                    <Typography variant='h5'>My purchases</Typography>
                    {props.purchasedLoading ? (
                        <LoadingDisplay />
                    ) : (
                        <DashPurchasedList ads={props.purchased} />
                    )}
                </Paper>
            </Box>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    isAuth: state.auth.isAuthenticated,
    user: state.userSignin.userInfo,
    purchased: state.ad.purchased,
    purchasedLoading: state.ad.purchasedLoading,
});

export default connect(mapStateToProps, { getUserPurchasedAds, clearAlerts })(Dashboard);
