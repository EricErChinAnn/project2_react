export function getStar(id){
    let x = null;
    let avgRating = null;
    let starRating = null;
    id.map((i, index) => x = x + i.rating)
    let emptyStar = <i className="bi bi-star" style={{ color: "gold" }}></i>
    let filledStar = <i className="bi bi-star-fill" style={{ color: "gold" }}></i>
    if (x) {
        avgRating = x / id.length
        if (avgRating === 5) { starRating = <div>{filledStar} {filledStar} {filledStar} {filledStar} {filledStar}</div> }
        else if (avgRating === 4) { starRating = <div>{filledStar} {filledStar} {filledStar} {filledStar} {emptyStar}</div> }
        else if (avgRating === 3) { starRating = <div>{filledStar} {filledStar} {filledStar} {emptyStar} {emptyStar}</div> }
        else if (avgRating === 2) { starRating = <div>{filledStar} {filledStar} {emptyStar} {emptyStar} {emptyStar}</div> }
        else if (avgRating === 1) { starRating = <div>{filledStar} {emptyStar} {emptyStar} {emptyStar} {emptyStar}</div> }
        else { starRating = <div>{emptyStar} {emptyStar} {emptyStar} {emptyStar} {emptyStar}</div> }
    } else { starRating = <div>{emptyStar} {emptyStar} {emptyStar} {emptyStar} {emptyStar}</div> }

    return (starRating)
}