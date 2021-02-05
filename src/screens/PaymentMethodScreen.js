import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function PaymentMethodScreen(props) {
    //user should only see this screen if they have entered shippingInfo
    //if user didnt enter shipping info they should be redirected to
    //shipping screen
    const cart = useSelector((state) => state.cart);
    //get shipping address
    const {shippingAddress} = cart;
    //if shipping address is null, redirect user to shipping page
    if (!shippingAddress.address) { 
        props.history.push('/shipping');
    }

    //default payment method is paypal
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()
        //dspatch savePaymentMethod action
        dispatch(savePaymentMethod(paymentMethod));
        //push to placeorder screen when done
        props.history.push('/placeorder')
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form onSubmit={submitHandler} className="form">
            <div>
                <h1>Payment Method</h1>
            </div>
                <div>
                    <input 
                        type="radio" 
                        id="paypal" 
                        value="Paypal"  
                        name="paymentMethod"
                        required
                        //by defualt this payment method will be selected
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </input>
                    {/* id and htmlFor should be equal */}
                    <label htmlFor="paypal">Paypal</label>
                </div>
                <div>
                    <input 
                        type="radio" 
                        id="stripe" 
                        value="Stripe"  
                        name="paymentMethod"
                        required
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </input>
                    {/* id and htmlFor should be equal */}
                    <label htmlFor="stripe">Stripe</label>
                </div>
                <div>
                    <button className="formbutton" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}
