import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import './stylesheets/app.css'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'

// react-grid-layout stylesheets
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'

const baseURL = 'http://localhost:8000'
// const baseURL = 'https://biy-backend-server.herokuapp.com'

export default function App () {

  //****** FUNCTION FOR RANDOM STARS PLACEMENT ******//
  // function randomNumber(min, max) {
  //     return Math.floor(Math.random() * (max - min + 1)) + min
  // }
  
  // const numberOfStars = 100
  // let result = ""
  // for(let i = 0; i < numberOfStars; i++){
  //     result += `${randomNumber(-50, 50)}vw ${randomNumber(-50, 50)}vh ${randomNumber(0, 1)}px ${randomNumber(0, 2)}px #fff,`
  // }
  // console.log(result.substring(0, result.length - 1))

  const location = useLocation()

  return (
    <>
      {
        location.pathname === "/dashboard" ? (
          null
        ) : (
          <div id="stars"></div>
        )
      }
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login baseURL={baseURL} />} />
          <Route path="/signup" element={<Signup baseURL={baseURL} />} />
          <Route path="/dashboard" element={<Dashboard baseURL={baseURL}/>} />
        </Routes>
      </div>
    </>
  )
}