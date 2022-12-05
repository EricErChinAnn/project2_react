import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import axios from 'axios'

export default class SearchRecipe extends React.Component {
    state = {
        dataToEdit: "",
        dataShowGame: [],


        categoryEdit: "",
        cookingToolEdit: [],
        durationCookingEdit: "",
        durationPrepEdit: "",
        estCostEdit: 0,
        foodTagsEdit: [],
        ingredientsOptionalEdit: [],
        ingredientsReqEdit: [],
        nameEdit: "",
        pictureEdit: "",
        prepStepsEdit: "",
        reviewIdEdit: [],
        showGameIdEdit: "",
        stepsEdit: [],
        userIdEdit: []
    }

    BASE_API_URL = "http://localhost:3000/"

    async componentDidMount() {
        const response = (await axios.get(this.BASE_API_URL + "purerecipe",
            { params: { "_id": this.props.singleRecipeId } })).data[0];
        const showGameData = await axios.get(this.BASE_API_URL + 'showGame');

        this.setState({
            dataToEdit: response,
            dataShowGame: showGameData.data,

            nameEdit: response.name,
            categoryEdit: response.category,
            showGameIdEdit: response.showGameId,
            estCostEdit: response.estCost,
            pictureEdit: response.picture,
            durationPrepEdit: response.duration.prep,
            durationCookingEdit: response.duration.cooking,







            



            cookingToolEdit: response.cookingTools,
            foodTagsEdit: response.foodTags,
            ingredientsOptionalEdit: response.ingredients.optional,
            ingredientsReqEdit: response.ingredients.req,
            prepStepsEdit: response.prepSteps,
            reviewIdEdit: response.reviewId,
            stepsEdit: response.steps,
            userIdEdit: response.userId
        })
    }

    updateFormEdit = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    stringValidate = (value, text) => {
        if (!value) {
            return (
                <div className='m-0' style={{ color: "red" }}>
                    {text}
                </div>
            )
        } else {
            return null
        }
    }

    render() {
        console.log("edits")
        console.log(this.props)
        console.log(this.state.dataToEdit)

        return (
            <React.Fragment>
                <div className="p-4 m-2"></div>
                <p>HELLO EDIT TIME</p>
                <div className='fontLust'>

                    {/* Edit Name */}
                    <div className="mb-3">
                        <div className="input-group">
                            <span class="input-group-text" id="basic-addon1">Name</span>
                            <input type="text" className="form-control" placeholder="Name of Recipe"
                                aria-label="Name of Recipe" aria-describedby="basic-addon1"
                                value={this.state.nameEdit} name="nameEdit" onChange={this.updateFormEdit} />
                        </div>
                        {this.stringValidate(this.state.nameEdit, "*Please enter a Name")}
                    </div>

                    {/* Category */}
                    <div className="form-floating mb-3">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example"
                            value={this.state.categoryEdit} name="categoryEdit" onChange={this.updateFormEdit}>
                            <option value="Appetizer">Appetizer</option>
                            <option value="Mains">Mains</option>
                            <option value="Dessert and Drinks">Dessert and Drinks</option>
                        </select>
                        <label for="floatingSelect">Recipe Category</label>
                    </div>

                    {/* showGameId  */}
                    <div className="form-floating mb-3">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example"
                            value={this.state.showGameIdEdit} name="showGameIdEdit" onChange={this.updateFormEdit}>
                            {this.state.dataShowGame.map((e, i) => {
                                return (
                                    <option key={i} value={e._id}>{e.name}</option>
                                )
                            })}
                        </select>
                        <label for="floatingSelect">Origin of Recipe</label>
                    </div>

                    {/* EstCost */}
                    <div className='mb-3'>
                        <div className="input-group">
                            <span className="input-group-text">Est Cost $</span>
                            <input type="number" className="form-control" placeholder="Estimated Cost of Recipe" aria-label="Estimated Cost"
                                value={this.state.estCostEdit} name="estCostEdit" onChange={this.updateFormEdit} />
                        </div>
                        {this.stringValidate(this.state.estCostEdit, "*Please enter an estimated cost")}
                    </div>

                    {/* Picture */}
                    <div className=' mb-3'>
                        <div className="input-group">
                        <span class="input-group-text" id="basic-addon1">Pic URL</span>
                            <input type="text" className="form-control" placeholder="URL of Picture"
                                aria-label="URL of Picture" aria-describedby="basic-addon1"
                                value={this.state.pictureEdit} name="pictureEdit" onChange={this.updateFormEdit} />
                        </div>
                        {this.stringValidate(this.state.pictureEdit, "*Please enter URL to your picture")}
                    </div>

                    {/* PrepDuration: */}
                    <div className="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Prep Duration</span>
                        <input type="text" className="form-control" placeholder="Preparation Duration"
                            aria-label="Preparation Duration" aria-describedby="basic-addon1"
                            value={this.state.durationPrepEdit} name="durationPrepEdit" onChange={this.updateFormEdit} />
                    </div>

                    {/* CookingDuration */}
                    <div className='mb-3'>
                        <div className="input-group">
                        <span class="input-group-text" id="basic-addon1">Cooking Duration</span>
                            <input type="text" className="form-control" placeholder="Cooking Duration"
                                aria-label="Cooking Duration" aria-describedby="basic-addon1"
                                value={this.state.durationCookingEdit} name="durationCookingEdit" onChange={this.updateFormEdit} />
                        </div>
                        {this.stringValidate(this.state.durationCookingEdit,"*Please enter the cooking duration")}
                    </div>


                </div>
            </React.Fragment>
        )
    }
}