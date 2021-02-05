import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
// import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
// import { cartReducer } from '../reducers/cartReducers'

export default function PlaceOrderScreen(props) {
    //need access to cart
    //if user didnt enter payment method redirect them to payment screen
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
      props.history.push('/payment');
    }

    //get orderCreate object from redux store
    //from orderCreate extract these props
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;    

    //Create Order Summary 
    //need to calculate items price, shipping price, tax price, and total price
    //helped funct. round to 2 digits. Number -> String -> Number
    //Items Price
    //convert float numbers to toFixed Numbers. a=acc, c=current_item
    //Shipping Price:
    //if itemsPrice>100, use 0, otherwise 10$    
    //tax Price
    //use fixed %tge = 15%
    //Total Price
    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    cart.itemsPrice = toPrice(
      cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        //dispatch createOrder action
        //return cart as a param but from cart rename cartItems to orderItems 
        //bc in backend we are expecting orderItems not cartItems. use ...
        //operator to deconstruct its props. use all fields of cart obj and 
        //replace cartItems w/ orderItems 
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    }

    useEffect(() => {
        if (success) {
          props.history.push(`/order/${order._id}`);
          dispatch({ type: ORDER_CREATE_RESET });
        }
      }, [dispatch, order, props.history, success]);

    return (        
    <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="placeorderscreen">
            {/* first col: shhipping, payment, and order items */}
            <div className="col-2">
                <ul className="orderleft" style={{listStyle: "none"}}>
                    <li>
                        <div className="card">
                            <h2>Shipping</h2>
                            <br />
                            <p>
                                {/* shipping information */}
                                <strong>Name:</strong> {cart.shippingAddress.fullName} <br/>
                                <strong>Address:</strong> {cart.shippingAddress.address},
                                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                                ,{cart.shippingAddress.country}
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="card">
                            <h2>Payment</h2>
                            <br />
                            <p>
                                {/* shipping information */}
                                <strong>Method:</strong> {cart.paymentMethod} 
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="card">
                            <h2>Order Items</h2>
                            <br />
                            <ul className="orderitems" style={{listStyle: "none"}}> 
                                {
                                cart.cartItems.map((item) => (
                                    <li key={item.product}>
                                        <div classname="row">
                                        {/* //First column for img: */}
                                            <div>
                                                <img 
                                                    src={item.image}    
                                                    alt={item.name} 
                                                    className="small">
                                                </img>
                                            </div>
                                            {/* //2nd column for ProductName*/}
                                            <div className="min-30">
                                                <Link
                                                    to={`/product/${item.product}`}
                                                    >{item.name}
                                                </Link>
                                            </div>
                                            {/*Show Price */}
                                            <div>
                                                {item.qty} x {item.price} = {item.qty * item.price}
                                            </div>
                                        </div>
                                    </li>
                                ))
                                }
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            
            {/* summary portion */}
            <div className="col-1">
                <div className="card ordersummary">
                    <ul className="orderright" style={{listStyle: "none"}}>
                        <li>
                            <h2>Order Summary</h2>
                        </li>
                        <li>
                            <div className="row">
                                <div>Items</div>
                                {/* put 2 digits after decimal */}
                                <div>${cart.itemsPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Shipping</div>
                                <div>${cart.shippingPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Tax</div>
                                <div>${cart.taxPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>
                                    <strong>Order Total</strong>
                                </div>
                                <div>
                                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                                </div>
                            </div>
                        </li>
                        <li>
                            {/* place order button */}
                            <button 
                                type="button"
                                onClick={placeOrderHandler}
                                className="placeorderbutton"
                                //disable button if order empty
                                disabled={cart.cartItems.length === 0}
                                >Place Order
                            </button>
                        {/* //if loading true render loadingbox. if error 
                        exists render Messagebox */}
                        </li>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </ul> 
                </div>
            </div>

        </div>
    </div>
    )
}
