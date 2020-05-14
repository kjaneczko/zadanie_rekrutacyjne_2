import React, {Component} from 'react';
import LoginController from '../controllers/LoginController';
import {withRouter} from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: props.location,
        };
    }

    render() {
        return (
            <div className="container">
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn}/>
                <LoginController redirect={this.state.redirect} />
                <Footer/>
            </div>
        )
    }
}
export default withRouter(Login);
