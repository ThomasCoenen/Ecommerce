import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from './MessageBox';
// import CartNav from './CartNav'

export default function CartScreen(props) {

    //get productID, name, Qty from the URL. just like u did in productScreen
    const name = props.match.params.name;
    const productId = props.match.params.id;
    //since Qty is a query string, getting it is more tricky
    //const qty = props.location.search  --> returns value after question mark
    //split by equal sign and get 2nd value
    //if doesnt exist default value for qty=1
    const qty = props.location.search 
        ? Number(props.location.search.split('=')[1]) 
        : 1;

    //access cart from store
    const cart = useSelector((state) => state.cart)
    console.log(cart)
    const {cartItems} = cart
    console.log(cartItems)
    const dispatch = useDispatch();

    //if productId exists call AddToCart Action to add the product to Cart.Since u
    //do it only ONE TIME use USEEFFECT
    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty, name));
        }
    }, [dispatch, productId, qty])

    //
    const removeFromCartHandler = (id) => {
        //delete action
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        //redirect user to SignIn screen(ACCOUNT=SIGNIN SCREEN!)
        //changes the routes in ur app.
        //after singin user should be redirect to shipping screen
        props.history.push('/account?redirect=shipping')
    }

    return (
        <div className="shoppingcart">
            <div className="shoppingcartrow">
                <h1>Shopping Cart</h1>
                <br />
                {
                //no items in cart show a link to go shopping
                cartItems.length === 0 ? (
                    <MessageBox>Cart is Empty
                        <Link to="/">Go Shopping</Link>
                    </MessageBox>)
                //otherwise we have items in shpping cart. show them. Make 3 columns
                :
                (
                    <ul className="cartitems">
                        {
                            cartItems.map((item) => (
                                <li key={item.product} className="rowitem">

                                    {/*1: item image */}
                                    <div className="">
                                        {/* <div> */}
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="smallimg">
                                        </img>
                                        {/* </div> */}
                                    </div>
                                    
                                    {/*2: item name */}
                                    <div className="">
                                        <Link to={`product/${item.product}`}>{item.name}</Link>
                                    </div>

                                    {/*3: item quantity */}
                                    <div className="">
                                        {/* item.product is the ID of current product */}
                                        <select 
                                            value={item.qty} 
                                            onChange={(e) => 
                                                dispatch(
                                                    addToCart(item.product, Number(e.target.value))
                                                
                                                )
                                            }
                                        >
                                            {
                                                //options will go from 1 up to CountInStock
                                                //if countinStock=5 this funct reutuns an array from 0 to 
                                                //4 so u can map each item. make it 1 to 5 instead of 0 to 4
                                                [...Array(item.countInStock).keys()].map(x => (
                                                //key must be unique and x+1 is unique in this case
                                                <option key={x+1} value={x+1}>{x+1}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    {/*4: item price */}
                                    <div>${item.price}</div>

                                    {/*5: delete item button */}
                                    <div>
                                        <button
                                            className="formbutton"
                                            type="button" 
                                            onClick={() => removeFromCartHandler(item.product)}
                                            >Delete
                                        </button>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    )
                }
            </div>
            {/* cols="30" rows="6" */}
            <div>
                <h2>Special Instructions for Seller</h2>
                <textarea className="sellerinstructions"></textarea>
            </div>

            <div>
                <div className="">
                    <ul className="cartbottom">
                        <li className="">
                            <h2 className="">
                                {/* show number of items and total price */}
                                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                            </h2>
                        </li>
                        <li className="">
                            {/* Checkout button */}
                            <button 
                                type="formbutton" 
                                onClick={checkoutHandler} 
                                className="checkoutbutton"
                                disabled={cartItems.length===0}
                                >Proceed to Checkout
                            </button>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
}
