import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAddressScreen(props) {

    //only signedin users allowed to see shippingscreen
    //get userSign in info
    const userSignin = useSelector((state) => state.userSignin);
    //get userInfo from userSign in
    const {userInfo} = userSignin;

    //id user not signedIn then redirect user to SignIn screen
    if(!userInfo) {
        props.history.push('account')
    }

    //fill form based on previous data u got from user(if not it would be
    //empty when user comes back to this screen). Get shipping stuff from
    //cart in the reducer
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    //create action to update state of redux once user enters address info
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        //dispatch save shipping address action 
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}))

        //redirect user to payment screen
        props.history.push('/payment')
    }

    return (
        <div>
            {/* set step1 and step2 true */}
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input 
                        type="text" 
                        id="fullName"
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input 
                        type="text" 
                        id="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor="City">City</label>
                    <input 
                        type="text" 
                        id="city"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor="postalcode">Postal Code</label>
                    <input 
                        type="text" 
                        id="postalcode"
                        placeholder="Enter postal code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input 
                        type="text" 
                        id="country"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label></label>
                    <button className="formbutton" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}
