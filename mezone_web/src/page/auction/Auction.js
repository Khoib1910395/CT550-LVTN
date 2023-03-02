import React, { Fragment, useEffect } from 'react';
import Alert from '../../components/Auction/Alert/Alert';
import Board from '../../components/Auction/Board/Board';
import "./Auction.css"


const Dashboard = (props) => {
  return (
    <div className='auction'>
      <span className='title'>Dashboard Auction</span>
      <div className='auction-alert'>
        <span className='title'>Alert</span>
        <Alert />
      </div>
      <div className='auction-board'>
        <span className='title'>Board</span>
        <Board />
      </div>
    </div> 
  )
}
export default Dashboard;
