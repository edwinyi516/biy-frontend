import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../stylesheets/navbar.css'
import logoshort from '../assets/images/navbar-logo-short-white.png'
import logolong from '../assets/images/navbar-logo-long-white.png'
import logob from '../assets/images/navbar-logo-b.png'

export default function NavBar() {
    return (
        <nav>
            <div className="navbar-logo-container">
                <img className="navbar-logo-b" src={logob} />
                <img className="navbar-logo-long" src={logolong} />
                <a className="navbar-logo-link" href="/"><img className="navbar-logo-short" src={logoshort} /></a>
                <div className="overlay"></div>
            </div>
            <div className="navbar-right-group">
                <a id="navbar-login" href="/login">login.</a>
                <a id="navbar-signup" href="/signup">signup.</a>
            </div>
        </nav>
    )
}