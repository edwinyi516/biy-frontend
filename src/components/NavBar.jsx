import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../stylesheets/navbar.css'
import logoshort from '../assets/images/navbar-logo-short-white.png'
import logolong from '../assets/images/navbar-logo-long-white.png'

export default function NavBar() {
    return (
        <nav>
            <div class="navbar-logo-container">
                <img class="navbar-logo-long" src={logolong} />
                <a class="navbar-logo-link" href="/"><img class="navbar-logo-short" src={logoshort} /></a>
                <div class="overlay"></div>
            </div>
            <div class="navbar-right-group">
                <a id="navbar-login" href="/login">login.</a>
                <a id="navbar-signup" href="/signup">signup.</a>
            </div>
        </nav>
    )
}