import React,{useEffect} from "react";
import {Link} from "react-router-dom"
import image from "../images/image4.jpg"
import { Button } from '@mui/material';

function LandingPageButton() {
    const userData = JSON.parse(localStorage.getItem('userDetails'));
    return  <div> {
            userData?.token ?
            <Link to="/home" class="nav-link" style={{"text-decoration":"none"}}>
            <Button variant="contained">Check Blogs</Button>
            </Link>
            :
            <Link to="/sign-up" class="nav-link" style={{"text-decoration":"none"}}>
            <Button variant="contained">Check Blogs</Button>
            </Link>
        }
        </div>
}
function LandingFrameMessage() {
    const style = {
        margin: "auto",
        padding: "10% 55% 45% 15%",
        color: "white"
    }
    return <div style={style}>
        
        <div style={{"font-size": "30px"}}>
            Welcome to Curious Techno!!
        </div>
        
        <div style={{"font-size": "24px"}}>
        Curious Techno present non-technical and technical blogs for you.
        reading a blog and write a blog for everyone. 
        You can see All types of Blogs here. 
        </div>
        <br />
        <LandingPageButton />
    </div>
}
function LandingFrame() {
    const style = {
        "background-image": `url(${image})`,
        "background-repeat": "no-repeat",
        "background-size": "cover",
        position: "absolute",
        height: "100%",
        width: "100%",

    }
    return <div style={style}>
        <LandingFrameMessage />
    </div>
}
function HomePage(props) {
    

    return <div>
        <LandingFrame />
    </div>
}
export default HomePage
