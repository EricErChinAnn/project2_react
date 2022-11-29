import React from "react";

export default function EachRecipe(props) {
    let x = null;
    let avgRating = null;
    let starRating = null;
    props.recipe.reviewId.map((i, index) => x = x + i.rating)
    let emptyStar = <i className="bi bi-star" style={{ color: "gold" }}></i>
    let filledStar = <i className="bi bi-star-fill" style={{ color: "gold" }}></i>
    if (x) {
        avgRating = x / props.recipe.reviewId.length
        if (avgRating === 5) { starRating = <div>{filledStar} {filledStar} {filledStar} {filledStar} {filledStar}</div> }
        else if (avgRating === 4) { starRating = <div>{filledStar} {filledStar} {filledStar} {filledStar} {emptyStar}</div> }
        else if (avgRating === 3) { starRating = <div>{filledStar} {filledStar} {filledStar} {emptyStar} {emptyStar}</div> }
        else if (avgRating === 2) { starRating = <div>{filledStar} {filledStar} {emptyStar} {emptyStar} {emptyStar}</div> }
        else if (avgRating === 1) { starRating = <div>{filledStar} {emptyStar} {emptyStar} {emptyStar} {emptyStar}</div> }
        else { starRating = <div>{emptyStar} {emptyStar} {emptyStar} {emptyStar} {emptyStar}</div> }
    } else { starRating = <div>{emptyStar} {emptyStar} {emptyStar} {emptyStar} {emptyStar}</div> }

    let showGame = null;
    if (props.recipe.showGameId[0].category === "Game") {
        showGame = <i className="bi bi-controller" style={{ fontSize: "1.3rem", color: "#f4eee3" }}></i>
    } else {
        showGame = <i className="bi bi-film" style={{ fontSize: "1.3rem", color: "#f4eee3" }}></i>
    }

    return (
        <React.Fragment>
            <div className="card-body m-0 mouseOverCursor">
                <img src={props.recipe.picture} className="cardFade card-img" alt="Sample of Food" />
                <div className="m-2 card-img-overlay d-flex flex-column justify-content-between">
                    <div>
                        <div className="d-flex justify-content-between align-content-center">
                            <h3 className="card-title mb-0 pb-0 fontCinB" style={{ color: "#f4eee3" }}>{props.recipe.name}</h3>
                            <p className="pe-1" style={{ color: "#f4eee3" }}>{showGame}</p>
                        </div>
                        <p className="fontLust">{starRating}</p>
                    </div>
                    <div>
                        <div className="d-flex flex-column flex-wrap">
                        <p className="fontCinN mb-0" style={{ fontSize: "12px",color: "#f4eee3" }}>{props.recipe.category}</p>
                        <p className="fontLust" style={{ fontSize: "9px",color: "#f4eee3" }}>Estimated Cost: ${props.recipe.estCost.toFixed(2)}</p>
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