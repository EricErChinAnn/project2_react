import React from 'react'
import './SearchRecipe.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import axios from 'axios'
import EachRecipe from "./child/EachRecipe"
import SingleRecipe from "../singleRecipe/SingleRecipe"
import SearchPopup from "./SearchPopup"
import EditSingleRecipe from "../singleRecipe/child/EditSingleRecipe"

export default class SearchRecipe extends React.Component {
    state = {
        data: [],
        showGameData: [],
        viewSingleRecipe: false,
        singleRecipeId: "",

        editSingleRecipe: false,
        editMatchUserId: "",

        //Search Stuff Via
        name: "",
        category: "",
        showGameId: "",
        reqIngredients: [],
        estCostMin: 1.00,
        estCostMax: 100.00
    }

    BASE_API_URL = "http://localhost:3000/"

    async componentDidMount() {
        const response = await axios.get(this.BASE_API_URL + "recipe");
        const showGameData = await axios.get(this.BASE_API_URL + "showGame");
        const userData = await axios.get(this.BASE_API_URL + "userPass", { params: { "email": this.props.loginEmail } })

        this.setState({
            data: response.data,
            showGameData: showGameData.data,
        })

        if (userData.data.length === 1) {
            this.setState({
                editMatchUserId: userData.data[0]._id,
            })
        }
    }

    backToRecipe = () => {
        this.setState({
            viewSingleRecipe: false,
            editSingleRecipe: false
        })
    }

    goToEditRecipe = () => {
        this.setState({
            viewSingleRecipe: false,
            editSingleRecipe: true
        })
    }

    backToSingleRecipe = () => {
        this.setState({
            viewSingleRecipe: true,
            editSingleRecipe: false
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
                reqIngredients: [],
                estCostMin: 1,
                estCostMax: 100
            }
        })
        this.setState({
            name: "",
            category: "",
            showGameId: "",
            reqIngredients: [],
            estCostMin: 1,
            estCostMax: 100,
            data: replacement.data
        })
        document.querySelector("#searchReqIngValidate").style.display = "none"
    }

    callAPIWithSearch = async () => {
        if (!((this.state.reqIngredients.filter((e) => { return (e === "") })).length > 0)) {
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
            document.querySelector("#searchReqIngValidate").style.display = "none"
        } else {
            document.querySelector("#searchReqIngValidate").style.display = "block"
        }
    }

    validateMinMax(x, y) {
        if (parseFloat(x) > parseFloat(y)) {
            return <p style={{ color: "red" }}>*Please enter proper Min & Max amount</p>
        }
        else {
            return null
        }
    }

    validateText(text) {
        if (text.includes(",")) {
            return <p style={{ color: "red" }}>*Please enter only ONE Ingredient</p>
        } else {
            return null
        }
    }

    updateFormArraySearchIngAdd = (e) => {
        const modify = [
            ...this.state.reqIngredients.slice(),
            ""
        ]

        this.setState({
            reqIngredients: modify
        })
    }

    updateFormArraySearchIng = (e) => {
        let index = e.target.ariaLabel
        const modify = [
            ...this.state.reqIngredients.slice(0, index),
            e.target.value,
            ...this.state.reqIngredients.slice(index + 1)
        ]

        this.setState({
            reqIngredients: modify
        })
    }


    render() {
        if (this.state.editSingleRecipe) {
            return <EditSingleRecipe
                editSingleRecipe={this.state.editSingleRecipe}
                viewSingleRecipe={this.state.viewSingleRecipe}
                
                singleRecipeId={this.state.singleRecipeId}

                editMatchUserId={this.state.editMatchUserId}
                loginEmail={this.props.loginEmail}
                loginKey={this.props.loginKey}
                
                data={this.state.data}
                backToSingleRecipe={this.backToSingleRecipe}
                goToEditRecipe={this.goToEditRecipe}
            />
        }
        else {
            if (this.state.viewSingleRecipe) {
                return <SingleRecipe
                    editSingleRecipe={this.state.editSingleRecipe}
                    viewSingleRecipe={this.state.viewSingleRecipe}
                    data={this.state.data}
                    singleRecipeId={this.state.singleRecipeId}
                    backToRecipe={this.backToRecipe}
                    backToSingleRecipe={this.backToSingleRecipe}
                    editMatchUserId={this.state.editMatchUserId}
                    loginEmail={this.props.loginEmail}
                    loginKey={this.props.loginKey}
                    goToEditRecipe={this.goToEditRecipe}
                />
            } else {
                if (this.state.data.length > 0) {
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
                                    validateText={this.validateText}
                                    updateFormArraySearchIng={this.updateFormArraySearchIng}
                                    updateFormArraySearchIngAdd={this.updateFormArraySearchIngAdd}
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
                } else {
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
                                    validateText={this.validateText}
                                />
                            </div>

                            <div className='d-flex justify-content-center mt-3 fontCinB'>
                                <p>No Recipe Found</p>
                            </div>
                        </React.Fragment>
                    )
                }
            }
        }
    }
}