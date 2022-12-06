import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import axios from 'axios'
import "./EditSingleRecipe.css"

export default class SearchRecipe extends React.Component {
    state = {
        dataToEdit: "",
        dataShowGame: [],
        tagData: [],


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
        prepStepsEdit: [],
        reviewIdEdit: [],
        showGameIdEdit: "",
        stepsEdit: [],
        userIdEdit: [],
    }

    BASE_API_URL = "http://localhost:3000/"

    async componentDidMount() {
        const response = (await axios.get(this.BASE_API_URL + "purerecipe",
            { params: { "_id": this.props.singleRecipeId } })).data[0];
        const showGameData = await axios.get(this.BASE_API_URL + 'showGame');
        const tagData = await axios.get(this.BASE_API_URL + 'tags');

        this.setState({
            dataToEdit: response,
            dataShowGame: showGameData.data,
            tagData: tagData.data,

            nameEdit: response.name,
            categoryEdit: response.category,
            showGameIdEdit: response.showGameId,
            estCostEdit: response.estCost,
            pictureEdit: response.picture,
            durationPrepEdit: response.duration.prep,
            durationCookingEdit: response.duration.cooking,
            foodTagsEdit: response.foodTags,

            ingredientsReqEdit: response.ingredients.req,
            ingredientsOptionalEdit: response.ingredients.optional,
            cookingToolEdit: response.cookingTools,
            prepStepsEdit: response.prepSteps,
            stepsEdit: response.steps,

            reviewIdEdit: response.reviewId,
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
    arrayValidate = (v,text)=>{
        if(!((v.filter(n=>n)).length>0)){
            return(
                <div className='m-0' style={{ color: "red" }}>
                {text}
            </div>
            )
        }
    }


    updateFormArrayFoodTagsEdit = (event) => {
        if (this.state.foodTagsEdit.includes(event.target.value) === false) {

            let cloned = [...this.state.foodTagsEdit, event.target.value];

            this.setState({
                'foodTagsEdit': cloned
            })
        } else {
            let index = [...this.state.foodTagsEdit].indexOf(event.target.value);

            let modify = [...this.state.foodTagsEdit.slice(0, index),
            ...this.state.foodTagsEdit.slice(index + 1)]

            this.setState({
                'foodTagsEdit': modify
            })
        }

    }

    updateFormArrayReqIngAdd = () => {
        const modify = [
            ...this.state.ingredientsReqEdit.slice(),
            ""
        ]

        this.setState({
            "ingredientsReqEdit": modify
        })
    }
    updateFormArrayReqIng = (e) => {
        let index = e.target.ariaLabel

        let clonedArr = [...this.state.ingredientsReqEdit]
        clonedArr[index] = e.target.value

        this.setState({
            ingredientsReqEdit: clonedArr
        })
    }

    updateFormArrayOpIngAdd = () => {
        const modify = [
            ...this.state.ingredientsOptionalEdit.slice(),
            ""
        ]

        this.setState({
            "ingredientsOptionalEdit": modify
        })
    }
    updateFormArrayOpIng = (e) => {
        let index = e.target.ariaLabel

        let clonedArr = [...this.state.ingredientsOptionalEdit]
        clonedArr[index] = e.target.value

        this.setState({
            ingredientsOptionalEdit: clonedArr
        })
    }

    updateFormArrayCookingToolAdd = () => {
        const modify = [
            ...this.state.cookingToolEdit.slice(),
            ""
        ]

        this.setState({
            "cookingToolEdit": modify
        })
    }
    updateFormCookingTool = (e) => {
        let index = e.target.ariaLabel

        let clonedArr = [...this.state.cookingToolEdit]
        clonedArr[index] = e.target.value

        this.setState({
            cookingToolEdit: clonedArr
        })
    }

    updateFormArrayStepsAdd = () => {
        const modify = [
            ...this.state.stepsEdit.slice(),
            ""
        ]

        this.setState({
            "stepsEdit": modify
        })
    }
    updateFormArraySteps = (e) => {
        let index = e.target.ariaLabel

        let clonedArr = [...this.state.stepsEdit]
        clonedArr[index] = e.target.value

        this.setState({
            stepsEdit: clonedArr
        })
    }

    updateFormArrayPrepStepsAdd = () => {
        const modify = [
            ...this.state.prepStepsEdit.slice(),
            ""
        ]

        this.setState({
            "prepStepsEdit": modify
        })
    }
    updateFormArrayPrepSteps = (e) => {
        let index = e.target.ariaLabel

        let clonedArr = [...this.state.prepStepsEdit]
        clonedArr[index] = e.target.value

        this.setState({
            prepStepsEdit: clonedArr
        })
    }



    resetEdit = async()=>{
        const response = (await axios.get(this.BASE_API_URL + "purerecipe",
            { params: { "_id": this.props.singleRecipeId } })).data[0];
        const showGameData = await axios.get(this.BASE_API_URL + 'showGame');
        const tagData = await axios.get(this.BASE_API_URL + 'tags');

        this.setState({
            dataToEdit: response,
            dataShowGame: showGameData.data,
            tagData: tagData.data,

            nameEdit: response.name,
            categoryEdit: response.category,
            showGameIdEdit: response.showGameId,
            estCostEdit: response.estCost,
            pictureEdit: response.picture,
            durationPrepEdit: response.duration.prep,
            durationCookingEdit: response.duration.cooking,
            foodTagsEdit: response.foodTags,

            ingredientsReqEdit: response.ingredients.req,
            ingredientsOptionalEdit: response.ingredients.optional,
            cookingToolEdit: response.cookingTools,
            prepStepsEdit: response.prepSteps,
            stepsEdit: response.steps,

            reviewIdEdit: response.reviewId,
            userIdEdit: response.userId
        })
    }


    callAPIWithEdit = async () => {
        if(this.state.nameEdit
            && this.state.estCostEdit 
            && this.state.pictureEdit
            && this.state.durationCookingEdit
            && (this.state.ingredientsReqEdit.filter(n=>n)).length>0
            && (this.state.cookingToolEdit.filter(n=>n)).length>0
            && (this.state.stepsEdit.filter(n=>n)).length>0
        ){
            await axios.put(this.BASE_API_URL + "updateRecipe/"+ this.props.singleRecipeId , {
                name:this.state.nameEdit,
                category:this.state.categoryEdit,
                estCost:this.state.estCostEdit,
                reqIngredients:this.state.ingredientsReqEdit,
                optionalIngredients:this.state.ingredientsOptionalEdit,
                prepSteps:this.state.prepStepsEdit,
                steps:this.state.stepsEdit,
                picture:this.state.pictureEdit,
                prepDuration:this.state.durationPrepEdit,
                cookingDuration:this.state.durationCookingEdit,
                cookingTools:this.state.cookingToolEdit,
                user_id:this.state.userIdEdit,
                foodTags:this.state.foodTagsEdit,
                reviewId:this.state.reviewIdEdit,
                showGameId:this.state.showGameIdEdit,
            })

            this.props.backToSingleRecipe()
            this.props.backToRecipe()
            this.props.switchPage("home")

            alert("Recipe have been edited")


        } else {
            alert("Please fill in the required information")
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className="p-4 m-2"></div>

                <div id='formEditR' className='fontLust d-flex flex-column justify-content-center m-3 p-4 rounded'>

                <i className="bi bi-caret-left fontCinN mouseOverCursor hoverDropOpacity mb-3"
                        onClick={this.props.backToSingleRecipe}
                        style={{ fontSize: "20px" }}
                    >Back</i>
                    <div className='justify-content-center d-flex fontCinB '><h1>Edit Recipe</h1></div>
                    <div className='drawALine mb-3'></div>


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
                        {this.stringValidate(this.state.durationCookingEdit, "*Please enter the cooking duration")}
                    </div>

                    {/* foodTags  */}
                    <div className='insideFormColor p-3 rounded mb-3'>
                        <div className='d-flex justify-content-center'>
                            <p className='m-0' >Select Food Tags</p>
                        </div>
                        <div className='d-flex flex-wrap justify-content-center'>
                            {this.state.tagData.map((e, i) => {
                                return (
                                    <div className="input-group-text m-2 flex-fill align-items-center" key={i}>
                                        <input className="form-check-input 0-0" type="checkbox"
                                            aria-label="Checkbox for following text input" id={e.name}
                                            value={e._id} name="foodTags" checked={this.state.foodTagsEdit.includes(e._id)}
                                            onChange={this.updateFormArrayFoodTagsEdit} />
                                        <label className='align-items-center p-2 pb-1 m-0' for={e.name}>{e.name}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Req Ingredients */}
                    <div className='insideFormColor p-3 rounded mb-3'>
                        <div className='mb-3'>
                            <div className="input-group ">
                                <span className="input-group-text">Required Ingredients</span>
                                <button type="button" className="btn btn-primary" onClick={this.updateFormArrayReqIngAdd}><i className="bi bi-plus"></i></button>
                            </div>
                        </div>
                        {this.state.ingredientsReqEdit.map((e, i) => {
                            return (
                                <div class="input-group mb-2" key={i}>
                                    <span class="input-group-text"><i class="bi bi-caret-right-fill"></i></span>
                                    <input type="text" className="form-control" placeholder="Write 1 ingredient only"
                                        aria-label={i} value={e} aria-describedby="basic-addon1" onChange={this.updateFormArrayReqIng} />
                                </div>
                            )
                        })}
                        {this.arrayValidate(this.state.ingredientsReqEdit,"*Please enter an Ingredient")}
                    </div>

                    {/* Optional Ingredients */}
                    <div className='insideFormColor p-3 rounded mb-3'>
                        <div className='mb-3'>
                            <div className="input-group ">
                                <span className="input-group-text">Optional Ingredients</span>
                                <button type="button" className="btn btn-primary" onClick={this.updateFormArrayOpIngAdd}><i className="bi bi-plus"></i></button>
                            </div>
                        </div>
                        {this.state.ingredientsOptionalEdit.map((e, i) => {
                            return (
                                <div class="input-group mb-2" key={i}>
                                    <span class="input-group-text"><i class="bi bi-caret-right-fill"></i></span>
                                    <input type="text" className="form-control" placeholder="Write 1 ingredient only"
                                        aria-label={i} value={e} aria-describedby="basic-addon1" onChange={this.updateFormArrayOpIng} />
                                </div>
                            )
                        })}
                    </div>

                    {/* Cooking Tools */}
                    <div className='insideFormColor p-3 rounded mb-3'>
                        <div className='mb-3'>
                            <div className="input-group ">
                                <span className="input-group-text">Cooking Tools</span>
                                <button type="button" className="btn btn-primary" onClick={this.updateFormArrayCookingToolAdd}><i className="bi bi-plus"></i></button>
                            </div>
                        </div>
                        {this.state.cookingToolEdit.map((e, i) => {
                            return (
                                <div class="input-group mb-2" key={i}>
                                    <span class="input-group-text"><i class="bi bi-caret-right-fill"></i></span>
                                    <input type="text" className="form-control" placeholder="Write 1 ingredient only"
                                        aria-label={i} value={e} aria-describedby="basic-addon1" onChange={this.updateFormCookingTool} />
                                </div>
                            )
                        })}
                        {this.arrayValidate(this.state.cookingToolEdit,"*Please enter cooking tools")}
                    </div>

                    {/* Prep Step */}
                    <div className='insideFormColor p-3 rounded mb-3'>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Preparation Steps</span>
                            <button type="button" className="btn btn-primary"
                                onClick={this.updateFormArrayPrepStepsAdd}><i className="bi bi-plus"></i></button>
                        </div>
                        {this.state.prepStepsEdit.map((e, i) => {
                            return (
                                <div className="input-group mb-3" key={i}>
                                    <span className="input-group-text"><i class="bi bi-caret-right-fill"></i></span>
                                    <textarea className="form-control" placeholder="Write a step at a time" aria-label={i}
                                        value={e} onChange={this.updateFormArrayPrepSteps}></textarea>
                                </div>
                            )
                        })}
                    </div>

                    {/* Cooking Step */}
                    <div className='insideFormColor p-3 rounded mb-3'>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Cooking Steps</span>
                            <button type="button" className="btn btn-primary"
                                onClick={this.updateFormArrayStepsAdd}><i className="bi bi-plus"></i></button>
                        </div>
                        {this.state.stepsEdit.map((e, i) => {
                            return (
                                <div className="input-group mb-3" key={i}>
                                    <span className="input-group-text"><i class="bi bi-caret-right-fill"></i></span>
                                    <textarea className="form-control" placeholder="Write a step at a time" aria-label={i}
                                        value={e} onChange={this.updateFormArraySteps}></textarea>
                                </div>
                            )
                        })}
                        {this.arrayValidate(this.state.stepsEdit,"*Please enter the cooking steps")}
                    </div>

                    <button type="button" className="btn btn-secondary m-2"
                        onClick={this.resetEdit}>Reset</button>
                    <button type="button" className="btn btn-primary m-2"
                        onClick={this.callAPIWithEdit}>Edit</button>

                </div>
            </React.Fragment>
        )
    }
}