import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "./SingleRecipe.css"
import { getStar, getStarReview } from "../module/GetStar"
import { getShowGameIcon } from '../module/GetShowGame'
import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SingleRecipe(props) {

    let singleRecipe = null
    props.data.map((e) => {
        if (e._id === props.singleRecipeId) { return singleRecipe = e }
        else { return null }
    })

    let stars = getStar(singleRecipe.reviewId);

    let ingredientsOptional = () => {
        if (singleRecipe.ingredients.optional[0]) {
            return (
                <div>
                    <p className='m-0 mt-2'><span className='fontCinB me-2'>Optional: </span>{singleRecipe.ingredients.optional.map((e) => {
                        return (<p className='ms-2 m-0'>{e}</p>)
                    })}</p>
                </div>
            )
        }
    }

    let displayFoodTags = () => {
        if (singleRecipe.foodTags[0]) {
            return (
                <div className='my-1 mx-2 d-flex flex-row'>
                    <p className='m-0 d-flex flex-row' style={{ whiteSpace: 'nowrap' }}>
                        <span className='bold'>Dietary Notes:</span>
                    </p>
                    <div className='m-0 d-flex flex-row flex-wrap justify-content-center'>
                        {singleRecipe.foodTags.map((each, i) => {
                            return (<p className='mx-1 my-0 mb-1 foodTags rounded-pill'>{each.name}</p>)
                        })}
                    </div>
                </div>
            )
        }
    }

    let prepSteps = () => {
        if (singleRecipe.prepSteps[0]) {
            return (
                <div>
                    <ol className='m-0 p-2'><span className='fontCinB me-2'>Prep Steps: </span>{singleRecipe.prepSteps.map((e) => {
                        return (<li className='m-2'>{e}</li>)
                    })}</ol>
                </div>
            )
        }
    }

    let deleteRecipe = async (recipeId) => {
        await axios.delete(`https://ericerchinann-fantasygourmet-3.onrender.com/deleteRecipe/${recipeId}`)

        props.backToRecipe()
        props.switchPage("home")

        const notifyrecipedelete = () => toast.success('🥫 Your review have been deleted', {
            containerId: 'recipedeleteNotify',
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
        });

        notifyrecipedelete()
    }

    let enableEditDelete = () => {
        if (singleRecipe.userId[0]._id === props.editMatchUserId) {
            return (
                <div id="editDeleteBtn">
                    <i className="bi bi-pencil-square rounded p-1 px-2 me-2 hoverDropOpacity"
                        style={{ backgroundColor: "rgba( 64.71%, 52.94%, 36.86% ,0.9)", color: "white" }}
                        onClick={() => { props.goToEditRecipe() }}
                    ></i>
                    <i className="bi bi-trash3 rounded p-1 px-2 hoverDropOpacity"
                        style={{ backgroundColor: "rgba(139,0,0,0.7)", color: "white" }}
                        onClick={() => { deleteRecipe(props.singleRecipeId) }}
                    ></i>
                </div>
            )
        }
    }




    //This is for post reviews only
    let deleteReview = async (reviewId) => {
        await axios.delete(`https://ericerchinann-fantasygourmet-3.onrender.com/deleteReview/${reviewId}`)

        props.backToRecipe()
        props.switchPage("home")


        const notifypostdelete = () => toast.success('🔪 Your review have been deleted', {
            containerId: 'postdeleteNotify',
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
        });

        notifypostdelete()
    }

    let editReviewSubmit = async () => {
        await axios.put(`https://ericerchinann-fantasygourmet-3.onrender.com/updateReview/${props.reviewEditReviewId}`, {
            title: props.reviewEditTitle,
            rating: props.reviewEditRating,
            mainText: props.reviewEditMainText,
            name: props.reviewEditName,
            userId: props.reviewEditUserId
        })

        document.querySelector("#closeModalReviewEdit").click()

        props.backToRecipe()
        props.switchPage("home")

        const notifypostedit = () => toast.success('🍴 Your review have been edited', {
            containerId: 'posteditNotify',
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
        });

        notifypostedit()
    }

    let displayEditReviewList = () => {
        return (
            <div className="modal fade" id="exampleModalReviewEdit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" id="closeModalReviewEdit" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex flex-column fontLust">
                                <div className="rounded p-3" style={{ backgroundColor: "lightgrey" }}>

                                    {/* Review Edit Title */}
                                    <div className='mb-3'>
                                        <div className="input-group">
                                            <span className="input-group-text" id="basic-addon1">Title</span>
                                            <input id="reviewTitlePost" type="text" className="form-control" placeholder="Enter a Title"
                                                value={props.reviewEditTitle} name="reviewEditTitle" onChange={props.updateForm}
                                                aria-label="Title" aria-describedby="basic-addon1" />
                                        </div>
                                        <p className="ms-2 pt-1" id="reviewTitleValidate" style={{ display: "none", color: "red" }}>*Please enter a Title</p>
                                    </div>

                                    {/* Review Edit Rating */}
                                    <div className='d-flex flex-row mb-3'>
                                        <span className="input-group-text" id="reviewRating">Rating</span>
                                        <select className="form-select form-select-sm" id="reviewRatingSelect"
                                            value={props.reviewEditRating} name="reviewEditRating" onChange={props.updateForm}
                                            aria-label=".form-select-sm example">
                                            <option selected value="5">⭐⭐⭐⭐⭐</option>
                                            <option value="4">⭐⭐⭐⭐</option>
                                            <option value="3">⭐⭐⭐</option>
                                            <option value="2">⭐⭐</option>
                                            <option value="1">⭐</option>
                                        </select>
                                    </div>

                                    {/* Review Edit Comments */}
                                    <div className=" mb-2">
                                        <div className='d-flex flex-column'>
                                            <textarea id="commentReviewPost" className='rounded p-2' aria-label="With textarea"
                                                value={props.reviewEditMainText} name="reviewEditMainText" onChange={props.updateForm}
                                                placeholder="Comments">
                                            </textarea>
                                        </div>
                                        <p className="ms-2 pt-1" id="reviewCommentsValidate" style={{ display: "none", color: "red" }}>*Please enter your comments</p>
                                    </div>

                                    <div className="d-flex flex-column">
                                        <button type="button" className="btn btn-primary m-2"
                                            onClick={() => {
                                                if (props.reviewEditMainText && props.reviewEditTitle) {

                                                    document.querySelector("#reviewTitleValidate").style.display = "none"
                                                    document.querySelector("#reviewCommentsValidate").style.display = "none"

                                                    editReviewSubmit()

                                                } else {
                                                    if (!props.reviewEditTitle) { document.querySelector("#reviewTitleValidate").style.display = "block" }
                                                    else { document.querySelector("#reviewTitleValidate").style.display = "none" }

                                                    if (!props.reviewEditMainText) { document.querySelector("#reviewCommentsValidate").style.display = "block" }
                                                    else { document.querySelector("#reviewCommentsValidate").style.display = "none" }
                                                }
                                            }}
                                        >Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    let showReviews = () => {

        if (singleRecipe.reviewId[0]) {
            return (
                <React.Fragment>
                    <div className="fontLust d-flex flex-column">
                        {singleRecipe.reviewId.map((e) => {
                            if (e.userId === props.editMatchUserId) {
                                return (
                                    <div className="card mb-3">
                                        <div className="card-header fontCinB" style={{ fontSize: "18px" }}>
                                            {e.title}<span style={{ fontSize: "12px" }}>{getStarReview(e.rating)}</span>
                                        </div>
                                        <div className="px-2 py-2">
                                            <p className="m-0" style={{ fontSize: "14px" }}>{e.mainText}</p>
                                        </div>
                                        <div className='d-flex flex-column '>
                                            <div className="input-group mt-2">
                                                <button className="btn btn-outline-secondary flex-fill" type="button" id="button-addon1"
                                                    data-bs-toggle="modal" data-bs-target="#exampleModalReviewEdit"
                                                    style={{ backgroundColor: "rgba( 64.71%, 52.94%, 36.86% ,0.9)", color: "white" }}
                                                    onClick={() => {
                                                        props.editReview(e.title, e.rating, e.mainText, e.name, e.userId, e._id)
                                                    }}
                                                ><i className="bi bi-pencil-square"></i></button>
                                                <button className="btn btn-outline-secondary flex-fill" type="button" id="button-addon2"
                                                    style={{ backgroundColor: "rgba(139,0,0,0.7)", color: "white" }}
                                                    onClick={() => deleteReview(e._id)}
                                                ><i className="bi bi-trash3"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                )
                            } else {
                                return (
                                    <div className="card mb-3">
                                        <div className="card-header fontCinB" style={{ fontSize: "18px" }}>
                                            {e.title}<span style={{ fontSize: "12px" }}>{getStarReview(e.rating)}</span>
                                        </div>
                                        <div className="px-2 py-2">
                                            <p className="m-0" style={{ fontSize: "14px" }}>{e.mainText}</p>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    {displayEditReviewList()}
                </React.Fragment>
            )
        }
    }

    let postReviews = () => {
        if (props.loggedIn) {
            return (
                <React.Fragment>
                    <div className="d-flex flex-column fontLust">
                        <div className="rounded p-3" style={{ backgroundColor: "lightgrey" }}>


                            {/* Review Post Title */}
                            <div className='mb-3'>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1">Title</span>
                                    <input id="reviewTitlePost" type="text" className="form-control" placeholder="Enter a Title"
                                        value={props.reviewPostingTitle} name="reviewPostingTitle" onChange={props.updateForm}
                                        aria-label="Title" aria-describedby="basic-addon1" />
                                </div>
                                <p className="ms-2 pt-1" id="reviewTitleValidate" style={{ display: "none", color: "red" }}>*Please enter a Title</p>
                            </div>


                            {/* Review Post Rating */}
                            <div className='d-flex flex-row mb-3'>
                                <span className="input-group-text" id="reviewRating">Rating</span>
                                <select className="form-select form-select-sm" id="reviewRatingSelect"
                                    value={props.reviewPostingRating} name="reviewPostingRating" onChange={props.updateForm}
                                    aria-label=".form-select-sm example">
                                    <option selected value="5">⭐⭐⭐⭐⭐</option>
                                    <option value="4">⭐⭐⭐⭐</option>
                                    <option value="3">⭐⭐⭐</option>
                                    <option value="2">⭐⭐</option>
                                    <option value="1">⭐</option>
                                </select>
                            </div>

                            {/* Review Post Comments */}
                            <div className=" mb-2">
                                <div className='d-flex flex-column'>
                                    <textarea id="commentReviewPost" className='rounded p-2' aria-label="With textarea"
                                        value={props.reviewPostingMainText} name="reviewPostingMainText" onChange={props.updateForm}
                                        placeholder="Comments">
                                    </textarea>
                                </div>
                                <p className="ms-2 pt-1" id="reviewCommentsValidate" style={{ display: "none", color: "red" }}>*Please enter your comments</p>
                            </div>

                            <div className="d-flex flex-column">
                                <button type="button" className="btn btn-primary m-2"
                                    onClick={props.postReview}
                                >Post</button>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="d-flex flex-column rounded p-3" style={{ backgroundColor: "lightgrey" }}>
                        <button type="button" className="fontCinB btn btn-light"
                            onClick={() => { document.getElementById('loginModalToggleNow').click() }}
                        >Login to post a review</button>
                    </div>
                </React.Fragment>
            )
        }
    }



    return (
        <React.Fragment>
            <div className="p-4 m-2"></div>
            <div className='m-3 rounded-2 backgroundHolder pt-1'>
                <div className='d-flex justify-content-between px-3 py-2'>
                    <i className="bi bi-caret-left fontCinN mouseOverCursor hoverDropOpacity"
                        onClick={() => { props.backToRecipe() }}
                        style={{ fontSize: "20px" }}
                    >Back</i>
                    {enableEditDelete()}
                </div>
                <div className='imgContainer'>
                    <img className="mt-0 foodImg holder m-3" src={singleRecipe.picture} alt="Food Display"></img>
                </div>
                <div className='mx-3'>
                    <div className='nameCatContainer'>
                        <h3 className='fontCinB m-0' style={{ fontSize: "24px" }}>{singleRecipe.name}</h3>
                        <div className='drawALine'></div>
                        <p className='m-0 fontCinN pb-2' style={{ fontSize: "small" }}>{singleRecipe.category}</p>
                    </div>
                    <div className='dedsContainer fontLust d-flex flex-wrap justify-content-center rounded-2'>
                        <div className='my-1 mx-2'><p className='m-0 d-flex flex-row'><span className='bold me-2'>Rating:  </span>{stars}</p></div>
                        <div className='my-1 mx-2'><p className='m-0'><span className='bold'>Prep Time: </span>{singleRecipe.duration.prep}</p></div>
                        <div className='my-1 mx-2'><p className='m-0'><span className='bold'>Cook Time: </span>{singleRecipe.duration.cooking}</p></div>
                        <div className='my-1 mx-2'><p className='m-0'><span className='bold'>Estimated Cost: </span>${singleRecipe.estCost.toFixed(2)}</p></div>
                        {displayFoodTags()}
                        <div className='mx-2'><p className='m-0'><span className='bold'>Origin: </span>{getShowGameIcon(singleRecipe.showGameId)} {singleRecipe.showGameId[0].name}</p></div>
                    </div>
                    <div className='eqAndStepsContainer pt-2 fontLust'>
                        <div className='eqContainer d-flex justify-content-around'>
                            <div>
                                <p className='m-0'><span className='fontCinB me-2'>Equipments:</span>{singleRecipe.cookingTools.map((e) => {
                                    return (<p className='ms-2 m-0'>{e}</p>)
                                })}</p>
                            </div>
                            <div>
                                <div>
                                    <p className='m-0'><span className='fontCinB me-2'>Ingredients: </span>{singleRecipe.ingredients.req.map((e) => {
                                        return (<p className='ms-2 m-0'>{e}</p>)
                                    })}</p>
                                </div>
                                {ingredientsOptional()}
                            </div>
                        </div>
                        <div className='drawALine my-2'></div>
                        <div className='stepsContainer'>
                            {prepSteps()}
                            <div>
                                <ol className='m-0 p-2'><span className='fontCinB me-2'>Cooking Steps: </span>{singleRecipe.steps.map((e) => {
                                    return (<li className='m-2'>{e}</li>)
                                })}</ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='m-3 rounded-2 pt-1 reviewContainer'>
                <h1 className='text-center fontCinB mb-2' style={{ fontSize: "30px" }}>Reviews</h1>
                <div className='drawALine mb-3'></div>
                {showReviews()}
                {postReviews()}
            </div>
        </React.Fragment>
    )

}