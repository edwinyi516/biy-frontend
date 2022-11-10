import React, { useState, useEffect } from 'react'
import { json, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './stylesheets/app.css'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'

// const baseURL = 'http://localhost:8000'
const baseURL = 'https://biy-backend-server.herokuapp.com'

export default function App () {
  const navigate = useNavigate()

  const login = async (e) => {
    console.log("Logging in user")
    console.log(e.target.email.value)
    e.preventDefault()
    const url = baseURL + '/user/login'
    try {
      const response = await fetch(url,{
        method: 'POST',
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      console.log(response)
      console.log("BODY: ", response.body)
      if (response.status === 200) {
        navigate("/")
      }
    }
    catch (err) {
      console.log('Error => ', err)
    }
  }

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
      if (response.status === 401) {
        alert("User already exists!")
        return
      }
      else if (response.status === 201) {
        navigate("/login")
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
          <Route path="/login" element={<Login login={login}/>} />
          <Route path="/signup" element={<Signup signup={signup}/>} />
        </Routes>
      </div>
    </>
  )
}