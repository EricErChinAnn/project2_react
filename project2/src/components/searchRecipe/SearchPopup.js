import React from "react";
import "./SearchPopup.css"
// import {validateMinMax} from "../module/Validate"

export default function EachRecipe(props) {
    return (
        <React.Fragment>
            <button type="button" class="btn fontLust searchButton" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i class="bi bi-search"></i> Search Filter
            </button>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5 fontCinB" id="staticBackdropLabel"><i class="bi bi-search"></i> Search Filter</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">



                            <form className="fontLust">
                                <input type="text" className="form-control mb-3" placeholder="Name of Recipe"
                                    value={props.name} name="name" onChange={props.updateForm}></input>

                                <div className="input-group my-3 m-0">
                                    <span className="input-group-text">Food Category</span>
                                    <select className="form-select" id="inputGroupSelect01"
                                        name="category"
                                        value={props.category}
                                        onChange={props.updateForm}
                                    >
                                        <option selected value="">All Category</option>
                                        <option value="Appetizer">Appetizer</option>
                                        <option value="Main">Main</option>
                                        <option value="Dessert and Drinks">Dessert and Drinks</option>
                                    </select>
                                </div>

                                <div className="input-group my-2 m-0">
                                    <span className="input-group-text">Origin Category</span>
                                    <select className="form-select" id="inputGroupSelect02"
                                        name="showGameId"
                                        value={props.showGameId}
                                        onChange={props.updateForm}
                                    >
                                        <option selected value="">All Show/Game</option>
                                        {props.showGameData.map((e) => {
                                            return (
                                                <option key={e._id} value={e._id}>{e.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="d-flex flex-row justify-content-center align-items-center">
                                    <div className="input-group my-2 m-0">
                                        <span className="input-group-text">$</span>
                                        <input class="form-control" type="number" name="estCostMin" min="0" max="100" value={props.estCostMin} onChange={props.updateForm} />
                                    </div>
                                    <div><i class="bi bi-dash"></i></div>
                                    <div className="input-group my-2 m-0">
                                        <span className="input-group-text">$</span>
                                        <input class="form-control" type="number" name="estCostMax" min="0" max="100" placeholder="0.00" value={props.estCostMax} onChange={props.updateForm} />
                                    </div>
                                </div>
                                {props.validateMinMax(props.estCostMin,props.estCostMax)}
                                <div className="validationMinMax">Min Amount cannot be larger then Max Amount</div>
                                <div className="input-group my-2">
                                    <input type="text" className="form-control" placeholder="Search via Ingredient"
                                        name="reqIngredients" onInput={props.updateForm} />
                                </div>

                            </form>





                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={props.resetSearch}>Reset Filter</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={props.callAPIWithSearch}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}