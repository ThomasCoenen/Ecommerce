//screen to show user info and give user ability to update their info
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';


export default function ProfileScreen() {

    //define name,email, PW, and confirm PW state
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //get userId from store
    const userSignin = useSelector((state) => state.userSignin)
    const {userInfo} = userSignin;

    //get userDetails from redux
    const userDetails = useSelector((state) => state.userDetails)
    const {loading, error, user} = userDetails;

    //get userUpdateProfileInfo from store
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {
        success: successUpdate, 
        error: errorUpdate, 
        loading: loadingUpdate
    } = userUpdateProfile;

    const dispatch = useDispatch();

    //get user info from store
    useEffect(() => {
        if (!user) {    //if user null
        //reset successUpdate when u open profileScreen for 2nd time
        dispatch({type: USER_UPDATE_PROFILE_RESET})

        //dispatch detailsUser action
            dispatch(detailsUser(userInfo._id))
        } else {
            //fill user info w/ data from backend
            setFirstname(user.firstname);
            setLastname(user.lastname);
            setEmail(user.email);
        }
        //add user in dependency list so when user changes their info the useEffect
        //funct will run again
    }, [dispatch, userInfo._id, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            alert('Password and confirm password do not match')
        } else {
            //dispatch updateProfile action
            dispatch(updateUserProfile({userId: user._id, firstname, lastname, email, password,}))
        }
        
    }

    return (
        <div>
            {/* <form className="form" onSubmit={submitHandler}> */}
                {/* <div><h1>User Profile</h1></div> */}
                {
                    loading ? (<LoadingBox></LoadingBox>) 
                    :
                    error ? (<MessageBox variant="danger">{error}</MessageBox>)
                    : 
                    
                        (
                        // <div>
                        <form className="form" onSubmit={submitHandler}>

                            {/* <h1>User Profile</h1> */}
                            <div><h1>User Profile</h1></div>

                            {loadingUpdate && <LoadingBox></LoadingBox>}
                            {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                            {successUpdate && (<MessageBox variant="success">Profile Updated Successully</MessageBox>)}

                            <div>
                                <label htmlFor="firstname">First Name</label>
                                <input className="forminput" id="firstname" type="text" placeholder="Enter First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="lastname">Last Name</label>
                                <input className="forminput" id="lastname" type="text" placeholder="Enter Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)}></input>
                            </div>
                            {/* <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter name"
                                    value={user.name}
                                ></input> */}
                            <div>
                                <label htmlFor="email">Email</label>
                                <input className="forminput" id="email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input className="forminput" id="password" type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input className="forminput" id="confirmPassword" type="confirmPassword" placeholder="Enter confirm password" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                            </div>

                            <div>
                                <label/>
                                <button className="formbutton" type="submit">Update</button>
                            </div>
                        </form>
                        // {/* </div> */}
                        )
                }

            {/* </form> */}
        </div>
    )
}
