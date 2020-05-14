import React, {Component} from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {}
        }
    }
    // check if user is authenticated and storing authentication data as states if true
    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            console.log('Dashboard - DidMount, AppState', AppState);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
        }
    }

    render() {
        return (
            <div className="container">
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn}/>
                <h3>My profile</h3>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th scope="row ">User Id</th>
                            <td>{this.state.user.id}</td>
                        </tr>
                        <tr>
                            <th scope="row ">Full Name</th>
                            <td>{this.state.user.name}</td>
                        </tr>
                        <tr>
                            <th scope="row ">Email</th>
                            <td>{this.state.user.email}</td>
                        </tr>
                    </tbody>
                </table>
                <Footer/>
            </div>
        );
    }
}
export default Home;
