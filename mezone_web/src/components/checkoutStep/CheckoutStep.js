import React from 'react'
import "./CheckoutStep.css"

const CheckoutSteps = (props) => {
    return (
        <div className="steps-conatiner">
            <div className={props.step1 ? 'active': ''}>Sign In</div>
            <div className={props.step2 ? 'active': ''}>Shipping</div>
            <div className={props.step3 ? 'active': ''}>Place Order</div>
        </div>
    )
}

export default CheckoutSteps
