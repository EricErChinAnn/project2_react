function getShowGameIcon(id){
    let showGame = null;
    if (id[0].category === "Game") {
        showGame = <i className="bi bi-controller" ></i>
    } else {
        showGame = <i className="bi bi-film"></i>
    }

    return showGame
}

function getShowGameIconClean(id){
    let showGame = null;
    if (id.category === "Game") {
        showGame = <i className="bi bi-controller" ></i>
    } else {
        showGame = <i className="bi bi-film"></i>
    }

    return showGame
}

export {getShowGameIcon , getShowGameIconClean}