import React from 'react'
import './SearchRecipe.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import axios from 'axios'
import EachRecipe from "./child/EachRecipe"
import SingleRecipe from "../singleRecipe/SingleRecipe"
import SearchPopup from "./SearchPopup"
import EditSingleRecipe from "../singleRecipe/child/EditSingleRecipe"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        estCostMax: 100.00,

        //For posting reviews
        reviewPostingUserId: this.props.reviewPostingUserId,
        reviewPostingTitle: "",
        reviewPostingRating: "5",
        reviewPostingMainText: "",

        //for edit reviews
        reviewEditReviewId: "",
        reviewEditTitle: "",
        reviewEditRating: "",
        reviewEditMainText: "",
        reviewEditName: "",
        reviewEditUserId: ""
    }

    BASE_API_URL = "https://ericerchinann-fantasygourmet-3.onrender.com/"

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
                reviewPostingUserId: userData.data[0]._id
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

    postReview = async () => {
        if (
            this.state.reviewPostingUserId &&
            this.state.reviewPostingTitle &&
            this.state.reviewPostingRating &&
            this.state.reviewPostingMainText
        ) {
            document.querySelector("#reviewCommentsValidate").style.display = "none"
            document.querySelector("#reviewTitleValidate").style.display = "none"

            await axios.post(this.BASE_API_URL + `${this.state.singleRecipeId}/addReview`, {
                user_id: this.state.reviewPostingUserId,
                title: this.state.reviewPostingTitle,
                rating: this.state.reviewPostingRating,
                mainText: this.state.reviewPostingMainText
            });

            const notifypostreview = () => toast.success('😄 Thank you for your review', {
                containerId: 'postreviewNotify',
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "dark",
            });

            notifypostreview()

            this.props.switchPage("home")
        } else {
            if (this.state.reviewPostingTitle) { document.querySelector("#reviewTitleValidate").style.display = "none" }
            else { document.querySelector("#reviewTitleValidate").style.display = "block" }

            if (this.state.reviewPostingMainText) { document.querySelector("#reviewCommentsValidate").style.display = "none" }
            else { document.querySelector("#reviewCommentsValidate").style.display = "block" }
        }
    }

    editReview = (a, b, c, d, e, f) => {
        this.setState({
            reviewEditTitle: a,
            reviewEditRating: b,
            reviewEditMainText: c,
            reviewEditName: d,
            reviewEditUserId: e,
            reviewEditReviewId: f,
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
                backToRecipe={this.backToRecipe}
                backToSingleRecipe={this.backToSingleRecipe}
                goToEditRecipe={this.goToEditRecipe}
                switchPage={this.props.switchPage}
            />
        }
        else {
            if (this.state.viewSingleRecipe) {
                return (
                    <React.Fragment>
                        <SingleRecipe

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
                            switchPage={this.props.switchPage}
                            loggedIn={this.props.loggedIn}

                            reviewPostingUserId={this.state.reviewPostingUserId}
                            reviewPostingTitle={this.state.reviewPostingTitle}
                            reviewPostingRating={this.state.reviewPostingRating}
                            reviewPostingMainText={this.state.reviewPostingMainText}
                            postReview={this.postReview}
                            updateForm={this.updateForm}

                            reviewEditTitle={this.state.reviewEditTitle}
                            reviewEditRating={this.state.reviewEditRating}
                            reviewEditMainText={this.state.reviewEditMainText}
                            reviewEditName={this.state.reviewEditName}
                            reviewEditUserId={this.state.reviewEditUserId}
                            reviewEditReviewId={this.state.reviewEditReviewId}
                            editReview={this.editReview}
                        />
                    </React.Fragment>)
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
                                                    document.body.scrollTop = 0;
                                                    document.documentElement.scrollTop = 0;
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