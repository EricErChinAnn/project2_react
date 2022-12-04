import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "./SingleRecipe.css"
import { getStar, getStarReview } from "../module/GetStar"
import { getShowGameIcon } from '../module/GetShowGame'

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
                <div className='my-1 mx-2'><p className='m-0 d-flex flex-row'><span className='bold'>Dietary Notes: </span>{singleRecipe.foodTags.map((each, i) => {
                    return (<p className='mx-1 my-0 foodTags rounded-pill '>{each.name}</p>)
                })}</p>
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

    console.log(singleRecipe)
    let showReviews = () => {
        if (singleRecipe.reviewId[0]) {
            return (
                <div className="fontLust">
                    {singleRecipe.reviewId.map((e) => {
                        return (
                            <div className="card mb-3 mx-2">
                                <div className="card-header fontCinB" style={{ fontSize: "18px" }}>
                                    {e.title}{getStarReview(e.rating)}
                                </div>
                                <div className="px-2 py-2">
                                    <p className="m-0">{e.mainText}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }

    return (
        <React.Fragment>
            <div className="p-4 m-2"></div>

            <div className='m-3 rounded-2 backgroundHolder'>
                <div className=' px-3 py-2'>
                    <i className="bi bi-caret-left fontCinN mouseOverCursor"
                        onClick={() => { props.backToRecipe() }}
                        style={{ fontSize: "20px" }}
                    >Back</i>
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
            <div className='reviewContainer'>
            {showReviews()}
            </div>
        </React.Fragment>
    )
}