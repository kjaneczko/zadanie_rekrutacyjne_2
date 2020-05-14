import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {}
        };
    }

    logOut() {
        localStorage["appState"] = JSON.stringify(this.state);
        return <Redirect to='/login' />
    }

    render() {
        return (
            <div className="container">
                {this.logOut()}
            </div>
        );
    }
}
export default withRouter(Logout);
