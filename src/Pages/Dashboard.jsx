import React, { useContext, useEffect, useState } from 'react'
import '../Styles/Dashboard.css'

import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../main';
import { server } from '../App';
import DashboardTournamentCard from '../Components/DashboardTournamentCard';
import Loader from '../Pages/Loader';

const Dashboard = () => {
    const Navigate = useNavigate();

    const [deleteTourna, setDeleteTourna] = useState(true);

    const {
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        setAdminID,
        loader, setLoader
    } = useContext(Context);

    const [myTournaments, setMyTournaments] = useState([]);

    const { adminID } = useParams();
    // console.log("am id", adminID);

    useEffect(() => {

        if (!isAdminLoggedIn) {
            alert("Please Login");
            Navigate('/login')
        }
        setLoader(true);
        const fetchMyTournaments = async () => {
            const { data } = await axios.get(`${server}/tournament/getAllTournament/${adminID}`, {
                headers: {
                    "Content-Type": "application/json",
                }
            }, {
                withCredentials: true,
            });
            // console.log("admin tournas", data);
            // console.log("admin tournas", data.data);
            setLoader(false);
            setMyTournaments(data.data)
        }
        fetchMyTournaments();
    }, [deleteTourna]);


    return (
        <>
            <div className="dashboard">
                {
                    loader ? <Loader /> : <div className="dashboard-container">
                        <div className="post">
                            <div className="create-button">
                                <Link to={`/createtournament/${adminID}`}>
                                    <button>Post a Tournament</button>
                                </Link>
                            </div>
                        </div>
                        <div className="live-tournaments">
                            <h3 className='live-tournaments-head'>
                                My Tournaments
                            </h3>
                            <div className="live-container">
                                {
                                    myTournaments.map((value, index) => {

                                        return (< DashboardTournamentCard
                                            setDeleteTourna={setDeleteTourna}
                                            deleteTourna={deleteTourna}
                                            tournamentTime={value.tournamentTime}
                                            tournamentName={value.tournamentName}
                                            tournamentDate={value.tournamentDate}
                                            imgaddress={value.imgaddress}
                                            prizePool={value.prizePool}
                                            organiserName={value.organiserName}
                                            key={value._id}
                                            tournamentID={value._id}
                                        />)

                                    })
                                }

                            </div>
                        </div>

                    </div>
                }
            </div>
        </>
    )
}

export default Dashboard