import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import LandingPage from "./landingPage/LandingPage";
import SingleRecipe from "./singleRecipe/SingleRecipe";
import SearchRecipe from './searchRecipe/SearchRecipe';

export default class Main extends React.Component {
  state = {
    page: "home"
  }

  renderPage = () => {
    if (this.state.page === "home") { return <LandingPage page={this.state.page} /> }
    else if (this.state.page === "search") { return <SearchRecipe /> }
    else if (this.state.page === "singleRecipe") { return <SingleRecipe /> }
  }


  switchPage = (newPage) => {
    this.setState({ page: newPage })
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand fontCinB" href="/#" style={{ fontSize: "23px" }} onClick={() => { this.switchPage("home") }}>Fantasy Gourmet</a>
            <div>
              <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>

            <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title fontCinB" style={{fontSize:"24px"}} id="offcanvasDarkNavbarLabel">Fantasy Gourmet</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 fontLust">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" href="/#" onClick={() => { this.switchPage("home") }}>Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" onClick={() => { this.switchPage("search") }}>Recipes</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link" href="/#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" onClick={() => { this.switchPage("singleRecipe") }}>Single Recipe</a>
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