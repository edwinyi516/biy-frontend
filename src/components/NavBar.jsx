import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../stylesheets/navbar.css'
import logoshort from '../images/navbar-logo-short.png'
import logolong from '../images/navbar-logo-long.png'

export default function NavBar() {
    return (
        <nav>
            <div class="navbar-logo-container">
                <img class="navbar-logo-long" src={logolong} />
                <a class="navbar-logo-link" href="/"><img class="navbar-logo-short" src={logoshort} /></a>
                <div class="overlay"></div>
            </div>
            <div class="navbar-right-group">
                <div id="navbar-login">login.</div>
                <div id="navbar-signup">signup.</div>
            </div>
        </nav>
    )
}