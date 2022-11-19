import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../stylesheets/login.css'
import logoshort from '../assets/images/navbar-logo-short-white.png'

export default function Login(props) {
    const initialValues = { email: "", password: "", remember: false }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        setFormErrors(() => {
            const errors = {}
            return errors
        })
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && submitted) {
            setSubmitted(true)
            const url = props.baseURL + '/user/login'
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: formValues.email,
                    password: formValues.password,
                    remember: formValues.remember
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            .then((response) => {
                if (response.status === 401) {
                    formErrors.loginError = "*Email or password is incorrect!"
                    setSubmitted(false)
                    return
                }
                if (response.status === 200) {
                    navigate("/dashboard")
                }
            })
            .catch((err) => {
                console.log('Error => ', err)
            })
        }
    }, [formErrors, formValues, navigate, props.baseURL, submitted])

    return (
        <>
            <div className="login-container" onSubmit={handleSubmit}>
                <div className="login-block">
                    <div className="login-logo">
                        <img id="login-logo-img" src={logoshort} alt="Logo"></img>
                    </div>
                    <div className="login-header">
                        <div className="login-text">Login</div>
                    </div>
                    <form className="login-form">
                        <div className="form-item">
                            <span className="form-icon material-symbols-rounded">mail</span>
                            <input type="text" id="email" name="email" placeholder="email" onChange={handleChange} value={formValues.email} required autoFocus></input>
                        </div>
                        <div className="form-item">
                            <span className="form-icon material-symbols-rounded">lock</span>
                            <input type="password" id="password" name="password" placeholder="password" onChange={handleChange} value={formValues.password} required></input>
                            {
                                formErrors.loginError ? (
                                    <div className="login-error">{formErrors.loginError}</div>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        <div className="login-remember-me">
                            <input type="checkbox" id="remember" name="remember" onChange={handleChange} value="True"></input>
                            <label htmlFor="remember" id="remember-me-label">Remember me</label>
                        </div>
                        <button type="submit" disabled={!formValues.email || !formValues.password ||submitted}>Login</button>
                        <div className="no-account-yet-block">
                            <div className="no-account-text">Don't have an account yet?</div>
                            <a className="login-form-to-signup-link" href="/signup">Sign Up</a>
                        </div>
                        <div className="forgot-password-block">
                            <a className="forgot-password-link" href="*">Forgot your password?</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}