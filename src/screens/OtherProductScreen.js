//TEST
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
// import data from '../data/data'
// import data from '../data/newarrivalsdata.js'
// import Product from './Product'
// import data from '../data/data.js'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, detailsNewArrivals, detailsTops } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';

// import { listProducts } from '../actions/productActions';

export default function OtherProductScreen(props) {
    const {name} = props
    // alert(name)

    //from DATA file get product. Find() -> arr funct that find element based on criteria 
    //u define. Get the ID of products inside array.props.match.params.id is the value
    //':id' part the user enters in the ProductScreen

    //show product from static file in frontend
    // const product = data.products.find((x) => Number(x._id) === Number(props.match.params.id));

    // //if user enters wrong product ID
    // if(!product) {  
    //     return <div>Product Not Found</div>
    // }

    // const testing = props.location.search 
    //     ? props.location.search.split("=")[1] 
    //     : "/";
    // alert(testing)

    const dispatch = useDispatch();

    //need to fill prouduct ID. this will give us the id inside the url
    const productId = props.match.params.id;

    const [qty, setQty] = useState(1) //default value for qty=1

    //Load products from produtcDetails from Redux Store
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    //need to dispatch detailsProduct in useEffect
    useEffect(() => {

        // dispatch(detailsOtherProducts(productId, name));
        
        // dispatch(detailsNewArrivals(productId));
        // dispatch(detailsTops(productId));

        //empty array just means run dispatch(detailsProduct()); 
        //after mounting our component to the page
    }, [dispatch, productId]); 

    //redirects user to cart Screen
    const addToCartHandler = () => {
      //changes the routes in ur app.
      //specify QTY as query string w/ ?=
      props.history.push(`/cart/${productId}?qty=${qty}`)
    }


  return (

<div className="favorites">
    {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          {/* <Link to="/">Back to result</Link> */}
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>

                <li>Price : ${product.price}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
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

                  {
                    //only show add to cart button if product in stock
                  product.countInStock > 0 && (
                    <>
                      <li>
                        <div>
                          <div>Qty</div>
                          <div>
                            <select 
                              value={qty} 
                              onChange={e => setQty(e.target.value)}
                            >
                              {
                                //options will go from 1 up to CountInStock
                                //if countinStock=5 this funct reutuns an array from 0 to 
                                //4 so u can map each item. make it 1 to 5 instead of 0 to 4
                                [...Array(product.countInStock).keys()].map(x => (
                                  //key must be unique and x+1 is unique in this case
                                  <option key={x+1} value={x+1}>{x+1}</option>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button 
                          onClick={addToCartHandler}
                          className="primary block"
                          >Add to Cart
                        </button>
                      </li>
                    </>
                  ) 
                  }

                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
</div>
        


    )
}
