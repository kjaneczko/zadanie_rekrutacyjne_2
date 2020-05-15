import React, {Component} from 'react'
import {Redirect, withRouter} from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

class UserDetails extends Component {
    constructor(props) {
        super(props);
        console.log('UserDetails', props);
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
            if(!AppState.userId) {
                return this.props.history.push({ pathname: '/users' });
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

    renderAddress(address) {
        return (
            <>
                <b>Ulica</b><br/>
                {`${address.street} ${address.house_number}`} {address.apartment_number.length > 0 ? address.apartment_number : ''}<br/>
                <b>Kod pocztowy</b><br/>
                {address.zip_code}<br/>
                <b>Miasto</b><br/>
                {address.city}<br/>
                <b>Województwo</b><br/>
                {address.voivodeship}
            </>
        );
    }

    renderEducation() {
        let education = this.state.userDetails.education.map((education, index) => (
            <tr key={index}>
                <td key={Math.random()}>{education.year_of_graduation}</td>
                <td key={Math.random()}>{education.university}</td>
                <td key={Math.random()}>{education.field_of_study}</td>
            </tr>
        ));
        console.log(education);
        return (
            <table className="table table-hover">
                <tbody>
                    {education}
                </tbody>
            </table>
        )
    }

    renderView() {
        let addressComponent = null;
        let correspondenceAddressComponent = null;
        this.state.userDetails.address.forEach((address) => {
            if(address.address_type_id === 1) {
                addressComponent = this.renderAddress(address);
            }
            else {
                correspondenceAddressComponent = this.renderAddress(address);
            }
        });
        return (
            <>
                <h3 className="text-center">{`${this.state.userDetails.name} ${this.state.userDetails.last_name}`}</h3>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <b>Imię</b><br/>
                        {this.state.userDetails.name}<br/>
                        <b>Nazwisko</b><br/>
                        {this.state.userDetails.last_name}<br/>
                        <b>Email</b><br/>
                        {this.state.userDetails.email}<br/>
                        <b>Telefon</b><br/>
                        {this.state.userDetails.phone}
                    </div>
                    <div className="col-md-6">
                        <b>Stanowisko</b><br/>
                        <ul>
                            {this.state.userDetails.positions.map((position, index) => (
                                <li key={index}>{position.name.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <b>Adres zamieszkania</b><br/>
                        {addressComponent}
                    </div>
                    <div className="col-md-6">
                        <b>Adres korespondencyjny</b><br/>
                        {correspondenceAddressComponent ? correspondenceAddressComponent : addressComponent}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <b>Wykształcenie</b>
                        {this.renderEducation()}
                    </div>
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="container">
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} />
                {this.state.userDetails ? this.renderView() : ''}
                <Footer/>
            </div>
        )
    }
}

export default UserDetails;
