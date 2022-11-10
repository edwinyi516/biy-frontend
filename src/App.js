import React, { useState, useEffect } from 'react'
import { json, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './stylesheets/app.css'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Signup from './components/Signup'

// const baseURL = 'http://localhost:8000'
const baseURL = 'https://biy-backend-server.herokuapp.com'

export default function App () {
  const navigate = useNavigate()

  const signup = async (e) => {
    e.preventDefault()
    console.log(e.target)
    const url = baseURL + '/user/signup'
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
          first_name: e.target.firstname.value,
          last_name: e.target.lastname.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(response)
      if (response.status === 201) {
        console.log("User successfully signed up!")
        navigate("login")
      }
    }
    catch (err) {
      console.log('Error => ', err)
    }
  }

  return (
    <>
      <div id="stars"></div>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup signup={signup}/>} />
        </Routes>
      </div>
    </>
  )
}