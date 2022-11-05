import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../stylesheets/navbar.css'
import logo from '../images/biylogo.png'

export default function NavBar() {
    return (
        <nav>
            <img id="navbar-logo" src={logo} />
            <div class="navbar-right-group">
                <div id="navbar-login">login.</div>
                <div id="navbar-signup">signup.</div>
            </div>
        </nav>
    )
}