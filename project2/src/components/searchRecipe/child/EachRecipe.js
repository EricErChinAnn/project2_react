import React from "react";
import {getStar} from "../../module/GetStar" 
import { getShowGameIcon } from "../../module/GetShowGame";

export default function EachRecipe(props) {
    let starRating = getStar(props.recipe.reviewId)

    return (
        <React.Fragment>
            <div className="card-body m-0 mouseOverCursor">
                <img src={props.recipe.picture} className="cardFade card-img" alt="Sample of Food" />
                <div className="m-2 card-img-overlay d-flex flex-column justify-content-between">
                    <div>
                        <div className="d-flex justify-content-between align-content-center">
                            <h3 className="card-title mb-0 pb-0 fontCinB" style={{ color: "#f4eee3" }}>{props.recipe.name}</h3>
                            <p className="pe-1" style={{ color: "#f4eee3", fontSize: "1.3rem"}}>{getShowGameIcon(props.recipe.showGameId)}</p>
                        </div>
                        <p className="fontLust text-center">{starRating}</p>
                    </div>
                    <div>
                        <div className="d-flex flex-column flex-wrap d-flex justify-content-start">
                            <p className="fontCinN mb-0" style={{ fontSize: "12px", color: "#f4eee3" }}>{props.recipe.category}</p>
                            <p className="fontLust mb-1" style={{ fontSize: "9px", color: "#f4eee3" }}>Estimated Cost: ${props.recipe.estCost.toFixed(2)}</p>
                        </div>
                        <div className="d-flex flex-row flex-wrap">{props.recipe.foodTags.map((e, i) => {
                            return (
                                <p className="my-1 mx-1 px-3 rounded-pill fontLust" key={i} style={{ fontSize: "0.8rem", color: "#f4eee3", backgroundColor: "#886443" }}>{e.name}</p>
                            )
                        })}
                        </div></div>
                </div>
            </div>
        </React.Fragment>
    )
}