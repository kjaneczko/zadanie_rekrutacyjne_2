import React, {Component} from 'react'
import {NavLink, Link, withRouter} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Users extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {},
            data: null
        }
    }

    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            console.log('Users - DidMount, AppState', AppState);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
            this.fetchUsers(AppState);
        }
    }

    fetchUsers(AppState) {
        axios.get(
            "/api/auth/fetch_users",
            {
                headers: {
                    Authorization: 'Bearer ' + AppState.user.access_token
                }
            })
            .then(response => {
                console.log('success', response.data);
                if (response.data.success) {
                    this.setState({data: response.data.users});
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

    renderUsersList(user, index) {
        console.log('renderUsersList', user, index);
        let rowNumber = (this.state.data.current_page * this.state.data.per_page) - this.state.data.per_page + index + 1;
        return (
            <tr key={rowNumber}>
                <td>{rowNumber}</td>
                <td>{user.name}</td>
                <td>{user.last_name}</td>
                <td>
                    {user.positions.map((position) => (<span className="badge badge-pill badge-primary">{position.name.name}</span>))}
                </td>
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
        )
    }

    handlePageClick(data) {
        console.log('handlePageClick', data);
        this.fetchUsers(this.state);
    }

    render() {
        return (
            <div className="container">
                {console.log('Users - render, this.state', this.state)}
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
                        {this.state.data ? this.state.data.data.map((user, index) => (
                            this.renderUsersList(user, index)
                        )) : <tr></tr>}
                    </tbody>
                </table>
                {this.state.data ?
                    <nav aria-label="Page navigation">
                        <ReactPaginate
                            pageCount={this.state.data.last_page}
                            initialPage={this.state.data.current_page - 1}
                            forcePage={this.state.current_page - 1}
                            pageRangeDisplayed={4}
                            marginPagesDisplayed={2}
                            previousLabel="&#x276E;"
                            nextLabel="&#x276F;"
                            containerClassName="pagination"
                            activeClassName="active"
                            disabledClassName="disabled"
                            onPageChange={this.handlePageClick}
                            disableInitialCallback={true}
                        />
                    </nav>
                    : ''
                }
                <Footer/>
            </div>
        );
    }
}
export default Users;
