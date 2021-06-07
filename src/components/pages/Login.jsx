import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import axios from "axios";
import { connect } from 'react-redux';
import { login } from '../../redux/actions/loginAction';
import ErrorModal from '../widgets/ErrorModal';

const api = axios.create({
    baseURL: "http://localhost:8080/authenticate"
})

class Login extends Component {

    constructor(){
        super();
        this.state = {
            username : "",
            password : "",
            isWrongCredentials: false,
            isErrorModalOpen: false
        }
    }

    async loginUser(username, password){
        try{
            const credentials={
                username: username,
                password: password
            }
            const res = await api.post('', credentials);
            if(res.status === 200){
                const jwtToken = res.data
                this.props.login(username, jwtToken)
                this.props.history.push(`/`);
            }else{
                this.setState({isWrongCredentials:true})
            }

        }catch(e){
            if(e.response){
                if(e.response.status === 403){
                    this.setState({isWrongCredentials:true})
                }else{
                    this.setState({isErrorModalOpen:true})
                }
            }else{
                this.setState({isErrorModalOpen:true})
            }
        }
    }

    render() {
        const onUsernameInputValueChangeHandler = (e) => {
            this.setState({username: e.target.value})
        }
    
        const onPasswordInputValueChangeHandler = (e) => {
            this.setState({password: e.target.value})
        }
    
        const onLoginButtonClickHandler = (e) => {
            this.loginUser(this.state.username, this.state.password)
    
        }
    
        const errorModalCloseHandler = () => {
            this.setState({isErrorModalOpen:false})
        }

        return (
            <div className="bg-default">
                <nav
                id="navbar-main"
                className="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light"
                >
                    <div className="container">
                        <a className="navbar-brand" href="dashboard.html">
                            <img src="../assets/img/brand/white.png" alt="" />
                        </a>
                        <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbar-collapse"
                        aria-controls="navbar-collapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                        className="navbar-collapse navbar-custom-collapse collapse"
                        id="navbar-collapse"
                        >
                            <div className="navbar-collapse-header">
                                <div className="row">
                                    <div className="col-6 collapse-brand">
                                        <a href="dashboard.html">
                                            <img src="../assets/img/brand/blue.png" alt="" />
                                        </a>
                                    </div>
                                    <div className="col-6 collapse-close">
                                        <button
                                        type="button"
                                        className="navbar-toggler"
                                        data-toggle="collapse"
                                        data-target="#navbar-collapse"
                                        aria-controls="navbar-collapse"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                        >
                                            <span></span>
                                            <span></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                <a href="dashboard.html" className="nav-link">
                                    <span className="nav-link-inner--text">Dashboard</span>
                                </a>
                                </li>
                                <li className="nav-item">
                                <a href="login.html" className="nav-link">
                                    <span className="nav-link-inner--text">Login</span>
                                </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* <!-- Main content --> */}
                <div className="main-content">
                    {/* <!-- Header --> */}
                    <div className="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
                        <div className="container">
                            <div className="header-body text-center mb-7">
                                <div className="row justify-content-center">
                                    <div className="col-xl-5 col-lg-6 col-md-8 px-5">
                                        <h1 className="text-white">Welcome!</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="separator separator-bottom separator-skew zindex-100">
                            <svg
                                x="0"
                                y="0"
                                viewBox="0 0 2560 100"
                                preserveAspectRatio="none"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <polygon
                                className="fill-default"
                                points="2560 0 2560 100 0 100"
                                ></polygon>
                            </svg>
                        </div>
                    </div>
                    {/* <!-- Page content --> */}
                    <div className="container mt--8 pb-5">
                        <ErrorModal 
                            show={this.state.isErrorModalOpen} 
                            closeHandler={errorModalCloseHandler}
                            closeButtonTitle="close"
                            errorTitle="Error"
                            errorText={"An error occured while logging in!"}
                        />
                        <div className="row justify-content-center">
                            <div className="col-lg-5 col-md-7">
                                <div className="card bg-secondary border-0 mb-0">
                                    <div className="card-body px-lg-5 py-lg-5">
                                        {this.state.isWrongCredentials &&
                                            <div className="text-center text-muted mb-4">
                                                <small className="text-danger">Wrong credentials!</small>
                                            </div>
                                        }
                                        {!this.state.isWrongCredentials &&
                                            <div className="text-center text-muted mb-4">
                                                <small>Login with credentials</small>
                                            </div>
                                        }
                                        <form>
                                            <div className="form-group mb-3">
                                                <div
                                                className="input-group input-group-merge input-group-alternative"
                                                >
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"
                                                    ><i className="fa fa-user"></i
                                                    ></span>
                                                </div>
                                                <input
                                                    className="form-control"
                                                    placeholder="Username"
                                                    type="text"
                                                    onChange={onUsernameInputValueChangeHandler}
                                                    value={this.state.username}
                                                />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div
                                                className="input-group input-group-merge input-group-alternative"
                                                >
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-unlock-alt"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    className="form-control"
                                                    placeholder="Password"
                                                    type="password"
                                                    onChange={onPasswordInputValueChangeHandler}
                                                    value={this.state.password}
                                                />
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="button" className="btn btn-primary my-4" onClick={onLoginButtonClickHandler}>
                                                    Login
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="py-5" id="footer-main">
                    <div className="container">
                        <div className="row align-items-center justify-content-xl-between">
                            <div className="col-xl-6">
                                <div className="copyright text-center text-xl-left text-muted">
                                    &copy; 2020
                                    <a href="https://www.creative-tim.com"
                                        className="font-weight-bold ml-1"
                                        target="_blank"
                                        rel="noreferrer">Creative Tim</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    user: state.login.user
})

export default connect(mapStateToProps, { login })(withRouter(Login));