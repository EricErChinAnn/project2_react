import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import axios from 'axios'

export default class Main extends React.Component{
    state ={
        data:[]
    }

    BASE_API_URL = "http://localhost:3000/"

    async componentDidMount() {
        const response = await axios.get(this.BASE_API_URL + "recipe");
        this.setState({
            data: response.data
        })
        // console.log(response.data)
    }

    render(){
        return(
            <React.Fragment>
            <div className="p-4 m-2"></div>
                <p>This is the Landing Page</p>
            </React.Fragment>
        )
    }
}