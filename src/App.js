import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom'
import './stylesheets/app.css'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import NavBar from './components/NavBar'

//CHECK FOR DEPLOYMENT
const baseURL = 'http://localhost:8000'
// const baseURL = 'https://biy-backend-server.herokuapp.com'

export default function App () {
  const [currentUser, setCurrentUser] = useState()
  const [userLayout, setUserLayout] = useState()
  const [userModuleData, setUserModuleData] = useState()

  // For eval error
  const False = false
  const None = null

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

  // const userLayout = [
  //   { i: "1", x: 0, y: 0, w: 2, h: 2, minW: 2, minH: 2 }
  // ];

  const location = useLocation()
  const navigate = useNavigate()

  const getCurrentUser = () => {
    fetch(baseURL + "/user/currentuser", {
      credentials: "include"
    })
    .then(res => {
      if(res.status === 200) {
        return res.json()
      } else {
        return {}
      }
    })
    .then(data => {
      setCurrentUser(data.data)
      return
    })
    .catch((err) => {
      console.log('Error => ', err)
    })
  }

  const getUserModuleData = () => {
      const url = baseURL
      fetch(url + "/module/", {
          credentials: 'include'
      })
      .then(res => {
          if(res.status === 200) {
              return res.json()
          } else {
              return {}
          }
      })
      .then(data => {
          setUserModuleData(data.data)
          return
      })
      .catch((err) => {
          console.log('Error => ', err)
      })
  }

  const getUserLayout = () => {
    fetch(baseURL + "/layout/", {
      credentials: "include"
    })
    .then(res => {
      if(res.status === 200) {
        return res.json()
      } else {
        return
      }
    })
    .then(data => {
      let parsedLayout = eval(data.data.layout_data)
      setUserLayout(parsedLayout)
      return
    })
    .catch((err) => {
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
      getUserLayout()
      getUserModuleData()

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
          {
            currentUser && userLayout && userModuleData ? (
              <>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard baseURL={baseURL} currentUser={currentUser} userModuleData={userModuleData} logout={logout} userLayout={userLayout} />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home currentUser={currentUser} />} />
                <Route path="/login" element={<Login baseURL={baseURL} getCurrentUser={getCurrentUser} getUserLayout={getUserLayout} getUserModuleData={getUserModuleData}/>} />
                <Route path="/signup" element={<Signup baseURL={baseURL} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )
          }
        </Routes>
      </div>
    </>
  )
}