import React, {Component} from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {Redirect} from "react-router-dom";

class RemoveUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {},
            userId: null,
            redirect: null
        }
    }

    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            AppState.userId = this.props.location.query && this.props.location.query.id ? this.props.location.query.id : null;
            if (!AppState.userId) {
                // return this.props.history.push({pathname: '/users'});
            }
            this.setState({
                isLoggedIn: AppState.isLoggedIn,
                user: AppState.user,
                userId: AppState.userId
            });
        }
    }

    render() {
        return (
            <div className="container">
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn}/>
                <h1>Remove</h1>
                <Footer/>
            </div>
        )
    }
}

export default RemoveUser;
