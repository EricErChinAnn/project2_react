import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
// import axios from 'axios'
import "./LandingPage.css"

export default class Main extends React.Component {
    state = {
        data: [],
    }

    imgOnLanding = ()=>{
         const numOfPic = Math.floor(Math.random() * 3)+1;
         const img ="/landingPage/" + numOfPic +".jpg";

         return(
            <img src={img} alt="Welcome" id='imgOnLanding'></img>
         )
    }

    render() {
        return (
            <React.Fragment>
                <div className="p-4 m-1"></div>
                <div className='imgLandingContainer'>
                    {this.imgOnLanding()}
                    <div className='centeredLandingImg fontCinB' style={{fontSize:"30px"}}>
                        Welcome to<br/>Fantasy Gourmets
                        <div className='m-4'></div>
                        <button type="button" id="landingToRecipesBtn" className="btn btn-primary fontLust"
                        onClick={()=>{this.props.switchPage("search")}}
                        >View All Recipe</button>
                    </div>
                    
                </div>
            </React.Fragment>
        )
    }
}