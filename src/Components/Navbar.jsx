import React, { useContext, useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import '../Styles/Navbar.css'
import { Context } from '../main'
import axios from 'axios'
import { server } from '../App'
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

const Navbar = () => {

    const navInitial = {
        left: '0',
        top: '-400px'
    }
    const navFinal = {
        left: '0',
        top: '85px'
    }

    const [verticalNav, setVerticalNav] = useState(false);

    const Navigate = useNavigate();

    const {
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        adminID, setAdminID,
        loader, setLoader
    } = useContext(Context);


    const logOutHandler = async () => {
        setVerticalNav(!verticalNav);

        const { data } = await axios.get(`${server}/organiser/logout`, {
            withCredentials: true,
        });
        console.log("log out data", data);
        if (data.success) {
            alert(data.message);
            setIsAdminLoggedIn(false);
            // console.log(isPlayerLoggedIn)
            Navigate('/');
        }
        else {
            alert(data.message);
            setIsAdminLoggedIn(true);
            // console.log(isPlayerLoggedIn)
        }
        // console.log("log out");
    }

    useEffect(() => {
        const isLoggedInFunc = async () => {
            const { data } = await axios.get(`${server}/organiser`, {
                withCredentials: true,
            });
            // console.log("Login check data", data);

            const resAdminID = data.adminData[0]._id;
            // console.log("res amd id", resAdminID);

            if (data.success) {
                // console.log("player is logged in");
                // const pID = data.playerID;
                setAdminID(resAdminID);
                setIsAdminLoggedIn(true);
            }
            else {
                // console.log("player not logged in");
                setIsAdminLoggedIn(false);
            }
        }
        isLoggedInFunc();
    })

    return (
        <>
            <nav className='navbar'>
                <div className="nav-container">

                    <div className="left">
                        <Link to={'/'} >
                            {/* <img src="" alt="" /> */}
                            <h1>PlayGames</h1>
                            <p>Dashboard</p>
                        </Link>
                    </div>

                    <div className="right">
                        <ul style={verticalNav ? navFinal : navInitial}>
                            <li>
                                <Link to={'/'}> <button onClick={() => {
                                    setVerticalNav(!verticalNav)
                                }}>Home</button> </Link>
                            </li>


                            <li>
                                {
                                    isAdminLoggedIn ? <Link to={`/dashboard/${adminID}`}>
                                        <button onClick={() => {
                                            setVerticalNav(!verticalNav)
                                        }}>Dashboard</button>
                                    </Link>
                                        :
                                        <Link to={'/join'}>
                                            <button onClick={() => {
                                                setVerticalNav(!verticalNav)
                                            }}>Join</button>
                                        </Link>
                                }

                            </li>

                            <li>
                                {
                                    isAdminLoggedIn ? <button className='log-out-btn' onClick={logOutHandler}>Logout</button>
                                        :
                                        <Link to={'/login'}>
                                            <button>Login</button>
                                        </Link>
                                }

                            </li>

                        </ul>
                        <button
                            onClick={() => {
                                setVerticalNav(!verticalNav);
                                console.log("ham clicked")
                            }}
                            className='hamburger'
                        >
                            {
                                verticalNav ? <ImCross /> : <GiHamburgerMenu />
                            }
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar