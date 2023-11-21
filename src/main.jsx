import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { createContext } from 'react';

export const Context = createContext();


const AppWrapper = () => {

  //Global Variables
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminID, setAdminID] = useState('');
  const [loader, setLoader] = useState(false);

  return (
    <Context.Provider value={{
      isAdminLoggedIn,
      setIsAdminLoggedIn,
      adminID, setAdminID,
      loader, setLoader
    }}>
      <App />
    </Context.Provider>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <AppWrapper />
)
