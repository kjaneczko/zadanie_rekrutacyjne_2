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
                {console.log('Dashboard - render, this.state', this.state)}
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn}/>
                <div className="row">
                    <div className="col-md-2">
                        <NavLink to='/add-user' className="btn btn-block btn-primary">Dodaj</NavLink>
                    </div>
                    <div className="col-md-3 offset-4">
                        <select className="form-control">
                            <option value="0">Filtruj stanowiska</option>
                            <option value="1">Wykładowca</option>
                            <option value="2">Pracownik Administracyjny</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Szukaj..."
                                   aria-label="Szukaj..." aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button">&#128269;</button>
                                </div>
                        </div>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>LP</td>
                            <td>Imię</td>
                            <td>Nazwisko</td>
                            <td>Stanowisko</td>
                            <td>{ /* Akcje */ }</td>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderUsersList() }
                    </tbody>
                </table>
                <Footer/>
            </div>
        );
    }
}
export default Dashboard;
