import React from 'react'
import { useLocation } from 'react-router-dom'
import '../stylesheets/navbar.css'
import logoshort from '../assets/images/navbar-logo-short-white.png'
import logolong from '../assets/images/navbar-logo-long-white.png'
import logob from '../assets/images/navbar-logo-b.png'

export default function NavBar(props) {

    let location = useLocation()

    return (
        <nav>
            <div className="navbar-logo-container">
            {
                location.pathname === "/" ? (
                    <>
                        <img className="navbar-logo-b" src={logob} alt="Logo b" />
                        <img className="navbar-logo-long" src={logolong} alt="Budget it yourself" />
                        <a className="navbar-logo-link" href="/"><img className="navbar-logo-short" src={logoshort} alt="Logo" /></a>
                    </>
                ) : (
                    <>
                        <a className="navbar-logo-link-static" href="/"><img className="navbar-logo-short-static" src={logoshort} alt="Logo" /></a>
                    </>
                )
            }
            </div>
            <div className="navbar-right-group">
                {
                    props.currentUser ? (
                        <a id="navbar-logout" onClick={props.logout}>logout.</a>
                    ) : (
                        <>
                            <a id="navbar-login" href="/login">login.</a>
                            <a id="navbar-signup" href="/signup">signup.</a>
                        </>
                    )
                }
            </div>
        </nav>
    )
}