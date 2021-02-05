import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
// import data from '../data/data'
// import data from '../data/newarrivalsdata.js'
// import Product from './Product'
// import data from '../data/data.js'
import { useDispatch, useSelector } from 'react-redux';
// import { detailsProduct } from '../actions/productActions';

import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import { detailsNewArrivals } from '../actions/newArrivalsActions';

// import { listProducts } from '../actions/productActions';

export default function NewArrivalsScreen(props) {

    const dispatch = useDispatch();

    //need to fill prouduct ID. this will give us the id inside the url
    const productId = props.match.params.id;
    // alert(productId)

    //from DATA file get product. Find() -> arr funct that find element based on criteria 
    //u define. Get the ID of products inside array.props.match.params.id is the value
    //':id' part the user enters in the ProductScreen

    //show product from static file in frontend
    // const product = data.products.find((x) => Number(x._id) === Number(props.match.params.id));

    // //if user enters wrong product ID
    // if(!product) {  
    //     return <div>Product Not Found</div>
    // }

    //Load products from produtcDetails from Redux Store
    const newArrivalsDetails = useSelector((state) => state.newArrivalsDetails);
    const { loading, error, product } = newArrivalsDetails;

    //need to dispatch detailsProduct in useEffect
    useEffect(() => {
        // dispatch(detailsProduct(productId));
        dispatch(detailsNewArrivals(productId));

        //empty array just means run dispatch(detailsProduct()); 
        //after mounting our component to the page
    }, [dispatch, productId]); 


    return (

    <div className="favorites">
        {loading ? (
            <LoadingBox></LoadingBox>
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <div>
            <Link to="/">Back to result</Link>
            <div className="">
                <div className="">
                <img
                    className=""
                    src={product.image}
                    alt={product.name}
                ></img>
                </div>
                <div className="">
                <ul>
                    <li>
                    <h1>{product.name}</h1>
                    </li>

                    <li>Pirce : ${product.price}</li>
                    <li>
                    Description:
                    <p>{product.description}</p>
                    </li>
                </ul>
                </div>
                <div className="">
                <div className="">
                    <ul>
                    <li>
                        <div className="">
                        <div>Price</div>
                        <div className="">${product.price}</div>
                        </div>
                    </li>
                    <li>
                        <div className="">
                        <div>Status</div>
                        <div>
                            {product.countInStock > 0 ? (
                            <span className="success">In Stock</span>
                            ) : (
                            <span className="danger">Unavailable</span>
                            )}
                        </div>
                        </div>
                    </li>
                    <li>
                        <button className="">Add to Cart</button>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        )}
    </div>
        


    )
}
