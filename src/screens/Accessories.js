import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import '../App.css';
// import data from '../data.js'
// import data from '../data/newarrivalsdata.js'  //STATIC DATA
import Product from './Product';
import NewArrival from './NewArrival';

import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox.js';
import { listAccessories, listArrivals, listProducts, listTops } from '../actions/productActions';


export default function Accessories(props) {

    let name = "accessories"

    //REDUX Part:

    //define dispatch
    //dispatch allows u to dispatch any redux action
    const dispatch = useDispatch();

    //productList from Redux Store
    //useSelector used to get object from reduxstore
    const productList = useSelector((state) => state.productList)

    //get 3 values from product list
    const { loading, error, products } = productList

    useEffect(() => {
        //dispatch action
        dispatch(listAccessories())
    }, [dispatch])
    // }, [])


    return (
        <div className="favorites">
            <h1>Accessories</h1>
            <div className="favorites">


                {
                    loading ? (<LoadingBox></LoadingBox>)
                    :
                    error ? (<MessageBox variant="danger">{error}</MessageBox>)
                    : (
                        <div className="favoriterroducts">
                            { 
                                products.map((product) => (
                                        <Product key={product._id} product={product} name={name}></Product>
                                    )  
                            )
                            }
                        </div>
                    )
                }



            </div>
        </div>
    )
}
