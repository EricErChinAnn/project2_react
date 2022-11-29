import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "./SingleRecipe.css"
import { getStar } from "../module/GetStar"

export default function SingleRecipe(props) {
    console.log(props)

    let clone = props.data.slice()
    let singleRecipe = null
    clone.map((e) => {
        if (e._id === props.singleRecipeId) { singleRecipe = e }
    })
    console.log(clone);
    console.log("hello");
    console.log(singleRecipe);

    return (
        <React.Fragment>
            <div className="p-4 m-2"></div>

            <div className='m-3 rounded-2 backgroundHolder'>
                <div className=' ps-2 py-2'>
                    <i className="bi bi-caret-left fontCinN mouseOverCursor" onClick={() => { props.backToRecipe() }}>Back</i>
                </div>
                <div className='imgContainer'>
                    <img className="mt-0 foodImg holder m-3" src={singleRecipe.picture}></img>
                </div>
                <div>
                    <div className='d-flex  justify-content-between fontCinN'>
                        <h5>{ }</h5>
                    </div>
                    <p>Hello SIngple Pasod</p>
                </div>
            </div>
        </React.Fragment>
    )
}