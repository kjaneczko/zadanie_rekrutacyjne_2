import React, {Component} from 'react'
import {NavLink, Link, withRouter} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Dashboard extends Component {
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
            console.log('Dashboard - DidMount, AppState', AppState);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
        }
    }

    renderUsersList() {
        return (
            <>
                <tr>
                    <td>1</td>
                    <td>Pracownik</td>
                    <td>Testowy</td>
                    <td>Wykładowca</td>
                    <td>
                        <div className="btn-group" role="group">
                            <button id="btnGroupDrop1" type="button" className="btn btn-sm btn-secondary dropdown-toggle"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Akcje
                            </button>
                            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                <a className="dropdown-item" href="#">Szczegóły</a>
                                <a className="dropdown-item" href="#">Edytuj</a>
                                <a className="dropdown-item" href="#">Usuń</a>
                            </div>
                        </div>
                    </td>
                </tr>
            </>
        )
    }

    render() {
        return (
            <div className="container">
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn}/>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Dashboard</h3>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default Dashboard;
