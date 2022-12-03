import React from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

export default class PostRecipe extends React.Component {
    state = {
        name: "",
        category: "Appetizer",
        estCost: "",
        reqIngredients: [],
        optionalIngredients: [],
        prepSteps: [],
        steps: [],
        picture: "",
        prepDuration: "",
        cookingDuration: "",
        cookingTools: [],
        foodTags: [],
        user_id: "",
        showGameId: ""
    }

    BASE_API_URL = "http://localhost:3000/"

    async componentDidMount() {
        // Load all resources in parallel
        let userList = await axios.get(this.BASE_API_URL + 'user', { params: { "email": this.props.loginEmail } });


        console.log(userList.data);
        console.log(this.props)
    }

    updateForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    updateFormArraySteps = (e) => {
        let index = e.target.ariaLabel
        const modify = [
            ...this.state.steps.slice(0, index),
            e.target.value,
            ...this.state.steps.slice(index + 1)
        ]

        this.setState({
            steps: modify
        })
    }
    updateFormArrayPrepSteps = (e) => {
        let index = e.target.ariaLabel
        const modify = [
            ...this.state.prepSteps.slice(0, index),
            e.target.value,
            ...this.state.prepSteps.slice(index + 1)
        ]

        this.setState({
            prepSteps: modify
        })
    }
    updateFormArrayOpIng = (e) => {
        let index = e.target.ariaLabel
        const modify = [
            ...this.state.optionalIngredients.slice(0, index),
            e.target.value,
            ...this.state.optionalIngredients.slice(index + 1)
        ]

        this.setState({
            optionalIngredients: modify
        })
    }
    updateFormArrayReqIng = (e) => {
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
    updateFormArrayTool = (e) => {
        let index = e.target.ariaLabel
        const modify = [
            ...this.state.cookingTools.slice(0, index),
            e.target.value,
            ...this.state.cookingTools.slice(index + 1)
        ]

        this.setState({
            cookingTools: modify
        })
    }


    updateFormArrayStepsAdd = (e) => {
        console.log(e.target)
        const modify = [
            ...this.state.steps.slice(),
            ""
        ]

        this.setState({
            steps: modify
        })
    }
    updateFormArrayPrepStepsAdd = (e) => {
        const modify = [
            ...this.state.prepSteps.slice(),
            ""
        ]

        this.setState({
            prepSteps: modify
        })
    }
    updateFormArrayOpIngAdd = (e) => {
        const modify = [
            ...this.state.optionalIngredients.slice(),
            ""
        ]

        this.setState({
            optionalIngredients: modify
        })
    }
    updateFormArrayReqIngAdd = (e) => {
        const modify = [
            ...this.state.reqIngredients.slice(),
            ""
        ]

        this.setState({
            reqIngredients: modify
        })
    }
    updateFormArrayToolAdd = (e) => {
        const modify = [
            ...this.state.cookingTools.slice(),
            ""
        ]

        this.setState({
            cookingTools: modify
        })
    }


    render() {
        return (
            <React.Fragment>
                <div className="p-4 m-3"></div>
                <div>
                    {/* Name */}
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Name of Recipe"
                            aria-label="Name of Recipe" aria-describedby="basic-addon1"
                            value={this.state.name} name="name" onChange={this.updateForm} />
                    </div>

                    {/* Category */}
                    <div class="form-floating mb-3">
                        <select class="form-select" id="floatingSelect" aria-label="Floating label select example"
                            value={this.state.category} name="category" onChange={this.updateForm}>
                            <option value="Appetizer">Appetizer</option>
                            <option value="Mains">Mains</option>
                            <option value="Dessert and Drinks">Dessert and Drinks</option>
                        </select>
                        <label for="floatingSelect">Recipe Category</label>
                    </div>

                    {/* EstCost */}
                    <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input type="number" class="form-control" placeholder="Estimated Cost of Recipe" aria-label="Estimated Cost"
                            value={this.state.estCost} name="estCost" onChange={this.updateForm} />
                    </div>

                    {/* Req Ingredients */}
                    <div class="input-group mb-3">
                            <span class="input-group-text">Required Ingredient</span>
                            <button type="button" class="btn btn-primary"
                                onClick={this.updateFormArrayReqIng}><i class="bi bi-plus"></i></button>
                    </div>
                    {this.state.reqIngredients.map((e, i) => {
                        return (
                            <div class="input-group mb-3" key={i}>
                                <span class="input-group-text">Required Ingredient {i + 1}</span>
                                
                                <input type="text" class="form-control" placeholder="Required Ingredients"
                                    aria-label={i} value={e} aria-describedby="basic-addon1" onChange={this.updateFormArrayReqIng} />
                            </div>
                        )
                    })}

                    {/* Optional Ingredients */}
                    <div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Optional Ingredients</span>
                            <button type="button" class="btn btn-primary"
                                onClick={this.updateFormArrayOpIngAdd}><i class="bi bi-plus"></i></button>
                        </div>
                        {this.state.optionalIngredients.map((e, i) => {
                            return (
                                <div class="input-group mb-3" key={i}>
                                    <span class="input-group-text">Optional Ingredient {i + 1}</span>
                                    <input type="text" class="form-control" placeholder="Optional Ingredients"
                                        aria-label={i} value={e} aria-describedby="basic-addon1" onChange={this.updateFormArrayOpIng} />
                                </div>
                            )
                        })}
                    </div>

                    {/* Prep Step */}
                    <div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Preparation Steps</span>
                            <button type="button" class="btn btn-primary"
                                onClick={this.updateFormArrayPrepStepsAdd}><i class="bi bi-plus"></i></button>
                        </div>
                        {this.state.prepSteps.map((e, i) => {
                            return (
                                <div class="input-group mb-3" key={i}>
                                    <span class="input-group-text">Preparation Steps</span>
                                    <textarea class="form-control" placeholder="Write Step at a time" aria-label={i}
                                        value={e} onChange={this.updateFormArrayPrepSteps}></textarea>
                                </div>
                            )
                        })}
                    </div>

                    {/* Cooking Step */}
                    <div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Cooking Steps</span>
                            <button type="button" class="btn btn-primary"
                                onClick={this.updateFormArrayStepsAdd}><i class="bi bi-plus"></i></button>
                        </div>
                        {this.state.steps.map((e, i) => {
                            return (
                                <div class="input-group mb-3" key={i}>
                                    <span class="input-group-text">Cooking Steps {i + 1}</span>
                                    <textarea class="form-control" placeholder="Write Step at a time" aria-label={i}
                                        value={e} onChange={this.updateFormArraySteps}></textarea>
                                </div>
                            )
                        })}
                    </div>

                    {/* Picture */}
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="URL of Picture"
                            aria-label="URL of Picture" aria-describedby="basic-addon1"
                            value={this.state.picture} name="picture" onChange={this.updateForm} />
                    </div>

                    {/* PrepDuration: */}
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Preparation Duration"
                            aria-label="Preparation Duration" aria-describedby="basic-addon1"
                            value={this.state.prepDuration} name="prepDuration" onChange={this.updateForm} />
                    </div>

                    {/* CookingDuration */}
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Cooking Duration"
                            aria-label="Cooking Duration" aria-describedby="basic-addon1"
                            value={this.state.cookingDuration} name="cookingDuration" onChange={this.updateForm} />
                    </div>

                    {/* cookingTools  */}
                    <div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Cooking Tools</span>
                            <button type="button" class="btn btn-primary" onClick={this.updateFormArrayToolAdd}><i class="bi bi-plus"></i></button>
                        </div>
                        {this.state.cookingTools.map((e, i) => {
                            return (
                                <div class="input-group mb-3" key={i}>
                                    <span class="input-group-text">Cooking Tool {i + 1}</span>
                                    <input type="text" class="form-control" placeholder="Write 1 tool at a time"
                                        aria-label={i} value={e} aria-describedby="basic-addon1" onChange={this.updateFormArrayTool} />
                                </div>
                            )
                        })}
                    </div>

                    {/* foodTags  */}


                    {/* user_id  */}


                    {/* showGameId  */}





                    <button type="button" class="btn btn-secondary m-2">Reset</button>
                    <button type="button" class="btn btn-primary m-2">Post</button>

                </div>
            </React.Fragment>
        )
    }
}