import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
// import axios from 'axios'
import "./LandingPage.css"

export default class Main extends React.Component {
    state = {
        data: [],
    }

    render() {
        return (
            <React.Fragment>
                <div className="p-4 m-1"></div>
                <div className='imgContainer'>
                    THIS IS THE LANDING PAGE
                </div>
            </React.Fragment>
        )
    }
}