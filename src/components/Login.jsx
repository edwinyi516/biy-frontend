import React, { useState } from 'react'
import '../stylesheets/login.css'
import NavBar from './NavBar'
import logoshort from '../assets/images/navbar-logo-short-white.png'

export default function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <>
            <NavBar />
            <div className="login-container" onSubmit={props.login}>
                <div className="login-block">
                    <div className="login-logo">
                        <img id="login-logo-img" src={logoshort}></img>
                    </div>
                    <div className="login-header">
                        <div className="login-text">Login</div>
                    </div>
                    <form className="login-form">
                        <div className="form-item">
                            <span className="form-icon material-symbols-rounded">mail</span>
                            <input type="text" id="email" placeholder="email" onChange={handleEmailChange} value={email} required></input>
                        </div>
                        <div className="form-item">
                            <span className="form-icon material-symbols-rounded">lock</span>
                            <input type="password" id="password" placeholder="password" onChange={handlePasswordChange} value={password} required></input>
                        </div>
                        <button type="submit" disabled={!email || !password}>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}