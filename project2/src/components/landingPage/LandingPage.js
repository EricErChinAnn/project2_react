import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import axios from 'axios'
import "./LandingPage.css"

export default class Main extends React.Component {
    state = {
        data: [],
    }

    BASE_API_URL = "http://localhost:3000/"

    async componentDidMount() {
        const response = await axios.get(this.BASE_API_URL + "random");
        this.setState({
            data: response.data,
        })
    }

    render() {
        console.log("hello")
        console.log(this.state.data)
        return (
            <React.Fragment>
                <div className="p-4 m-1"></div>
                <div className='imgContainer'>
                    <img className="imgOnLanding" src={this.state.data.picture} alt="Food Display"/>
                </div>
            </React.Fragment>
        )
    }
}