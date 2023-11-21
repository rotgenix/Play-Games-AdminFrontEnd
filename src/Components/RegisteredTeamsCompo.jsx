import React from 'react'

const RegisteredTeamsCompo = ({
    noOfPlayers,
    teamName,
    sNo, }
) => {
    return (
        <>
            <div className='reg-compo'>
                <p>{sNo}</p>
                <p>{teamName}</p>
                <p>{noOfPlayers}</p>
            </div>
        </>
    )
}

export default RegisteredTeamsCompo