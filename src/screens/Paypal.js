//paypal button component
//we created payal button in index.html

import React, {useEffect, useRef} from 'react'
import Axios from 'axios';
import { detailsOrder, payOrder } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SuccessPayScreen from './SuccessPayScreen';

export default function Paypal(props) {
    // const {successPaymentHandler} = props
    // const {checkout, setCheckout} = props


    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    //get orderPay from redux
    const orderPay = useSelector((state) => state.orderPay);
    //rename error to errorPay
    const {
        loading: loadingPay,
        error: errorPay, 
        success: successPay,
    } = orderPay;

    const dispatch = useDispatch();

    //grab paypal button from index.html. access from useRef
    const paypal = useRef()

    //when u render page render all functionalities of paypal button
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                //create an order
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Cool looking table",
                            amount: {
                                currency_code: "USD",
                                // value: 650.00
                                value: order.totalPrice
                            }
                        }
                    ]
                })
            },
            //callback functions to do something if order approves
            onApprove: async (data, actions) => {
                const orderr = await actions.order.capture()
                console.log('orderr:', orderr)
                // const paymentResult = await actions.order.capture()
                // console.log('order:', order)

                const paymentResult = {}
                paymentResult.email = orderr.payer.email_address
                paymentResult.id = orderr.id
                paymentResult.status = orderr.status
                paymentResult.update_time = orderr.update_time
                console.log('paymentResult:', paymentResult)
                dispatch(payOrder(order, paymentResult))
                // setCheckout(false)


                // return (
                //     <SuccessPayScreen />
                // )

                // dispatch(payOrder(order))
            },
            onError: (err) => {
                console.log(err)
            }
        })
        .render(paypal.current)
    }, [])

    return (
        <div>
            {
                !order.isPaid ? (
                    <div ref={paypal}></div>
                ) : (
                    <h3>order has been paid</h3>
                )
            }
        </div>
    )
}
