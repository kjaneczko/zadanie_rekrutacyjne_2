import React, {Component} from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';

class E404 extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {}
        }
    }

    componentWillMount() {
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
                <h1 className="text-center">Error 404 - Page Not Found</h1>
                <Footer/>
            </div>
        )
    }
}

export default E404;
