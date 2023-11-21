import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { server } from '../App';
import { Context } from '../main';
// import { Context } from '../main';
// import { server } from '../App';

import '../Styles/OrganiserLogin.css'
// import playerimg from '../assets/iamplayer.jpg'
import Loader from '../Pages/Loader';

const OrganiserLogin = () => {

    // const [loader, setLoader] = useState(false);

    const Navigate = useNavigate();

    const {
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        adminID, setAdminID,
        loader, setLoader
    } = useContext(Context);

    useEffect(() => {
        if (isAdminLoggedIn) {
            alert("Organiser Already Logged In.")
            Navigate('/');
        }
    })

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const callOrganiserLogin = async (e) => {
        e.preventDefault();
        // setLoader(true);

        const { data } = await axios.post(`${server}/organiser/login`, {
            email, password
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        })
        // console.log("logged in response", data);
        if (data.success) {
            setIsAdminLoggedIn(true);
            Navigate('/');
        }
        else {
            alert(data.message);
            setIsAdminLoggedIn(false);
            Navigate('/join');
        }
    }

    return (
        <>

            <div className="organiser-login">
                {
                    loader ? <Loader /> : <div className="organiser-login-container">
                        <div className="img-form">
                            <form onSubmit={callOrganiserLogin}>

                                <input type="email" name='email' required
                                    placeholder='Email'
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                                <input type="password" name='password' required
                                    placeholder='Password'
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />

                                <button type='submit' >Login</button>
                            </form>
                        </div>
                        <div className='register-here'>
                            <p>
                                Not Registered?
                                <Link to={'/join'}>Register here</Link>
                            </p>
                        </div>
                    </div>
                }

            </div>


        </>
    )
}

export default OrganiserLogin