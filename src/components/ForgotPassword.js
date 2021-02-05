import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {

    const [email, setEmail] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
    <div>
        <form className="form" onSubmit={submitHandler}>
            <h2>Reset your password</h2>
            <h3>We will send you an email to reset your password.</h3>
            <div>
                {/* must use htmlFor for react apps */}
                <label htmlFor="email"></label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter email"
                    // email is required if using HTML5 validation system
                    required
                    onChange={e => setEmail(e.target.value)}>
                </input>
            </div> 
            <div>
                {/* <label /> */}
                {/* type="submit" so when user clicks Submit button then 
                submitHandler will run */}
                <button 
                    className="primary" 
                    type="submit"
                    >Submit
                </button>
            </div>
            <Link to="/account"><h3>Cancel</h3></Link>
        </form>
    </div>
    )
}
