import React from 'react'
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import p2 from './images/p2.jpg';
import p1 from './images/p1.jpg';
// import data from './data/data.js'
import data from './data/data.js'


import './App.css';
import NewArrivals from './screens/NewArrivals';
import Homescreen from './Homescreen';


export default function Collections() {
    return (
        <div>
            <h1 style={{textAlign: "center"}}>Catelog</h1>
            <div className="collections">            
                <div className="collectionsproduct">
                    <Link to="/newarrivals" className="itemname">
                        <img className="image_prod" src={p2} alt=""/>
                        <h1>New Arrivals</h1>
                    </Link>
                </div>
                <div className="collectionsproduct">
                    <Link to="/tops" className="itemname">
                        <img className="image_prod" src={p2} alt=""/>
                        <h1>Tops</h1>
                    </Link>
                </div>
                <div className="collectionsproduct">
                    <Link to="/shoes" className="itemname">
                        <img className="image_prod" src={p2} alt=""/>
                        <h1>Shoes</h1>
                    </Link>
                </div>
                <div className="collectionsproduct">
                    <Link to="/accessories" className="itemname">
                        <img className="image_prod" src={p2} alt=""/>
                        <h1>Accessories</h1>
                    </Link>
                </div>
                <div className="collectionsproduct">
                    <Link to="/t-shirts" className="itemname">
                        <img className="image_prod" src={p2} alt=""/>
                        <h1>T-Shirts</h1>
                    </Link>
                </div>
            </div>


          <Switch>
            {/* <Route path="/collections">
              <Collections />
            </Route> */}
            <Route path="/newarrivals">
              <NewArrivals />
            </Route>
            {/* <Route path="/">
              <Homescreen />
            </Route> */}
            {/* <Route path="/collections">
              <Collections />
            </Route> */}
          </Switch>

        </div>
    )
}
