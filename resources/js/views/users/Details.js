import React, {Component} from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';

class UserDetails extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {}
        }
    }

    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
        }
    }

    render() {
        return (
            <div>
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn}/>
                <h1>Details</h1>
                <Footer/>
            </div>
        )
    }
}

export default UserDetails;
