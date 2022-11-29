import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import LandingPage from "./landingPage/LandingPage";
import SingleRecipe from "./singleRecipe/SingleRecipe";
import SearchRecipe from './searchRecipe/SearchRecipe';

export default class Main extends React.Component{
    state ={
        page:"home"
    }

    renderPage = ()=>{
        if(this.state.page === "home"){ return <LandingPage/>}
        else if (this.state.page === "search"){return <SearchRecipe/>}
        else if (this.state.page === "singleRecipe"){return <SingleRecipe/>}
    }


    switchPage = (newPage)=>{
        this.setState({page:newPage})
    }

    render(){
        return(
            <React.Fragment>
                <nav className="navbar navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand fontCinB" href="/#" onClick={()=>{this.switchPage("home")}}>Fantasy Gourmet</a>
    <div>
    <i className="bi bi-search pe-3" style={{fontSize: "1.3rem", color:"White", cursor: "pointer"}}></i>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    </div>
    
    <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/#" onClick={()=>{this.switchPage("home")}}>Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#" onClick={()=>{this.switchPage("search")}}>View Recipes</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link" href="/#" onClick={()=>{this.switchPage("singleRecipe")}}>Single Recipe</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>

{this.renderPage()}

            </React.Fragment>
        )
    }
}