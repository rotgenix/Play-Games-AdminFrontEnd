import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboardhome from './Pages/Dashboardhome'
import Dashboard from './Pages/Dashboard'
import CreateTournament from './Pages/CreateTournament'
import OrganiserRegister from './Pages/OrganiserRegsiter'
import OrganiserLogin from './Pages/OrganiserLogin'

import RegisteredTeams from './Pages/RegisteredTeams'

export const server = 'https://playgames-fz1x.onrender.com';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Dashboardhome />} />
          <Route path='/dashboard/:adminID' element={<Dashboard />} />
          <Route path='/join' element={<OrganiserRegister />} />
          <Route path='/login' element={<OrganiserLogin />} />
          <Route path='/createtournament/:adminID' element={<CreateTournament />} />
          <Route path='/registeredteams/:tournamentID' element={<RegisteredTeams />} />
        </Routes>
      </Router>
    </>
  )
}

export default App