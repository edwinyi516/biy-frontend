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
        <div className="home-container">
            <div id="stars"></div>
            <div className="home-title-block">
                <span className="home-title-text-gradient">Take back control</span><br />of how <span className="home-title-text-gradient">you</span> budget
            </div>
            <img src={hometitleimage} id="home-title-image"></img>
        </div>
    )
}