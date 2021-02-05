//https://fontawesome.com/icons?d=gallery
//https://www.youtube.com/watch?v=GGkBwpxV7AI

//MIGHT WANT TO ENABLE ESLINT AND PRETTIER

//load products from backend: set proxy in pck.json in frontend
//when u send a req to API, it gets redirected(proxied) to backend
//"proxy": "http://127.0.0.1:5000",

//axios -> library to send ajax req to server

//Add this file in Frontend:  JSCONFIG.JSON:
//this configuration will make auto import functionallity perfect in ur app
// {
//   "compilerOptions": {
//       "target": "es6"
//   },
//   "exclude": ["node_modules"]
// }


import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import data from './data.js'
import p2 from './images/p2.jpg';
import Homescreen from './Homescreen';
import Collections from './Collections';
import NewArrivals from './screens/NewArrivals';
import Tops from './screens/Tops';
import ProductScreen from './screens/ProductScreen';
import NewArrivalsScreen from './screens/NewArrivalsScreen';
import { signout } from './actions/userActions'


import Search from './components/Search';
import Account from './components/Account';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee} from '@fortawesome/free-solid-svg-icons'
import {  faFacebookF , faInstagram} from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

// import {  faUser} from '@fortawesome/free-brands-svg-icons';


import { FaPaypal, FaCcVisa, FaUserAlt, FaShoppingCart, FaSearch, FaCartPlus, FaInstagram, FaFacebookF, FaCopyright } from 'react-icons/fa';
import { SiVisa } from 'react-icons/si';
import CartScreen from './components/CartScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OtherProductScreen from './screens/OtherProductScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import Shoes from './screens/Shoes';
import Accessories from './screens/Accessories';




library.add(faStroopwafel)

//fab fa-facebook-f

function App(props) {
  const {name} = props

  return (
    
      <BrowserRouter>
        <div className="container">
          <h1 className="topsaying">FREE SHIPPING on orders $100+</h1>
          <Navbar />

          <main>
            {/* <Route path="/:name/:id" component={ProductScreen}></Route> */}
            {/* /product/${product._id}/${name} */}

            <Route path="/product/:id/:name" component={ProductScreen}></Route>

            <Route path="/collections" component={Collections}></Route>
            <Route path="/newarrivals" component={NewArrivals}></Route>
            <Route path="/tops" component={Tops}></Route>
            <Route path="/shoes" component={Shoes}></Route>
            <Route path="/accessories" component={Accessories}></Route>

            {/* <Route path="/newarrivalsproducts" component={NewArrivals}></Route> */}

            {/* <Route path="/:name/:id" component={ProductScreen}></Route> */}
            {/* <Route path="/newarrivals/:id" component={ProductScreen}></Route> */}

          
            <Route path="/search" component={Search}></Route>
            <Route path="/account" component={Account}></Route>
            <Route path="/register" component={Register} ></Route>
            <Route path="/forgotpassword" component={ForgotPassword} ></Route>

            {/* Cart Screan. Will have ID of product but its optional so put a question
            mark. so if user directly goes to cart it will show shopping cart w/out 
            adding a new item to it, thats why we add a question mark */}
            {/* <Route path="/cart/:id?" component={CartScreen} cartName={cartName}></Route> */}
            {/* <Route path="/cart/:name/:id?" component={CartScreen} name={name}></Route> */}
            {/* <Route path="/cart/:name?/:id?" component={CartScreen}></Route> */}
            <Route path="/cart/:id?/:name?" component={CartScreen}></Route>

            <Route path="/shipping" component={ShippingAddressScreen} ></Route>
            <Route path="/payment" component={PaymentMethodScreen} ></Route>
            <Route path="/placeorder" component={PlaceOrderScreen} ></Route>
            <Route path="/order/:id" component={OrderScreen} ></Route>
            <Route path="/orderhistory" component={OrderHistoryScreen} ></Route>
            {/* profile is an authenticated route so instead of route use PrivateRoute
           component we made  */}
            <PrivateRoute 
              path="/profile" 
              component={ProfileScreen}>
            </PrivateRoute>


            <Route path="/" component={Homescreen} exact></Route>
          </main>

          <br />
          <footer className="footer">

            <div className="bottomlinks">
              {/* <span style="font-size: 3em; color: Tomato;">
                <i class="fas fa-camera"></i>
              </span> */}

              {/* <Link to="/collections">
                <i class="fab fa-facebook-f"></i>
              </Link> */}

              {/* <FaCopyright /> */}
              {/* <FaFacebookF style={{color: 'grey'}}>Facebook</FaFacebookF> */}
              <FaFacebookF />
              <FaInstagram />
              <FaInstagram />

              {/* <FaSearch /> */}
              {/* <FaCcVisa /> */}
              {/* <SiVisa /> */}
            </div>

            <div className="bottommessage"> 2021, Luna Selene Boutique Powered by...
            </div>


            <div className="payicons">
              <FaPaypal style={{color: 'blue'}} />
              <i>stripe</i>
              <FaCcVisa />
              <FontAwesomeIcon icon={faCoffee} />
            </div>

          </footer>

        </div>

      </BrowserRouter>
  );
}

export default App;
