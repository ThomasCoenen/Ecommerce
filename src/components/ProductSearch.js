import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../screens/Product'
import LoadingBox from './LoadingBox.js';
import MessageBox from './MessageBox.js';
import { listProducts } from '../actions/productActions';

export default function ProductSearch({data, searchname, searchedProducts}) {

    const dispatch = useDispatch();
    const searchProduct = useSelector((state) => state.searchProduct)
    const { loading, error, products } = searchProduct

    // useEffect(() => {

    //     // refreshPage()

    //     //dispatch action
    //     dispatch(listProducts())
    //     // products = Array.from(data);

    // }, [dispatch])


    return (
        <div>
            <h1>searchstuff here</h1>
                {
                    <div className="favoriterroducts">

                        { 
                            searchedProducts.map((product) => (
                                    <Product key={product._id} product={product} searchname={searchname}></Product>
                                )  
                            )
                        }

                    </div>
                }
        </div>
    )
}
