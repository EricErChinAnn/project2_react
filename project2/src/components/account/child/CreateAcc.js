import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "./CreateAcc.css"

export default function CreateAcc(props) {


    if (!props.props.createdAcc) {
        return (
            <React.Fragment>
                <div className='d-flex flex-column justify-content-center'>
                    <div className="input-group my-3">
                        <input type="text" className="form-control" maxLength={"20"} minLength={"3"}
                            placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" required
                            value={props.props.nameNewAcc} name="nameNewAcc" onChange={props.props.updateForm} />
                    </div>

                    <div className="input-group mb-3">
                        <input type="email" className="form-control" required
                            placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"
                            value={props.props.emailNewAcc} name="emailNewAcc" onChange={props.props.updateForm} />
                    </div>
                    <div className='fontLust ms-2 createAccEmail'>
                        <p style={{ color: "red", fontSize: "15px", display: "none" }}>*Please enter a valid Email</p>
                    </div>

                    <div className="input-group d-flex justify-content-center mb-3">
                        <span className="input-group-text">Date of Birth</span>
                        <input type="date" className="form-control" required
                            max={new Date().toISOString().split("T")[0]}
                            value={props.props.dobNewAcc} name="dobNewAcc" onChange={props.props.updateForm} />
                    </div>

                    <div className="input-group mb-3">
                        <input type="password" className="form-control" required minLength={"8"}
                            placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"
                            value={props.props.passwordNewAcc} name="passwordNewAcc"
                            onChange={props.props.updateForm} />
                    </div>

                    <div className='d-flex justify-content-center'>
                        <button type="button" className="btn btn-secondary m-2"
                            onClick={props.props.resetCreateAccount}
                        >Reset</button>
                        <button type="button" className="btn btn-primary m-2"
                            onClick={props.props.createNewAcc}
                        >Create</button>
                    </div>
                </div>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <div className='d-flex flex-column justify-content-center'>
                <div className='d-flex justify-content-center mt-3'>
                    <h5 style={{color:"green"}}>Account Created</h5>
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Email"
                        aria-label="Username" aria-describedby="basic-addon1"
                        value={props.props.loginEmail} readOnly name="loginEmail" />
                </div>

                <div className="input-group mb-3">
                    <input type="password" className="form-control" placeholder="Password"
                        aria-label="Username" aria-describedby="basic-addon1"
                        value={props.props.loginPassword} readOnly name="loginPassword" />
                </div>

                <div className='d-flex justify-content-center'>
                    <button type="button" className="btn btn-primary m-2"
                        onClick={props.props.login} data-bs-dismiss="modal">Login</button>
                </div>
                </div>
            </React.Fragment>
        )
    }
}