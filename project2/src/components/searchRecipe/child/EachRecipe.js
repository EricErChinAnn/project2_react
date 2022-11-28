import React from "react";

export default function EachRecipe(props) {
    let x = null;
    let avgRating = null;
    let starRating = null;
    props.recipe.reviewId.map((i, index) => x = x + i.rating)
    if (x) {
        avgRating = x / props.recipe.reviewId.length
        if (avgRating === 5) { starRating = "★★★★★" }
        else if (avgRating === 4) { starRating = "★★★★☆" }
        else if (avgRating === 3) { starRating = "★★★☆☆" }
        else if (avgRating === 2) { starRating = "★★☆☆☆" }
        else if (avgRating === 1) { starRating = "★☆☆☆☆" }
        else { starRating = "☆☆☆☆☆" }
    } else { starRating = "☆☆☆☆☆" }

    return (
        <React.Fragment>
            <div className="card-body">
                <img src="logo192.png" className="card-img" alt="Sample of Food" />
                <div className="card-img-overlay">
                    <h3 className="card-title mb-0 pb-0 fontCinB">{props.recipe.name}</h3>
                    <p className="fontLust">{starRating}</p>

                </div>
            </div>

        </React.Fragment>
    )
}