import React, { Fragment, useEffect } from 'react';
import Alert from '../../components/Auction/Alert/Alert';
import Board from '../../components/Auction/Board/Board';
import Nav from '../../components/Auction/Nav/Nav';
import "./Auction.css"


const Dashboard = (props) => {
  return (
    <div className='auction'>
      <div className='nav__display'>
        <Nav />
      </div>
      <div className='auction-alert'>
        <Alert />
      </div>
      <div className='auction-board'>
        <Board />
      </div>
    </div>
  )
}
export default Dashboard;
