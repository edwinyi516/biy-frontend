import '../stylesheets/signup.css'
import logoshort from '../assets/images/navbar-logo-short-white.png'
import emailIcon from '../assets/images/email_icon.png'
import passwordIcon from '../assets/images/password_icon.png'

export default function Signup() {
    return (
        <>
            <div class="signup-container">
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
                                <input autofocus type="text" placeholder="first name" required></input>
                            </div>
                            <div class="form-item">
                                <span class="form-icon material-symbols-rounded">group</span>
                                <input type="text" placeholder="last name" required></input>
                            </div>
                        </div>
                        <div class="form-item">
                            <span class="form-icon material-symbols-rounded">mail</span>
                            <input type="text" placeholder="email" required></input>
                        </div>
                        <div class="form-item">
                            <span class="form-icon material-symbols-rounded">lock</span>
                            <input type="password" placeholder="password" required></input>
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    )
}