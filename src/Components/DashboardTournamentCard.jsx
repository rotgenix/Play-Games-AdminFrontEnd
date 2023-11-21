import React, { useContext, useEffect, useState } from 'react'
import '../Styles/GameCard.css'

import '../Styles/DashboardTournamentCard.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../App'
import { Context } from '../main'

const DashboardTournamentCard = ({ tournamentTime, tournamentName, tournamentDate, imgaddress, prizePool, organiserName, tournamentID, deleteTourna, setDeleteTourna }) => {

    const {
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        setAdminID,
        adminID,
        loader, setLoader
    } = useContext(Context);



    const Navigate = useNavigate();
    const deleteTournament = async () => {
        const { data } = await axios.get(`${server}/tournaments/deletetournament/${tournamentID}`, {

        }, {
            headers: {
                "Content-Type": "application/json",
            }
        }, {
            withCredentials: true,
        })
        console.log("deleted data", data);
        if (data.success) {
            alert(data.message);
            setDeleteTourna(true);
            Navigate('/')
        }
    }

    return (
        <>
            <div className="dashboard-tournament-card">
                <img src={imgaddress} alt="" />
                <h3>{tournamentName}</h3>
                <div className="card-details">
                    <p>₹{prizePool}</p>
                    <p>{tournamentDate}</p>
                    <p>{tournamentTime}</p>
                </div>

                <div className="card-button">
                    <Link to={`/registeredteams/${tournamentID}`}>
                        Teams
                    </Link>
                    <button onClick={deleteTournament}>
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
}

export default DashboardTournamentCard