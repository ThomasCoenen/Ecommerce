
//useState for animations on burger

import React, {useRef, useState, useEffect} from 'react'
import LeftNav from './LeftNav'

export default function Burger() {

    const dropdownRef = useRef(null);

    //burgclose is default class
    const [open, setOpen] = useState(false)



    return (
        <>
            <div 
                className="Burger"
                open={open}
                onClick={() => setOpen(!open)}>

                    <div className={`${open ? 'burgopen' : 'burgclose'}`} />
                    <div className={`${open ? 'burgopen' : 'burgclose'}`} />
                    <div className={`${open ? 'burgopen' : 'burgclose'}`} />
            </div>

            <LeftNav open={open} setOpen={setOpen} />
        </>
    )
}













import React, {useRef, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';


export default function LeftNav({open, setOpen}) {
    //If user is signed in will display users Name and also a link to Logout
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin; 

    return (
        <>
            <ul className="linkslist" open={open} style={{ transform: open ? 'translateX(0%)' : 'translateX(-100%)' }}>
                {/* <div className="burg" style={{ backgroundColor: open ? '#333' : '#ccc' }} /> */}

                <li><Link to="/" className="linkproducttype" onClick={() => setOpen(false)}>Home</Link></li>
                <li><Link to="/newarrivals" className="linkproducttype" onClick={() => setOpen(false)}>New Arrivals</Link></li>
                <li><Link to="/tops" className="linkproducttype" onClick={() => setOpen(false)}>Tops</Link></li>
                <li><Link to="/bottoms" className="linkproducttype" onClick={() => setOpen(false)}>Bottoms</Link></li>
                <li><Link to="/accessories" className="linkproducttype" onClick={() => setOpen(false)}>Accessories</Link></li>

                
                <li>
                    <ul className="sidenavbottomlinkscontainer">

                        {
                        
                        userInfo ? (
                            <li><Link to="/profile" className="sidenavbottomlinks">Your Profile</Link></li>
                        ) : 
                        (
                            <li><Link to="/register" className="sidenavbottomlinks">Create Account</Link></li>
                        )

                        }

                        <li><Link to="/search" className="sidenavbottomlinks">Search<FaSearch /></Link></li>
                        <li><Link to="/policies" className="sidenavbottomlinks">Policies</Link></li>

                    </ul>
                </li>
            </ul>
        </>
    )
}
