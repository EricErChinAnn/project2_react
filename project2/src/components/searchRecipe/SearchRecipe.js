import React from 'react'
import './SearchRecipe.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import axios from 'axios'
import EachRecipe from "./child/EachRecipe"
import SingleRecipe from "../singleRecipe/SingleRecipe"
import SearchPopup from "./SearchPopup"

export default class SearchRecipe extends React.Component {

    state = {
        data: [],
        showGameData: [],
        viewSingleRecipe: false,
        singleRecipeId: "",

        //Search Stuff Via
        name: "",
        category: "",
        showGameId: "",
        reqIngredients: "",
        estCostMin: 1.00,
        estCostMax: 100.00
    }

    BASE_API_URL = "http://localhost:3000/"

    async componentDidMount() {
        const response = await axios.get(this.BASE_API_URL + "recipe");
        const showGameData = await axios.get(this.BASE_API_URL + "showGame");
        this.setState({
            data: response.data,
            showGameData: showGameData.data,
        })
    }

    backToRecipe = () => {
        this.setState({
            viewSingleRecipe: (!this.state.viewSingleRecipe)
        })
    }

    updateForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    resetSearch = async () => {
        const replacement = await axios.get(this.BASE_API_URL + "recipe", {
            params: {
                data: this.state.data,
                name: "",
                category: "",
                showGameId: "",
                reqIngredients: "",
                estCostMin: 1,
                estCostMax: 100
            }
        })
        this.setState({
            name: "",
            category: "",
            showGameId: "",
            reqIngredients: "",
            estCostMin: 1,
            estCostMax: 100,
            data: replacement.data
        })
    }

    callAPIWithSearch = async () => {
        const replacement = await axios.get(this.BASE_API_URL + "recipe", {
            params: {
                data: this.state.data,
                name: this.state.name,
                category: this.state.category,
                showGameId: this.state.showGameId,
                reqIngredients: this.state.reqIngredients,
                estCostMin: this.state.estCostMin,
                estCostMax: this.state.estCostMax
            }
        })
        this.setState({
            data: replacement.data
        })
    }


    validateMinMax(x, y) {
        if (parseFloat(x) > parseFloat(y)) {
            return <p style={{ color: "red" }}>*Please enter proper Min & Max amount</p>
        }
        else {
            return null
        }
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
                    <h1 className='text-center fontCinB' style={{ fontSize: "30px" }}>Recipes</h1>
                    <div className='d-flex justify-content-center'>
                        <SearchPopup
                            data={this.state.data}
                            showGameData={this.state.showGameData}
                            name={this.state.name}
                            category={this.state.category}
                            showGameId={this.state.showGameId}
                            reqIngredients={this.state.reqIngredients}
                            estCostMin={this.state.estCostMin}
                            estCostMax={this.state.estCostMax}
                            updateForm={this.updateForm}
                            callAPIWithSearch={this.callAPIWithSearch}
                            resetSearch={this.resetSearch}
                            validateMinMax={this.validateMinMax}
                        />
                    </div>
                    <div className='cardDisplay' >
                        {
                            this.state.data.map((each) => {
                                return (
                                    <div className="bigHover card mt-3 mx-2 cardDark"
                                        style={{ textShadow: "2px 2px #00000" }} key={each._id}
                                        onClick={() => {
                                            this.setState({
                                                viewSingleRecipe: true,
                                                singleRecipeId: each._id
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