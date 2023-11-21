import React, { useEffect } from 'react'
import '../Styles/DashboardHome.css'

const Dashboardhome = () => {
    useEffect(() => {

    }, [])
    return (
        <>
            <div className="dashboard-home">
                <div className="dashboard-home-container">
                    <div className="bg-image"></div>
                    <div className="dashboard-text">
                        <h3>
                            Welcome To PlayGames
                        </h3>
                        {/* <p>
                            Host All your Tournaments here
                        </p> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboardhome