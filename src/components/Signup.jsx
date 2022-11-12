import React, { useState } from 'react'
import '../stylesheets/signup.css'
import NavBar from './NavBar'
import logoshort from '../assets/images/navbar-logo-short-white.png'

export default function Signup(props) {
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordcheck, setPasswordCheck] = useState("")

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handlePasswordCheckChange = (e) => {
        setPasswordCheck(e.target.value)
    }
    
    return (
        <>
            <NavBar />
            <div class="signup-container" onSubmit={props.signup}>
                <div class="signup-block">
                    <div class="signup-logo">
                        <img id="signup-logo-img" src={logoshort}></img>
                    </div>
                    <div class="signup-header">
                        <div class="create-an-account-text">Create an account</div>
                    </div>
                    <form class="signup-form">
                        <div class="signup-form-name">
                            <div class="form-item">
                                <span class="form-icon material-symbols-rounded">person</span>
                                <input autofocus type="text" id="firstname" placeholder="first name" onChange={handleFirstNameChange} value={firstname} required></input>
                            </div>
                            <div class="form-item">
                                <span class="form-icon material-symbols-rounded">group</span>
                                <input type="text" id="lastname" placeholder="last name" onChange={handleLastNameChange} value={lastname} required></input>
                            </div>
                        </div>
                        <div class="form-item">
                            <span class="form-icon material-symbols-rounded">mail</span>
                            <input type="text" id="email" placeholder="email" onChange={handleEmailChange} value={email} required></input>
                        </div>
                        <div class="form-item">
                            <span class="form-icon material-symbols-rounded">lock</span>
                            <input type="password" id="password" placeholder="password" onChange={handlePasswordChange} value={password} required></input>
                        </div>
                        <div class="form-item">
                            <span class="form-icon material-symbols-rounded">lock_reset</span>
                            <input type="password" placeholder="confirm password" onChange={handlePasswordCheckChange} value={passwordcheck} required></input>
                        </div>
                        <button type="submit" disabled={!firstname || !lastname || !email || !password || !passwordcheck}>Sign Up</button>
                        <div className="already-have-an-account-block">
                            <div className="already-have-an-account-text">Already have an account?</div>
                            <a className="signup-form-to-login-link" href="/login">Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}