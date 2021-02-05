
//useState for animations on burger
//https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks

import React, {useRef, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';


import LeftNav from './LeftNav'

export default function Burger() {

    //If user is signed in will display users Name and also a link to Logout
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin; 

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);

    useEffect(() => {
        //determine if the event target (i.e., the element that was clicked
        //  on) is a descendent of the dropdown menu itself. If it is, do 
        //  nothing. Otherwise, we want to close the dropdown. This is where
        //the dropdownRef constant comes in. Since a ref is a reference to a
        //DOM element, we're able to determine this.
        const pageClickEvent = (e) => {
            // console.log(e);
              // If the active element exists and is clicked outside of
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                setIsActive(!isActive);
            }
        };

        //determine if the user is clicking something on the screen, 
        //and only while the menu is currently active.
        if (isActive) {
            window.addEventListener('click', pageClickEvent);
        }

        //unset event listener once dropdown closed
        return () => {
            window.removeEventListener('click', pageClickEvent);
          }
    }, [isActive]);
  
    return (
      <div className="menu-container">
        {/* <button onClick={onClick} className="menu-trigger"> */}
          {/* <span>User</span> */}
          {/* <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg" alt="User avatar" /> */}
        {/* </button> */}
        
        <button className="menu-trigger Burger" onClick={onClick} >
            <div className="burgclose"/>
            <div className= "burgclose"/>
            <div className="burgclose"/>
        </button>
        
        <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
          <ul>
            {/* <li><a href="/messages">Messages</a></li>
            <li><a href="/trips">Trips</a></li>
            <li><a href="/saved">Saved</a></li> */}

                <li><Link to="/" className="linkproducttype" onClick={() => setIsActive(false)}>Home</Link></li>
                <li><Link to="/newarrivals" className="linkproducttype" onClick={() => setIsActive(false)}>New Arrivals</Link></li>
                <li><Link to="/tops" className="linkproducttype" onClick={() => setIsActive(false)}>Tops</Link></li>
                <li><Link to="/shoes" className="linkproducttype" onClick={() => setIsActive(false)}>Shoes</Link></li>
                <li><Link to="/accessories" className="linkproducttype" onClick={() => setIsActive(false)}>Accessories</Link></li>
                <li><Link to="/outerwear" className="linkproducttype" onClick={() => setIsActive(false)}>Outerwear</Link></li>

                
                <li>
                    <ul className="sidenavbottomlinkscontainer">

                        {
                        
                        userInfo ? (
                            <li><Link to="/profile" className="sidenavbottomlinks" onClick={() => setIsActive(false)}>Your Profile</Link></li>
                        ) : 
                        (
                            <li><Link to="/register" className="sidenavbottomlinks" onClick={() => setIsActive(false)}>Create Account</Link></li>
                        )

                        }

                        <li><Link to="/search" className="sidenavbottomlinks" onClick={() => setIsActive(false)}>Search<FaSearch /></Link></li>
                        <li><Link to="/contact" className="sidenavbottomlinks" onClick={() => setIsActive(false)}>Contact</Link></li>
                        <li><Link to="/policies" className="sidenavbottomlinks" onClick={() => setIsActive(false)}>Policies</Link></li>

                    </ul>
                </li>

          </ul>

        </nav>
      </div>
    );
}
