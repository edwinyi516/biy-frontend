import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../stylesheets/signup.css'
import NavBar from './NavBar'
import logoshort from '../assets/images/navbar-logo-short-white.png'

export default function Signup(props) {

    const initialValues = { firstname: "", lastname: "", email: "", password: "", passwordcheck: "" }
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
        setFormErrors(validate(formValues))
    }

    const validate = (values) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
        if (!regex.test(values.email)) {
            errors.email = "*Invalid email address"
            setSubmitted(false)
        }
        if (values.password !== values.passwordcheck) {
            errors.passwordcheck = "*Passwords do not match"
            setSubmitted(false)
        }
        return errors
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && submitted) {
            console.log(formValues)
            setSubmitted(true)
            const url = props.baseURL + '/user/signup'
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: formValues.email,
                    password: formValues.password,
                    first_name: formValues.firstname,
                    last_name: formValues.lastname
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.status === 401) {
                    formErrors.email = "*User already exists!"
                    setSubmitted(false)
                    return
                }
                else if (response.status === 201) {
                navigate("/login")
                }
            })
            .catch((err) => {
                console.log('Error => ', err)
            })
        }
    }, [formErrors])
    
    return (
        <>
            <div className="signup-container" onSubmit={handleSubmit}>
                <div className="signup-block">
                    <div className="signup-logo">
                        <img id="signup-logo-img" src={logoshort} alt="Logo"></img>
                    </div>
                    <div className="signup-header">
                        <div className="create-an-account-text">Create an account</div>
                    </div>
                    <form className="signup-form">
                        <div className="signup-form-name">
                            <div className="form-item">
                                <span className="form-icon material-symbols-rounded">person</span>
                                <input type="text" id="firstname" name="firstname" placeholder="first name" onChange={handleChange} value={formValues.firstname} required autoFocus></input>
                            </div>
                            <div className="form-item">
                                <span className="form-icon material-symbols-rounded">group</span>
                                <input type="text" id="lastname" name="lastname" placeholder="last name" onChange={handleChange} value={formValues.lastname} required></input>
                            </div>
                        </div>
                        <div className="form-item">
                            <span className="form-icon material-symbols-rounded">mail</span>
                            <input type="text" id="email" name="email" placeholder="email" onChange={handleChange} value={formValues.email} required></input>
                            {
                                formValues.email !== "" ? (
                                    <div className="signup-error">{formErrors.email}</div>
                                ) : (
                                    <></>
                                )
                            }
                        </div>
                        <div className="form-item">
                            <span className="form-icon material-symbols-rounded">lock</span>
                            <input type="password" id="password" name="password" placeholder="password" onChange={handleChange} value={formValues.password} required></input>
                        </div>
                        <div className="form-item">
                            <span className="form-icon material-symbols-rounded">lock_reset</span>
                            <input type="password" name="passwordcheck" placeholder="confirm password" onChange={handleChange} value={formValues.passwordcheck} required></input>
                            {
                                formValues.passwordcheck !== "" ? (
                                    <div className="signup-error">{formErrors.passwordcheck}</div>
                                ) : (
                                    <></>
                                )
                            }
                        </div>
                        <button type="submit" disabled={!formValues.firstname || !formValues.lastname || !formValues.email || !formValues.password || !formValues.passwordcheck || submitted}>Sign Up</button>
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