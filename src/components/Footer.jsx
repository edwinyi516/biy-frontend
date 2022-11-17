import '../stylesheets/footer.css'
import logoshort from '../assets/images/navbar-logo-short-white.png'

export default function Footer() {
    return (
        <>
            <div className="footer-block">
                <div className="footer-left">
                    <div className="about-biy">
                        <div className="footer-about-text">About</div>
                        <img className="footer-logo" src={logoshort}></img>
                    </div>
                    <div class="footer-details"><span className="biy">biy.</span> was created as a solution to allow its users to<br/>individually tailor how they manage their finances.</div>
                </div>
                <div className="footer-right">
                    <div className="copyright">Copyright © 2022 Edwin Yi.&nbsp;&nbsp;All rights reserved.</div>
                </div>
            </div>
        </>
    )
}