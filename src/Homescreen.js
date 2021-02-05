import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link} from 'react-router-dom';
import mainimg from './images/main.jpg';
import welcome from './images/welcome.jpg';

import main from './images/main.jpg';

import './App.css';
import Product from './screens/Product.js';
import LoadingBox from './components/LoadingBox.js';
import MessageBox from './components/MessageBox.js';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from './actions/productActions';


import addToMailchimp from "gatsby-plugin-mailchimp"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { Typography } from "@material-ui/core"

 
// import data from './data/data.js' ////STATIC DATA

//create ACTION to fetch data from backend

export default function Homescreen() {

    //BEFORE REDUX:

    //hook for getting data from backend 
    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);

    //fill products
    //useEffect happens when ComponentDidMount(after rendering) 
    //to page. funct runs after rendering ur component
    // useEffect(() => {
    //     //ajax req to backened to fetch products
    //     const fetchData = async () => {
    //         try {
    //             setLoading(true)
    //             //fetch data from axios request
    //             const {data} = await axios.get('/api/products')
    //             setLoading(false)
    //             setProducts(data)
    //         } catch(err) {
    //             setError(err.message)
    //             setLoading(false)
    //         }
    //     }
    //     fetchData();
    // }, [])

    // function refreshPage() {
    //     window.location.reload(false);
    // }


    const [email, setEmail] = useState('')


    //REDUX Part:

    // let name = "products"

    //define dispatch
    //dispatch allows u to dispatch any redux action
    const dispatch = useDispatch();

    //productList from Redux Store
    //useSelector used to get object from reduxstore
    const productList = useSelector((state) => state.productList)

    //get 3 values from product list
    // const { loading, error, products } = productList
    const { loading, error, products } = productList

    useEffect(() => {

        // refreshPage()

        //dispatch action
        dispatch(listProducts())
        // products = Array.from(data);

    }, [dispatch])

    // _handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const result = await addToMailchimp(email, listFields)
    //     // I recommend setting `result` to React state
    //     // but you can do whatever you want
    //   }
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if(email) {
        //     //put in query param
        //     fetch(`/api/memberadd?email=${email}`)
        //     .then(res => res.json())
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err))
        // }
        const result = await addToMailchimp(email)
        // this.setState({result: result})

    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // setEmail({})
    //     addToMailchimp(email) // listFields are optional if you are only capturing the email address.
    //     .then(data => {
    //       // I recommend setting data to React state
    //       // but you can do whatever you want (including ignoring this `then()` altogether)
    //       console.log(data)
    //     })
    //     .catch(() => {
    //       // unnecessary because Mailchimp only ever
    //       // returns a 200 status code
    //       // see below for how to handle errors
    //     })
    //     setEmail("") //reset email when done
    //   }
    

    return (
        <div>
            <br />
            <div className="mainpiccontainer">
                <img className="mainpic" src={mainimg} alt=""/>
            </div>

            <br />
            
            <div className="shopnowcontainer">
                <Link to="/collections" className="shopnowlink" style={{textDecoration: "none"}}>
                    <button className="shopnowbutton">Shop Now</button>
                </Link>
            </div>

            {/* <Button
                    variant="contained"
                    color="primary"
                    label="Submit"
                    type="submit"
                    >
                    <Typography variant="button">Shop Now!</Typography>
            </Button> */}

            <br />
            <br />
            <div className="favorites">
                <h1>Our Favorites</h1>

                {
                loading ? (
                    <></>
                    // <LoadingBox></LoadingBox>
                )
                :
                error ? (<MessageBox variant="danger">{error}</MessageBox>)
                : (
                    <div className="favoriterroducts">

                        {/* { 
                        //products && 
                            products.map((product) => (
                                    <Product key={product._id} product={product}></Product>
                                )  
                        )
                        } */}

                        {/* {console.log(products)} */}

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

            <br />
                    {/* PUT ENDPOINT IN GATSBYCONFIG.JS IN ENV VAR!!!! */}
            <div>
            {/* <form className="suscribeform" onSubmit={handleSubmit}>
                <h1>Be the first to get the BizNass!!</h1>
                <h2>shoot us your email and we will be sure to give you the low down on all the thangs!</h2>
                <div className="formsingleitem">
                    <label htmlFor="email"></label>
                    <input 
                        className="forminput suscribeinput3"
                        type="email" 
                        id="email" 
                        required 
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                        // required
                    ></input>
                    <div className="buttoncontainer">
                        <button className="formbutton suscribebutton" type="submit">Subscribe</button>
                    </div>
                </div>
            </form> */}

            <form className="form subscribe" onSubmit={handleSubmit}>
                <h1>Be the first to get the BizNass!!</h1>
                <h2>shoot us your email and we will be sure to give you the low down on all the thangs!</h2>
                <input
                    className="subscribeinput"
                    placeholder="email"
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    variant=""
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="shopnowbutton"
                    variant="contained"
                    color="primary"
                    label="Submit"
                    type="submit"
                    >Subscribe
                </button>
            </form>



            </div>


            <br />
            <div className="aboutsection">
                <div className="aboutstatement">
                    <h1 className="">Happy Shopping!</h1>
                    <p className="aboutmessage">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt    </p>
                </div>
                <div className="aboutimgcontainer">
                    <img className="aboutpic" src={welcome} alt=""/>
                </div>
            </div>
        </div>
    )
}
