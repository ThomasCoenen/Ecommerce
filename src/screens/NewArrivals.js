import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import '../App.css';
// import queryString from 'query-string';
// import data from '../data.js'
// import data from '../data/newarrivalsdata.js'  //STATIC DATA
import Product from './Product';
import NewArrival from './NewArrival';

import { useDispatch, useSelector } from 'react-redux';
import { listNewArrivals } from '../actions/newArrivalsActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox.js';
import { listArrivals, listProducts } from '../actions/productActions';


export default function NewArrivals(props) {

    // const [name, setName] = useState('newarrivals')
    let name = "newarrivals"
    // alert(name)
    // let url = props.location.search;
    // let params = queryString.parse(url);
    // console.log(params);

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
        dispatch(listArrivals())
    }, [dispatch])
    // }, [])

    return (
        // <div>
            // <div className="favorites">
            <div className="favorites">

                <h1 style={{textAlign: "center"}}>New Arrivals</h1>


                {
                    loading ? (<LoadingBox></LoadingBox>)
                    :
                    error ? (<MessageBox variant="danger">{error}</MessageBox>)
                    : (
                        <div className="favoriterroducts">
                            
                        {/* <div className=""> */}

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
        // </div>
    )
}
