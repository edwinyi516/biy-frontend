import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './stylesheets/app.css'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Signup from './components/Signup'

export default function App () {
  return (
    <>
      <div id="stars"></div>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  )
}