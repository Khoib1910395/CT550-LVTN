import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import openSocket from 'socket.io-client';
// MUI
import { Button, Box, ButtonGroup } from '@mui/material';
// Styling
import './Board.css';
import {
    adAreaStyle,
    boardCardStyle,
    boardStyle,
    paginationStyle,
} from './boardStyle';
// Actions
import { loadAds, adPostedByOther, updateAdInList } from '../../../actions/Ad';
import { setAlert, clearAlerts } from '../../../actions/Alert';
// Components
import Card from '../Card/Card';
import LoadingBox from '../../loadingBox/LoadingBox';

const Board = (props) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [adPerPage] = useState(6);

    useEffect(() => {
        if (props.passedUser) {
            props.loadAds(props.passedUser);
        } else {
            props.loadAds();
            const socket = openSocket('http://localhost:3030');
            // when new ad is added
            socket.on('addAd', (data) => {
                console.log(data);
                if (
                    props.user &&
                    data.ad.owner &&
                    data.ad.owner.toString() !== props.user._id.toString()
                ) {
                    props.clearAlerts();
                    props.setAlert('New ads available', 'info', 60000);
                }
            });
            // when auction starts/ends
            socket.on('auctionStarted', (res) => {
                props.updateAdInList(res.data);
            });
            socket.on('auctionEnded', (res) => {
                props.updateAdInList(res.data);
            });

            // disconnect socket when page left
            return () => {
                socket.emit('leaveHome');
                socket.off();
                props.clearAlerts();
            };
        }
    }, []);

    // Check if user is logged
    // if (!props.isAuth) {
    //     return <Redirect to='/signin' />;
    // }

    // Pagination
    let lastAdIndex = pageNumber * adPerPage;
    let firstAdIndex = lastAdIndex - adPerPage;
    // Page numbers for buttons
    let pageNumbers = [];
    const num = Math.ceil(props.ads.length / adPerPage);
    for (let i = 1; i <= num; i++) {
        pageNumbers.push(i);
    }
    // When page number button is clicked
    const clickPageNumberButton = (num) => {
        setPageNumber(num);
    };

    return (
        props.loading ? (
            <LoadingBox />
        ) : (
            <Box sx={boardStyle}>
                <Box sx={adAreaStyle}>
                    {props.ads.length === props.ads.filter(ad => ad.auctionEnded).length
                        ? <span>
                            <p className='auction__alert'>There are no ads available at the moment</p>
                        </span> 
                        : props.ads.slice(firstAdIndex, lastAdIndex).map((ad) => {
                            return ad.auctionEnded ? null : (
                                <div className='product__container' key={ad._id}>
                                    <Card ad={ad} key={ad._id} dashCard={false} cardStyle={boardCardStyle} />
                                </div>
                            );
                        })}
                </Box>
                <Box sx={paginationStyle}>
                    <ButtonGroup variant='outlined' size='small'>
                        <Button
                            disabled={pageNumber === 1}
                            onClick={(e) => clickPageNumberButton(pageNumber - 1)}
                        >
                            Prev
                        </Button>
                        {pageNumbers.map((num) => {
                            return (
                                <Button
                                    key={num}
                                    disabled={pageNumber === num}
                                    onClick={(e) => clickPageNumberButton(num)}
                                >
                                    {num}
                                </Button>
                            );
                        })}
                        <Button
                            disabled={pageNumber === pageNumbers[pageNumbers.length - 1]}
                            onClick={(e) => clickPageNumberButton(pageNumber + 1)}
                        >
                            Next
                        </Button>
                    </ButtonGroup>
                </Box>
            </Box>
        ));
};

const mapStateToProps = (state) => ({
    ads: state.ad.ads,
    loading: state.ad.loading,
    isAuth: state.auth.isAuthenticated,
    user: state.userSignin.userInfo,
});

export default connect(mapStateToProps, {
    loadAds,
    adPostedByOther,
    setAlert,
    updateAdInList,
    clearAlerts,
})(Board);
