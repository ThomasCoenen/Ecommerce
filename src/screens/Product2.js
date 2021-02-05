import React, {useState} from 'react'
import { Link } from 'react-router-dom'
// import data from '../data/data.js'


export default function Product2(props) {
    const {product} = props
    const {name} = props

    // const [id, setId] = useState([product.id]);
    // const id = product._id

    // const testing = props.location.search 
    //     ? props.location.search.split("=")[1] 
    //     : "/";
    // alert(testing)



    return (
        <div key={product._id} className="product">
            <Link to={`/product/${product._id}`}>
            {/* <Link to={`/${name}/${product._id}`} name={name}> */}
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
