import React from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "./PostRecipe.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class PostRecipe extends React.Component {
    state = {
        dataFoodTag: [],
        dataShowGame: [],

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
        showGameId: "637c8efb7ee2af299ef3dd49"
    }

    BASE_API_URL = "https://ericerchinann-fantasygourmet-3.onrender.com/"

    async componentDidMount() {
        // Load all resources in parallel
        let userList = await axios.get(this.BASE_API_URL + 'user', { params: { "email": this.props.loginEmail } });
        let tagData = await axios.get(this.BASE_API_URL + 'tags');
        let showGameData = await axios.get(this.BASE_API_URL + 'showGame');

        this.setState({
            dataFoodTag: tagData.data,
            dataShowGame: showGameData.data,
            user_id: (userList.data[0]._id)
        })
    }

    callAPIWithPost = async () => {
        if (this.state.name
            && this.state.estCost
            && this.state.reqIngredients.length > 0
            && this.state.steps.length > 0
            && this.state.picture
            && this.state.cookingDuration
            && this.state.cookingTools.length > 0
            && this.state.showGameId
        ) {
            await axios.post(this.BASE_API_URL + "addRecipe", {
                name: this.state.name,
                category: this.state.category,
                estCost: parseFloat(this.state.estCost),
                reqIngredients: this.state.reqIngredients,
                optionalIngredients: this.state.optionalIngredients,
                prepSteps: this.state.prepSteps,
                steps: this.state.steps,
                picture: this.state.picture,
                prepDuration: this.state.prepDuration,
                cookingDuration: this.state.cookingDuration,
                cookingTools: this.state.cookingTools,
                showGameId: this.state.showGameId,
                foodTags: this.state.foodTags,
                user_id: this.state.user_id
            }
            )
            this.setState({
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
                showGameId: "637c8efb7ee2af299ef3dd49"
            })

            document.querySelector("#nameValidate").style.display = "none"
            document.querySelector("#estCostValidate").style.display = "none"
            document.querySelector("#reqIngValidate").style.display = "none"
            document.querySelector("#stepsValidate").style.display = "none"
            document.querySelector("#pictureValidate").style.display = "none"
            document.querySelector("#cookingDurationValidate").style.display = "none"
            document.querySelector("#cookingToolsValidate").style.display = "none"

            const notifyRecipeFormDone = () => toast.success('🥡 Recipe have been uploaded', {
                containerId: 'recipeFormDoneNotify',
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "dark",
            });

            notifyRecipeFormDone()

            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
        else {
            if (!this.state.name) { document.querySelector("#nameValidate").style.display = "block" }
            else { document.querySelector("#nameValidate").style.display = "none" }

            if (!this.state.estCost) { document.querySelector("#estCostValidate").style.display = "block" }
            else { document.querySelector("#estCostValidate").style.display = "none" }

            if (this.state.reqIngredients[0] === undefined || this.state.reqIngredients.includes("")) { document.querySelector("#reqIngValidate").style.display = "block" }
            else { document.querySelector("#reqIngValidate").style.display = "none" }

            if (this.state.steps[0] === undefined || this.state.steps.includes("")) { document.querySelector("#stepsValidate").style.display = "block" }
            else { document.querySelector("#stepsValidate").style.display = "none" }

            if (!this.state.picture) { document.querySelector("#pictureValidate").style.display = "block" }
            else { document.querySelector("#pictureValidate").style.display = "none" }

            if (!this.state.cookingDuration) { document.querySelector("#cookingDurationValidate").style.display = "block" }
            else { document.querySelector("#cookingDurationValidate").style.display = "none" }

            if (this.state.steps[0] === undefined || this.state.steps.includes("")) { document.querySelector("#cookingToolsValidate").style.display = "block" }
            else { document.querySelector("#cookingToolsValidate").style.display = "none" }

            const notifyRecipeFormError = () => toast.error('🦞 Please enter all required fields', {
                containerId: 'recipeFormErrorFormNotify',
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "dark",
            });

            notifyRecipeFormError()

            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;

        }
    }

    resetCreateForm = () => {

        const notifyResetRecipeForm = () => toast('🧊 Form reset completed', {
            containerId: 'resetRecipeFormNotify',
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
        });

        notifyResetRecipeForm()

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        return (
            this, this.setState({
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
                showGameId: "637c8efb7ee2af299ef3dd49"
            }))
    }

    updateForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    updateFormArraySteps = (e) => {
        let index = e.target.ariaLabel

        let clonedArr = [...this.state.steps]
        clonedArr[index] = e.target.value

        this.setState({
            steps: clonedArr
        })

        // const modify = [
        //     ...this.state.steps.slice(0, index),
        //     e.target.value,
        //     ...this.state.steps.slice(index + 1)
        // ]

        // this.setState({
        //     steps: modify
        // })
    }
    updateFormArrayPrepSteps = (e) => {
        let index = e.target.ariaLabel

        let clonedArr = [...this.state.prepSteps]
        clonedArr[index] = e.target.value

        this.setState({
            prepSteps: clonedArr
        })

        // const modify = [
        //     ...this.state.prepSteps.slice(0, index),
        //     e.target.value,
        //     ...this.state.prepSteps.slice(index + 1)
        // ]

        // this.setState({
        //     prepSteps: modify
        // })
    }
    updateFormArrayOpIng = (e) => {
        let index = e.target.ariaLabel

        let clonedArr = [...this.state.optionalIngredients]
        clonedArr[index] = e.target.value

        this.setState({
            optionalIngredients: clonedArr
        })

        // const modify = [
        //     ...this.state.optionalIngredients.slice(0, index),
        //     e.target.value,
        //     ...this.state.optionalIngredients.slice(index + 1)
        // ]

        // this.setState({
        //     optionalIngredients: modify
        // })
    }
    updateFormArrayReqIng = (e) => {
        let index = e.target.ariaLabel

        let clonedArr = [...this.state.reqIngredients]
        clonedArr[index] = e.target.value

        this.setState({
            reqIngredients: clonedArr
        })

        // const modify = [
        //     ...this.state.reqIngredients.slice(0, index),
        //     e.target.value,
        //     ...this.state.reqIngredients.slice(index + 1)
        // ]

        // this.setState({
        //     reqIngredients: modify
        // })
    }
    updateFormArrayTool = (e) => {
        let index = e.target.ariaLabel

        let clonedArr = [...this.state.cookingTools]
        clonedArr[index] = e.target.value

        this.setState({
            cookingTools: clonedArr
        })

        // const modify = [
        //     ...this.state.cookingTools.slice(0, index),
        //     e.target.value,
        //     ...this.state.cookingTools.slice(index + 1)
        // ]

        // this.setState({
        //     cookingTools: modify
        // })
    }


    updateFormArrayStepsAdd = (e) => {
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

    updateFormArrayFoodTags = (event) => {
        if (this.state.foodTags.includes(event.target.value) === false) {

            let cloned = [...this.state.foodTags, event.target.value];

            this.setState({
                'foodTags': cloned
            })


        } else {

            let indexToRemove = this.state.foodTags.findIndex(function (e) {
                return e === event.target.value;
            })

            let cloned = [...this.state.foodTags.slice(0, indexToRemove),
            ...this.state.foodTags.slice(indexToRemove + 1)];
            this.setState({
                foodTags: cloned
            })

        }
    }


    render() {
        return (
            <React.Fragment>

                {/* For Reset Recipe */}
                <ToastContainer
                    enableMultiContainer
                    containerId={'resetRecipeFormNotify'}
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="dark"
                />

                {/* For Recipe Error */}
                <ToastContainer
                    enableMultiContainer
                    containerId={'recipeFormErrorFormNotify'}
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="dark"
                />

                {/* For Recipe Done */}
                <ToastContainer
                    enableMultiContainer
                    containerId={'recipeFormDoneNotify'}
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="dark"
                />



                <div className="p-4 m-3"></div>
                <div id='formCreateR' className='fontLust d-flex flex-column justify-content-center m-3 p-4 rounded'>
                    <i className="bi bi-caret-left fontCinN mouseOverCursor hoverDropOpacity mb-3"
                        onClick={() => { this.props.switchPage("home") }}
                        style={{ fontSize: "20px" }}
                    >Back</i>
                    <div className='justify-content-center d-flex fontCinB '><h1>Create New Recipe</h1></div>
                    <div className='drawALine mb-3'></div>

                    {/* Name */}
                    <div className="mb-3">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Name of Recipe"
                                aria-label="Name of Recipe" aria-describedby="basic-addon1"
                                value={this.state.name} name="name" onChange={this.updateForm} />
                        </div>
                        <div>
                            <p id="nameValidate" className='m-0'
                                style={{ display: "none", color: "red" }}>*Please enter a Name</p>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="form-floating mb-3">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example"
                            value={this.state.category} name="category" onChange={this.updateForm}>
                            <option value="Appetizer">Appetizer</option>
                            <option value="Mains">Mains</option>
                            <option value="Dessert and Drinks">Dessert and Drinks</option>
                        </select>
                        <label for="floatingSelect">Recipe Category</label>
                    </div>

                    {/* showGameId  */}
                    <div className="form-floating mb-3">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example"
                            value={this.state.showGameId} name="showGameId" onChange={this.updateForm}>
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
                            <span className="input-group-text">$</span>
                            <input type="number" className="form-control" placeholder="Estimated Cost of Recipe" aria-label="Estimated Cost"
                                value={this.state.estCost} name="estCost" onChange={this.updateForm} />
                        </div>
                        <div>
                            <p id="estCostValidate" className='m-0'
                                style={{ display: "none", color: "red" }}>*Please enter an estimated price</p>
                        </div>
                    </div>

                    {/* Picture */}
                    <div className=' mb-3'>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="URL of Picture"
                                aria-label="URL of Picture" aria-describedby="basic-addon1"
                                value={this.state.picture} name="picture" onChange={this.updateForm} />
                        </div>
                        <div>
                            <p id="pictureValidate"
                                style={{ display: "none", color: "red" }}>*Please enter URL to your picture</p>
                        </div>
                    </div>

                    {/* PrepDuration: */}
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Preparation Duration"
                            aria-label="Preparation Duration" aria-describedby="basic-addon1"
                            value={this.state.prepDuration} name="prepDuration" onChange={this.updateForm} />
                    </div>

                    {/* CookingDuration */}
                    <div className='mb-3'>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Cooking Duration"
                                aria-label="Cooking Duration" aria-describedby="basic-addon1"
                                value={this.state.cookingDuration} name="cookingDuration" onChange={this.updateForm} />
                        </div>
                        <div>
                            <p id="cookingDurationValidate"
                                style={{ display: "none", color: "red" }}>*Please enter cooking duration </p>
                        </div>
                    </div>

                    {/* Req Ingredients */}
                    <div className='insideFormColor p-3 rounded mb-3'>
                        <div className='mb-3'>
                            <div className="input-group ">
                                <span className="input-group-text">Required Ingredients</span>
                                <button type="button" className="btn btn-primary"
                                    onClick={this.updateFormArrayReqIngAdd}><i className="bi bi-plus"></i></button>
                            </div>
                            <div>
                                <p id="reqIngValidate"
                                    style={{ display: "none", color: "red" }}>*Please enter the required ingredient</p>
                            </div>
                        </div>
                        {this.state.reqIngredients.map((e, i) => {
                            return (
                                <div className="input-group mb-3 " key={i}>
                                    <span className="input-group-text">{i + 1}</span>
                                    <input type="text" className="form-control" placeholder="Write 1 ingredient only"
                                        aria-label={i} value={e} aria-describedby="basic-addon1" onChange={this.updateFormArrayReqIng} />
                                </div>
                            )
                        })}
                    </div>

                    {/* Optional Ingredients */}
                    <div className='insideFormColor p-3 rounded mb-3'>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Optional Ingredients</span>
                            <button type="button" className="btn btn-primary"
                                onClick={this.updateFormArrayOpIngAdd}><i className="bi bi-plus"></i></button>
                        </div>
                        {this.state.optionalIngredients.map((e, i) => {
                            return (
                                <div className="input-group mb-3" key={i}>
                                    <span className="input-group-text">{i + 1}</span>
                                    <input type="text" className="form-control" placeholder="Write 1 ingredient only"
                                        aria-label={i} value={e} aria-describedby="basic-addon1" onChange={this.updateFormArrayOpIng} />
                                </div>
                            )
                        })}
                    </div>

                    {/* Prep Step */}
                    <div className='insideFormColor p-3 rounded mb-3'>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Preparation Steps</span>
                            <button type="button" className="btn btn-primary"
                                onClick={this.updateFormArrayPrepStepsAdd}><i className="bi bi-plus"></i></button>
                        </div>
                        {this.state.prepSteps.map((e, i) => {
                            return (
                                <div className="input-group mb-3" key={i}>
                                    <span className="input-group-text">{i + 1}</span>
                                    <textarea className="form-control" placeholder="Write a step at a time" aria-label={i}
                                        value={e} onChange={this.updateFormArrayPrepSteps}></textarea>
                                </div>
                            )
                        })}
                    </div>

                    {/* Cooking Step */}
                    <div className='insideFormColor p-3 rounded mb-3'>
                        <div className='mb-3'>
                            <div className="input-group">
                                <span className="input-group-text">Cooking Steps</span>
                                <button type="button" className="btn btn-primary"
                                    onClick={this.updateFormArrayStepsAdd}><i className="bi bi-plus"></i></button>
                            </div>
                            <div>
                                <p id="stepsValidate"
                                    style={{ display: "none", color: "red" }}>*Please enter the cooking steps</p>
                            </div>
                        </div>
                        {this.state.steps.map((e, i) => {
                            return (
                                <div className="input-group mb-3" key={i}>
                                    <span className="input-group-text">{i + 1}</span>
                                    <textarea className="form-control" placeholder="Write a step at a time" aria-label={i}
                                        value={e} onChange={this.updateFormArraySteps}></textarea>
                                </div>
                            )
                        })}
                    </div>

                    {/* cookingTools  */}
                    <div className='insideFormColor p-3 rounded mb-3'>
                        <div className='mb-3'>
                            <div className="input-group">
                                <span className="input-group-text">Cooking Tools</span>
                                <button type="button" className="btn btn-primary" onClick={this.updateFormArrayToolAdd}><i className="bi bi-plus"></i></button>
                            </div>
                            <div>
                                <p id="cookingToolsValidate"
                                    style={{ display: "none", color: "red" }}>*Please enter cooking tools used </p>
                            </div>
                        </div>
                        {this.state.cookingTools.map((e, i) => {
                            return (
                                <div className="input-group mb-3" key={i}>
                                    <span className="input-group-text">{i + 1}</span>
                                    <input type="text" className="form-control" placeholder="Write 1 tool at a time"
                                        aria-label={i} value={e} aria-describedby="basic-addon1" onChange={this.updateFormArrayTool} />
                                </div>
                            )
                        })}
                    </div>

                    {/* foodTags  */}
                    <div className='insideFormColor p-3 rounded mb-3'>
                        <div className='d-flex justify-content-center'>
                            <p className='m-0' >Select Food Tags</p>
                        </div>
                        <div className='d-flex flex-wrap justify-content-center'>
                            {this.state.dataFoodTag.map((e, i) => {
                                return (
                                    <div className="input-group-text m-2 flex-fill align-items-center" key={i}>
                                        <input className="form-check-input 0-0" type="checkbox"
                                            aria-label="Checkbox for following text input" id={e.name}
                                            value={e._id} name="foodTags" checked={this.state.foodTags.includes(e._id)}
                                            onChange={this.updateFormArrayFoodTags} />
                                        <label className='align-items-center p-2 pb-1 m-0' for={e.name}>{e.name}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <button type="button" className="btn btn-secondary m-2"
                        onClick={this.resetCreateForm}>Reset</button>
                    <button type="button" className="btn btn-primary m-2"
                        onClick={this.callAPIWithPost}>Post</button>

                </div>
            </React.Fragment>
        )
    }
}