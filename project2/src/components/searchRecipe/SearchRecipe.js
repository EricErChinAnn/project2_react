import React from 'react'
import './SearchRecipe.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import axios from 'axios'
import EachRecipe from "./child/EachRecipe"
import SingleRecipe from "../singleRecipe/SingleRecipe"

export default class SearchRecipe extends React.Component {
    
    state = {
        data: [],
        viewSingleRecipe: false,
        singleRecipeId: ""
    }

    BASE_API_URL = "http://localhost:3000/"

    async componentDidMount() {
        const response = await axios.get(this.BASE_API_URL + "recipe");
        this.setState({
            data: response.data
        })
    }

    backToRecipe = ()=>{
        this.setState({
            viewSingleRecipe:(!this.state.viewSingleRecipe)
        })
    }

    render() {
        if (this.state.viewSingleRecipe) {
            return <SingleRecipe
                viewSingleRecipe={this.state.viewSingleRecipe}
                data={this.state.data}
                singleRecipeId={this.state.singleRecipeId}
                backToRecipe={this.backToRecipe}
            />
        }
        else {
            return (
                <React.Fragment>
                    <div className="p-4 m-3"></div>
                    <h1 className='text-center fontCinB'>Recipes</h1>
                    <div className='cardDisplay' >
                        {
                            this.state.data.map((each) => {
                                return (
                                    <div className="bigHover card mt-3 mx-2 cardDark"
                                        style={{ textShadow: "2px 2px #00000" }} key={each._id}
                                        onClick={() => {
                                            this.setState({
                                                viewSingleRecipe: true,
                                                singleRecipeId:each._id
                                            })
                                        }}
                                    >
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
}