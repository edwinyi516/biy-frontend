import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import './stylesheets/app.css'
import PrivateRoutes from './utils/PrivateRoutes'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import NavBar from './components/NavBar'

// const baseURL = 'http://localhost:8000'
const baseURL = 'https://biy-backend-server.herokuapp.com'

export default function App () {
  const [currentUser, setCurrentUser] = useState()
  const [isLoading, setIsLoading] = useState(true)

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
  const navigate = useNavigate()

  const getCurrentUser = () => {
    fetch(baseURL + "/user/currentuser",{
      credentials: "include"
    })
    .then(res => {
      if(res.status === 200) {
        return res.json()
      } else {
        return {}
      }
    }).then(data => {
      setCurrentUser(data.data)
      setIsLoading(false)
      return
    }).catch((err) => {
      console.log('Error => ', err)
    })
  }

  const logout = () => {
    fetch(baseURL + "/user/logout", {
      credentials: "include"
    })
    sessionStorage.removeItem("currentUser")
    setCurrentUser("")
    navigate("/")
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

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
        {
          location.pathname === "/dashboard" ? (
            null
          ) : (
            <NavBar currentUser={currentUser} logout={logout} />
          )
        }
        <Routes>
          <Route element={<PrivateRoutes currentUser={currentUser} />}>
            <Route path="/dashboard" element={<Dashboard currentUser={currentUser} />} />
          </Route>
          {/* <Route path="/dashboard" element={<Dashboard currentUser={currentUser} />} /> */}
          <Route path="/" element={<Home currentUser={currentUser} />} />
          <Route path="/login" element={<Login baseURL={baseURL} isLoading={isLoading} getCurrentUser={getCurrentUser} />} />
          <Route path="/signup" element={<Signup baseURL={baseURL} />} />
        </Routes>
      </div>
    </>
  )
}