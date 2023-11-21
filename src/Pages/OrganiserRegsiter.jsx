import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';




// import '../Styles/PlayerRegister.css'


// import registerBackground from '../assets/register-background.jpg'
import Loader from '../Pages/Loader';
import { server } from '../App';
import { Context } from '../main';
import '../Styles/OrganiserRegister.css'

const OrganiserRegister = () => {

    const [loader, setLoader] = useState(false);

    const Navigate = useNavigate();

    const {
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        adminID, setAdminID,
    } = useContext(Context);


    if (isAdminLoggedIn) {
        alert("Organiser is logged in.");
        Navigate('/');
    }

    const [organisationName, setOrganisationName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const callOrganiserRegister = async (e) => {
        // setLoader(true);

        e.preventDefault();
        // console.log("send data", organisationName, email, password);
        const { data } = await axios.post(`${server}/organiser/register`, {
            organisationName, email, password
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });

        // console.log("reg res data", data);
        if (data.success) {
            alert(data.message);

            setIsAdminLoggedIn(true);
            setLoader(false);
            Navigate('/');
        }
        else {
            alert(data.message);
            setIsPlayerLoggedIn(false);
            Navigate('/login');
        }
    }

    return (
        <>
            <div className="organiser-register">
                {
                    loader ? <Loader /> : <div>
                        <div className="background-image">
                        </div>

                        <div className="organiser-register-container">
                            {/* <h3>You might be the NEXT LEGEND</h3> */}
                            <div className="form-container">
                                <form onSubmit={callOrganiserRegister}>

                                    <input type="text" name='name' required
                                        placeholder='Organisation Name'
                                        onChange={(e) => {
                                            setOrganisationName(e.target.value)
                                        }}
                                    />

                                    <input type="email" name='email' required
                                        placeholder='Email'
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                    />

                                    <input type="password" name='password' required
                                        placeholder='Password'
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                    />

                                    <button type='submit'>Register</button>
                                </form>
                            </div>
                            <div className='login-here'>
                                <p>Already registered?
                                    <Link to={'/login'}>Login here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                }

            </div>


        </>
    )
}

export default OrganiserRegister