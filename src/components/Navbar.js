import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Burger from './Burger'
import CartScreen from './CartScreen'
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { signout } from '../actions/userActions'

import Account from './Account';
import Search from './Search';
import { FaPaypal, FaCcVisa, FaUserAlt, FaShoppingCart, FaSearch, FaCartPlus, FaInstagram, FaFacebookF, FaCopyright } from 'react-icons/fa';


export default function Navbar() {

    // function refreshPage() {
    //     window.location.reload(false);
    //   }

    //Add a Badge on Cart to show how many items in there
    //get access to cartItems from Redux
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart; 

    // display Users name up top after they sign in (instead of Signin)
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin; 

    const dispatch = useDispatch();

    const signoutHandler = () => {
        //signout action
        dispatch(signout())
    }

    return (
        <div className="Navbar">
            <Burger />

            <Link className="homepicbutton" to="/">Logo
                {/* <button>LunaSeleneBoutique</button> */}
            </Link>
            {/* <h2 className="homepic">LunaSeleneBoutique</h2> */}
            {/* <Account/> */}


            <div className={userInfo ? 'topiconssignedin' : 'topiconsnosignedin'}>
                {
                    userInfo ? (
                        
                        <div className="topicon dropdown">
                            <div className="dropdown-select">
                                <FaUserAlt className="individualicon" style={{color: 'black'}}/>
                            </div>
                            <div className="dropdown-list">
                                <Link to="/profile" className="dropdown-list__item">User Profile</Link>
                                <Link to="/orderhistory" className="dropdown-list__item">Order History</Link>
                                <Link
                                        to="#signout"
                                        className="dropdown-list__item"
                                        onClick={signoutHandler}
                                        >SignOut
                                </Link>
                            </div>
                        </div>
                    ) : 
                    (
                        <div className="topicon">
                            <Link className="topicon" to="/account">
                                <FaUserAlt className="individualicon" style={{color: 'black'}}/>
                            </Link> 
                        </div>
                    )
                }
                
                <div className={userInfo ? 'carticon' : 'topicon'}>
                    <Link className="" to="/search">
                        <FaSearch className="individualicon" style={{color: 'black'}}/>
                    </Link>
                </div>

                <div className="topicon">
                    <Link className="" to="/cart">
                        {/* {cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )} */}
                        <FaShoppingCart style={{color: 'black'}}/>
                            {cartItems.length > 0 && (
                                <span className="badge">{cartItems.length}</span>
                            )}
                    </Link>
                </div>

            </div>

        </div>
    )
}
