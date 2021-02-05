import React, {useState} from 'react'
import { Link } from 'react-router-dom'
// import data from '../data/data.js'


export default function NewArrival(props) {
    const {product} = props

    // const [id, setId] = useState([product.id]);
    // const id = product._id

    return (
        <div key={product._id} className="product">
            <Link to={`/newarrivals/${product._id}`}>
            {/* <Link to={`/productscreen/${product._id}`} id={id}> */}
                <img className="image_prod" src={product.image} alt={product.name}/>
                <div className="itemstuff">
                    <h1 className="itemname">{product._id}</h1>-
                    <h1 className="itemname">{product.name}</h1>-
                    <h2 className="itemname">{product.price}</h2>
                </div>
            </Link>  
        </div>       
    )
}
