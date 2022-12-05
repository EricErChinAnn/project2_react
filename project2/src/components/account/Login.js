import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import CreateAcc from './child/CreateAcc'

export default function Login(props) {
    if (props.loggedIn) {
        return (
            <React.Fragment>
                <div className="modal fade fontLust" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content ">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 fontCinB" id="exampleModalLabel">Account</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body d-flex justify-content-center">
                                <h5>Welcome To Fantasy Gourmet</h5>
                            </div>
                            <div className="modal-footer d-flex justify-content-center">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                onClick={props.logout}>Log Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 fontCinB" id="exampleModalLabel">Account</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">


                            <ul className="nav nav-tabs justify-content-center fontLust" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
                                        type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Login</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane"
                                        type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Create</button>
                                </li>
                            </ul>
                            <div className="tab-content fontLust" id="myTabContent">
                                <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                    <div className='m-3'>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="Email"
                                                aria-label="Username" aria-describedby="basic-addon1"
                                                value={props.loginEmail} name="loginEmail" onChange={props.updateForm} />
                                        </div>


                                        <div className="input-group mb-3">
                                            <input type="password" className="form-control" placeholder="Password"
                                                aria-label="Username" aria-describedby="basic-addon1"
                                                value={props.loginPassword} name="loginPassword" onChange={props.updateForm} />
                                        </div>
                                        <div className="ps-2 mb-3" id="loginValidate"
                                        style={{display:"none", color:"red"}}>*Incorrect Email or Password</div>
                                        {props.loginCheck()}
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <button type="button" className="btn btn-secondary m-2"
                                            onClick={props.resetLogin}>Reset</button>
                                        <button type="button" id="loginModalToggle" className="btn btn-primary m-2"
                                            onClick={props.login} >Login</button>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                    <CreateAcc props={props} />
                                </div>
                            </div>










                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}