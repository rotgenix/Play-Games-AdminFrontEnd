import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { server } from '../App'
import { useParams } from 'react-router-dom'


import '../Styles/RegisteredTeams.css'

import RegisteredTeamsCompo from '../Components/RegisteredTeamsCompo'

const RegisteredTeams = () => {

    const { tournamentID } = useParams();
    // console.log("reg team params", tournamentID);

    const [registeredTeams, setRegisteredTeams] = useState([]);

    useEffect(() => {
        const registeredTeams = async () => {
            const { data } = await axios.get(`${server}/tournaments/registeredteams/${tournamentID}`);
            console.log("erg teams", data.tournamentRegisteredTeams);
            setRegisteredTeams(data.tournamentRegisteredTeams);
        }
        registeredTeams();

    }, [])

    return (
        <>
            <div className="registered-teams">
                <div className="registered-teams-container">
                    <h3>Your Registered Tournaments</h3>
                    {
                        registeredTeams.map((value, index) => {
                            console.log("value", value);
                            console.log("value", value.teamName);
                            console.log("value", value.noOfPlayers);

                            return (<RegisteredTeamsCompo
                                teamName={value.teamName}
                                noOfPlayers={value.noOfPlayers}
                                sNo={index + 1}
                                key={index} />)
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default RegisteredTeams