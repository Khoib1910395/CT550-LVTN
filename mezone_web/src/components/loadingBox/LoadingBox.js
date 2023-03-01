import React from 'react'
import spinner from '../../images/spinner.gif';
import "./LoadingBox.css"

const LoadingBox = () => {
    return (
        <div className="loading-box">
            <img
                src={spinner}
                style={{ width: '200px', margin: 'auto', display: 'block' }}
                alt='Loading...'
            />
        </div>
    )
}

export default LoadingBox
