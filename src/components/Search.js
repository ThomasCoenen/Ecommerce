import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchAllProducts } from '../actions/productActions'
import ProductSearch from './ProductSearch.js'
import Product from '../screens/Product'
import LoadingBox from './LoadingBox.js';
import MessageBox from './MessageBox.js';

require("es6-promise").polyfill()
require("isomorphic-fetch")

export default function Search() {
    const [searchname, setSearchname] = useState("")
    const [data, setData] = useState([])
    // const [searchedProducts, setSearchedProducts] = useState([])
    // const [products, setProducts] = useState([])

    //query filer
    const [query, setQuery] = useState("")

    const dispatch = useDispatch();
    const searchProduct = useSelector((state) => state.searchProduct)
    const { loading, error, products } = searchProduct
    

    const submitHandler = (e) => {
        //when user click on sign in button this will prevent form from 
        //refreshing. This is what we want bc we will use AJAX request to sign
        // in user
        e.preventDefault()
        dispatch(searchAllProducts(searchname))
    }

    useEffect(() => {
        // dispatch(searchAllProducts(searchname))
        // fetch("http://localhost:5000/api/getallproducts")
        //     //promise
        //     .then((response) => response.json())
        //     .then((searchedProducts) => setSearchedProducts(searchedProducts))
        // const name = products.name
    }, [products])
    

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <h2>Search our Store</h2>
                <label htmlFor="searchname"></label>
                <input 
                    className="forminput"
                    type="text" 
                    id="searchname" 
                    placeholder="search"
                    // email is required if using HTML5 validation system
                    onChange={e => setSearchname(e.target.value)}>
                </input>
                <button 
                    className="formbutton" 
                    type="submit"
                    >Search
                </button>
            </form>                  
            <div className="favorites">
                {
                loading ? (
                    <></>
                    // <LoadingBox></LoadingBox>
                )
                :
                error ? (<MessageBox variant="danger">{error}</MessageBox>)
                : (
                    <div className="favoriterroducts">
                        { 
                        //products && 
                            products.map((product) => (
                                    <Product key={product._id} product={product} name={product.category}></Product>
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
