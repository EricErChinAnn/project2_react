import React from 'react'
import './SearchRecipe.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import axios from 'axios'
import EachRecipe from "./child/EachRecipe"


export default class SearchRecipe extends React.Component {
    state = {
        data: [],
    }

    BASE_API_URL = "http://localhost:3000/"

    async componentDidMount() {
        const response = await axios.get(this.BASE_API_URL + "recipe");
        this.setState({
            data: response.data
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="p-4 m-3"></div>
                <h1 className='text-center fontCinB'>Recipes</h1>
                <div className='cardDisplay '>
                    {
                        this.state.data.map((each) => {
                            return (
                                <div className="bigHover card mt-3 mx-2 text-center text-bg-dark"
                                    style={{ textShadow: "2px 2px #00000" }} key={each._id}>
                                    <EachRecipe recipe={each} />
                                </div>
                            )
                        })
                    }
                </div>

            </React.Fragment>
        )
    }
}