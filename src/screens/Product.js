import React, {useState} from 'react'
import { Link } from 'react-router-dom'
// import data from '../data/data.js'


export default function Product(props) {
    const {product} = props
    const {name} = props //newarrivals

    return (
        <div key={product._id} className="product">
            {/* <Link to={`/product/${product._id}`}> */}
            {/* <Link to={`/productscreen/${product._id}`} id={id}> */}


            {/* <Link to={`/${name}/${product._id}`}> */}
            <Link to={`/product/${product._id}/${name}`}>


                <img className="image_prod" src={product.image} alt={product.name}/>
                <div className="itemstuff">
                    <h1 className="itemname">{product._id}</h1>-
                    <h1 className="itemname">{product.name}</h1>-
                    <h2 className="itemname">{product.price}</h2>
                    <h2 className="itemname">{name}</h2>
                </div>
            </Link>  
        </div>       
    )
}
