import React, {Component} from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {Redirect} from "react-router-dom";

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {},
            userId: null,
            redirect: null,
            userDetails: null
        }
    }

    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            AppState.userId = this.props.location.query && this.props.location.query.id ? this.props.location.query.id : null;
            if (!AppState.userId) {
                return this.props.history.push({pathname: '/users'});
            }
            this.setState({
                isLoggedIn: AppState.isLoggedIn,
                user: AppState.user,
                userId: AppState.userId
            });
            this.fetchData(AppState);
        }
    }

    fetchData(AppState) {
        console.log('AppState', AppState);
        axios.get(
            `/api/auth/user/show/${AppState.userId}`,
            {
                headers: {
                    Authorization: 'Bearer ' + AppState.user.access_token
                }
            })
            .then(response => {
                console.log('success', response.data);
                if (response.data.success) {
                    this.setState({userDetails: response.data.data});
                }
                else {
                    alert(`Our System Failed To Fetch Data!`);
                }
                return response;
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    render() {
        return (
            <div className="container">
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn}/>
                <h1>Edit</h1>
                <Footer/>
            </div>
        )
    }
}

export default EditUser;
