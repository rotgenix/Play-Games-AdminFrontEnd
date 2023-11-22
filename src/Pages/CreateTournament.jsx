import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../App';
import { Context } from '../main';
import '../Styles/CreateTournament.css'

const CreateTournament = () => {

    const Navigate = useNavigate();

    const params = useParams();
    // console.log("params", params);

    const {
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        setAdminID,
        adminID,
        loader, setLoader
    } = useContext(Context);

    const [tournamentName, setTournamentName] = useState('');
    const [prizePool, setPrizePool] = useState(0);
    const [tournamentDate, setTournamentDate] = useState(new Date());
    const [tournamentTime, setTournamentTime] = useState('');
    const [gameName, setGameName] = useState('');

    const postTournamentHandler = async (e) => {
        e.preventDefault();

        // console.log('sending ', tournamentName, prizePool, tournamentDate, tournamentTime, gameName);

        const { data } = await axios.post(`${server}/tournament/createTournament/${adminID}`, {
            tournamentName,
            prizePool,
            tournamentDate,
            tournamentTime,
            gameName

        }, {
            headers: {
                "Content-Type": "application/json",
            }
        }, {
            withCredentials: true,
        });
        // console.log("create tournament: ", data);

        if (data.success) {
            alert(data.message);
            Navigate(`/dashboard/${adminID}`);
        }
        else {
            alert(data.message);
        }
    }
    return (
        <>
            <div className="create-tournament">
                <div className="create-tournament-container">
                    <div className="form-container">
                        <form onSubmit={postTournamentHandler}>
                            <input type="text" name='tournamentName'
                                placeholder="Tournament Name"
                                onChange={(e) => {
                                    setTournamentName(e.target.value)
                                }}
                                required
                            />

                            <input type="number" name='prizePool'
                                placeholder="Prize Pool (in ₹)"
                                onChange={(e) => {
                                    setPrizePool(e.target.value)
                                }}
                                required
                            />

                            <input type="date" name='tournamentDate'
                                placeholder="Tournament Date"
                                onChange={(e) => {
                                    setTournamentDate(e.target.value)
                                    // console.log(tournamentDate)
                                }}
                                required
                            />

                            <input type="time" name='tournamentTime'
                                placeholder="Tournament Timing: "
                                onChange={(e) => {
                                    setTournamentTime(e.target.value)
                                }}
                                required
                            />

                            <select name="gameName" id="gameName"
                                onChange={(e) => {
                                    // console.log(e.target.value);
                                    setGameName(e.target.value);
                                    // console.log("on change", gameName)
                                }}

                                required
                            >
                                <option value="">Select Game</option>
                                <option value="bgmi">BGMI</option>
                                <option value="codm">CODM</option>
                                <option value="csgo2">CSGO2</option>
                                <option value="dota2">Dota 2</option>
                                <option value="leagueOfLegends">League of Legends</option>
                                <option value="valorant">Valorant</option>
                            </select>

                            <button type='submit' className="submit-btn">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateTournament