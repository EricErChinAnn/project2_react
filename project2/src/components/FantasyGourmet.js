import React from 'react'
import axios from "axios"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./FantasyGourmet.css"

import LandingPage from "./landingPage/LandingPage";
import SearchRecipe from './searchRecipe/SearchRecipe';
import Login from "./account/Login";
import PostRecipe from "./postRecipe/PostRecipe"

export default class Main extends React.Component {
  state = {
    page: "home",

    //Login Acc
    loggedIn: false,
    loginKey: "",
    loginEmail: "",
    loginPassword: "",

    //Create Acc
    createdAcc: false,
    nameNewAcc: "",
    emailNewAcc: "",
    passwordNewAcc: "",
    dobNewAcc: "",
    profilePicNewAcc: "",
  }

  BASE_API_URL = "http://localhost:3000/"

  renderPage = () => {
    if (this.state.page === "home") { return <LandingPage page={this.state.page} switchPage={this.switchPage} /> }
    else if (this.state.page === "search") {
      return <SearchRecipe
        loginEmail={this.state.loginEmail}
        loginKey={this.state.loginKey}
        switchPage={this.switchPage}
      />
    }
    else if (this.state.page === "post") {
      return <PostRecipe
        switchPage={this.switchPage}
        loginEmail={this.state.loginEmail}
        loginPassword={this.state.loginPassword}
        loginKey={this.state.loginKey}
      />
    }
  }

  backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  updateForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  switchPage = (newPage) => {
    this.setState({ page: newPage })
  }

  login = async () => {
    if (this.state.loginEmail && this.state.loginPassword) {
      document.querySelector("#loginModalToggle").dataBsDismiss="modal"
      document.querySelector("#loginValidate").style.display="none"

      const login = await axios.post(this.BASE_API_URL + "login", {
        loginEmail: this.state.loginEmail,
        loginPassword: this.state.loginPassword
      })
      
      this.setState({
        loginKey: login.data,
        page: "home"
      })
      setTimeout(
        () => {
          if (this.state.loginKey.accessToken) {
            return (
              this.setState({
                loggedIn: true,
                createdAcc: false,
                nameNewAcc: "",
                emailNewAcc: "",
                passwordNewAcc: "",
                dobNewAcc: ""
              })
            )
          }
        }
        , 1)
      // if (this.state.loginKey.accessToken){
      //   return(
      //     this.setState({
      //       loggedIn: true
      //     })
      //   )
      // }
    } else {
      document.querySelector("#loginValidate").style.display="block"
    }
  }

  loginCheck = () => {
    if (this.state.loginKey === "Authentication Error") {
      return (
        <div className='fontLust '>
          <p style={{ color: "red", fontSize: "15px" }}>*Please Enter the correct Email and Password</p>
        </div>
      )
    }
  }

  resetLogin = async () => {
    this.setState({
      loginEmail: "",
      loginPassword: ""
    })
  }

  resetCreateAccount = async () => {
    this.setState({
      nameNewAcc: "",
      emailNewAcc: "",
      passwordNewAcc: "",
      dobNewAcc: "",
      profilePicNewAcc: ""
    })
  }

  createNewAcc = async () => {
    if (this.state.nameNewAcc &&
      this.state.emailNewAcc &&
      this.state.dobNewAcc &&
      this.state.passwordNewAcc) {

      await axios.post(this.BASE_API_URL + "addUser", {
        nameNewAcc: this.state.nameNewAcc,
        emailNewAcc: this.state.emailNewAcc,
        dobNewAcc: this.state.dobNewAcc,
        passwordNewAcc: this.state.passwordNewAcc,
        profilePicNewAcc: this.state.profilePicNewAcc
      }
      )
      return (this.setState({
        createdAcc: true,
        loginEmail: this.state.emailNewAcc,
        loginPassword: this.state.passwordNewAcc,
        loginName: this.state.nameNewAcc
      }))
    } else {
      if(!this.state.nameNewAcc)
      {document.querySelector("#nameValidateCreate").style.display="block";}
      else
      {document.querySelector("#nameValidateCreate").style.display="none";}

      if(!this.state.emailNewAcc)
      {document.querySelector("#emailValidateCreate").style.display="block";}
      else
      {document.querySelector("#emailValidateCreate").style.display="none";}

      if(!this.state.dobNewAcc)
      {document.querySelector("#dobValidateCreate").style.display="block";}
      else
      {document.querySelector("#dobValidateCreate").style.display="none";}
      
      if(!this.state.passwordNewAcc || this.state.passwordNewAcc.length<8)
      {document.querySelector("#passwordValidateCreate").style.display="block";}
      else
      {document.querySelector("#passwordValidateCreate").style.display="none";}

    }
  }

  logout = () => {
    this.setState({
      page: "home",

      //Login Acc
      loggedIn: false,
      loginKey: "",
      loginEmail: "",
      loginPassword: "",

      //Create Acc
      createdAcc: false,
      nameNewAcc: "",
      emailNewAcc: "",
      passwordNewAcc: "",
      dobNewAcc: "",
      profilePicNewAcc: "",
    })
  }

  displayLoggedIn = () => {
    if (this.state.loggedIn) {
      return (
        <React.Fragment>
          <li className="nav-item dropdown">
            <div className='drawALine my-2'></div>
          </li>
          <li className="nav-item dropdown mt-2">
            <a className="nav-link" href="/#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar"
            onClick={() => { this.switchPage("post") }}>Post New Recipe</a>
          </li>
        </React.Fragment>
      )
    } else { 
      return (
        <React.Fragment>
          <li className="nav-item dropdown">
            <div className='drawALine my-2'></div>
          </li>
          <li className="nav-item dropdown mt-2">
            <span className="isDisabled" href="/#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar"
            >Post New Recipe <span>( Login Required )</span></span>
          </li>
        </React.Fragment>
      ) 
    }
  }

  loggedInOrNot = ()=>{
    if(this.state.loggedIn){
      return (<i class="bi bi-person-check"></i>)
    } else {
      return (<i className="bi bi-person"></i>)
    }
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand fontCinB" href="/#" style={{ fontSize: "23px" }} onClick={() => { this.switchPage("home") }}>Fantasy Gourmet</a>
            <div className='justify-content-end d-flex flex-row align-items-center'>
              <div className='me-2 mt-2'>
                <a className="navbar-brand fontCinB accountBtn" href="/#" style={{ fontSize: "23px" }}
                  data-bs-toggle="modal" data-bs-target="#exampleModal" >
                    
                    



                    {this.loggedInOrNot()}
                    
                    </a>
              </div>
              <div>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
            </div>

            <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title fontCinB" style={{ fontSize: "24px" }} id="offcanvasDarkNavbarLabel">Fantasy Gourmet</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 fontLust">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" href="/#" onClick={() => { this.switchPage("home") }}>Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" onClick={() => { this.switchPage("search") }}>Recipes</a>
                  </li>
                  {this.displayLoggedIn()}
                </ul>
              </div>
            </div>
          </div>
        </nav>


        <button type="button" id='bttBtn' onClick={this.backToTop}
          className="btn btn-secondary p-1 px-2 rounded-circle"><i className="bi bi-chevron-up p-0 m-0"></i></button>


        <Login
          loggedIn={this.state.loggedIn}
          loginDisplay={this.state.loginDisplay}
          loginKey={this.state.loginKey}
          loginEmail={this.state.loginEmail}
          loginPassword={this.state.loginPassword}
          updateForm={this.updateForm}
          login={this.login}
          resetLogin={this.resetLogin}
          loginCheck={this.loginCheck}

          nameNewAcc={this.state.nameNewAcc}
          validateNameNewAcc={this.validateNameNewAcc}
          emailNewAcc={this.state.emailNewAcc}
          passwordNewAcc={this.state.passwordNewAcc}
          dobNewAcc={this.state.dobNewAcc}
          profilePicNewAcc={this.state.profilePicNewAcc}
          createNewAcc={this.createNewAcc}
          resetCreateAccount={this.resetCreateAccount}
          createdAcc={this.state.createdAcc}

          logout={this.logout}
        />

        {this.renderPage()}

      </React.Fragment>
    )
  }
}