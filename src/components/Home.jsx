import '../stylesheets/home.css'
import hometitleimage from '../assets/images/home_title_image.png'

export default function Home() {
    // function randomNumber(min, max) {
    //     return Math.floor(Math.random() * (max - min + 1)) + min
    // }
    
    // const STAR_COUNT = 100
    // let result = ""
    // for(let i = 0; i < STAR_COUNT; i++){
    //     result += `${randomNumber(-50, 50)}vw ${randomNumber(-50, 50)}vh ${randomNumber(0, 1)}px ${randomNumber(0, 2)}px #fff,`
    // }
    // console.log(result.substring(0, result.length - 1))

    return (
        <>
        <div id="stars"></div>
            <div className="home-container">
                <section className="home-section-1">
                    <div className="home-title-block">
                        <span className="home-title-text-gradient">Take back control</span><br />of how <span className="home-title-text-gradient">you</span> budget
                    </div>
                    <img src={hometitleimage} id="home-title-image"></img>
                    <div className="title-sub-text">A platform for deliberate budgeteers</div>
                </section>
                <section className="home-section-2">
                    <div className="biy-overview">
                        <div className="biy-overview-tagline">Financial situations<br />are unique for everyone.<br />Budgeting should be too.</div>
                        <div className="biy-overview-description">If no two financial situations are alike,<br />why does online budgeting all look the same?<br /><span className="biy">biy.</span> allows users to regain control of <i>how</i><br />they choose to manage their personal finances.</div>
                    </div>
                </section>
            </div>
        </>
    )
}