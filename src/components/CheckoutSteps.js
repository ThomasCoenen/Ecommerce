import React from 'react'
//show the steps of checkout for user

export default function CheckoutSteps(props) {
    return (
        <div className="checkout-steps">
            {/* conditional for classname, if true then set class to active 
            otherwise set it to empty str */}
            <div className={props.step1 ? 'active' : ''}>Sign-In</div>
            <div className={props.step2 ? 'active' : ''}>Shipping</div>
            <div className={props.step3 ? 'active' : ''}>Payment</div>
            <div className={props.step4 ? 'active' : ''}>Place Order</div>
        </div>
    )
}
