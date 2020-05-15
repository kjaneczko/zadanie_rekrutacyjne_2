import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {validateEmail, validatePassword, validatePhoneNumber} from '../../functions';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {},
            redirect: false,
            formSubmitting: false,
            positionForm: null,
            receivedErrors: null,
            errors: {
                // name: true,
                // lastName: true,
                // email: true,
                // positions: true,
                // password: [ "co najmniej jedną cyfrę", "co najmniej jedną małą literę", "co najmniej jedną dużą literę", "co najmniej jeden znak specjalny", "co najmniej 8 znaków" ],
                // confirmPassword: false,
                main: {
                    name: false,
                    lastName: false,
                    email: false,
                    positions: false,
                    password: [],
                    confirmPassword: false
                },
                teacher: {
                    phone: false,
                    education: false
                },
                administrativeWorker: {
                    address: {
                        street: false,
                        houseNumber: false,
                        zipCode: false,
                        city: false,
                        voivodeship: false
                    },
                    correspondenceAddress: {
                        street: false,
                        houseNumber: false,
                        zipCode: false,
                        city: false,
                        voivodeship: false
                    }
                }
            },
            newUserData: {
                name: 'Kacper',
                lastName: 'Janeczko',
                email: 'kontakt@kacperjaneczko.pl',
                password: '1qaZXsw2@',
                confirmPassword: '1qaZXsw2@',
                positions: ["1", "2"],
                phone: '+48 791 001 001',
                education: {
                    0: {
                        universityName: 'UP w Poznaniu',
                        fieldOfStudy: 'melioracja',
                        yearOfGraduation: '2019'
                    },
                    1: {
                        universityName: 'UAM w Poznaniu',
                        fieldOfStudy: 'gleboznastwo',
                        yearOfGraduation: '2017'
                    },
                    nextId: 2
                },
                address: {
                    street: 'Krakowska',
                    houseNumber: '1',
                    apartmentNumber: '3',
                    zipCode: '48900',
                    city: 'Opole',
                    voivodeship: 'opolskie'
                },
                correspondenceAddressLikeResidential: true,
                correspondenceAddress: {
                    street: 'Krakowska',
                    houseNumber: '1',
                    apartmentNumber: '3',
                    zipCode: '48900',
                    city: 'Opole',
                    voivodeship: 'opolskie'
                }
            }
        };
        this.handleCancelButton = this.handleCancelButton.bind(this);
        this.handlePrevStepButton = this.handlePrevStepButton.bind(this);
        this.handleNextStepButton = this.handleNextStepButton.bind(this);
        this.handleAddEducationButton = this.handleAddEducationButton.bind(this);
        this.handleSubmitButton = this.handleSubmitButton.bind(this);
        this.handleRemoveEducation = this.handleRemoveEducation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEducationChange = this.handleEducationChange.bind(this);
        this.handleCorrespondenceAddressLikeResidentialCheckbox = this.handleCorrespondenceAddressLikeResidentialCheckbox.bind(this);
    }

    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
        }
    }

    checkErrors() {
        let stateErrors = this.state.errors;
        let positionForm = this.state.positionForm;
        const newUserData = this.state.newUserData;
        let form = null;
        switch (newUserData.positions[positionForm]) {
            case "1":
                form = 'teacher';
                break;
            case "2":
                form = 'administrativeWorker';
                break;
            default:
                form = 'main';
                break;
        }
        let errors = Object.keys(stateErrors[form]).filter(function(fieldKey) {
            if((!Array.isArray(stateErrors[form][fieldKey]) && stateErrors[form][fieldKey]) || (Array.isArray(stateErrors[form][fieldKey]) && stateErrors[form][fieldKey].length > 0)) {
                if(['address', 'correspondenceAddress'].includes(fieldKey)) {
                    let addressErrors = Object.keys(stateErrors[form][fieldKey]).filter(function(addressField) {
                        return stateErrors[form][fieldKey][addressField];
                    });
                    if(addressErrors.length > 0) {
                        return true;
                    }
                }
                else if(stateErrors[form][fieldKey].length > 0) {
                    return true;
                }
                return false;
            }
            return false;
        });
        return errors;
    }

    handleChange(event) {
        const newUserData = this.state.newUserData;
        // changes
        if(event.target.name === 'positions') {
            let newArray = newUserData[event.target.name];
            if(newUserData[event.target.name].indexOf(event.target.value) === -1) {
                newArray.push(event.target.value);
            }
            else {
                newArray = newUserData[event.target.name].filter(function(position) {
                    return position != event.target.value;
                });
            }
            newArray.sort();
            newUserData[event.target.name] = newArray;
        }
        else if(['universityName', 'fieldOfStudy', 'yearOfGraduation'].includes(event.target.name)) {
            newUserData.education[event.target.dataset['index']][event.target.name] = event.target.value;
        }
        else if(['street', 'houseNumber', 'apartmentNumber', 'zipCode', 'city', 'voivodeship'].includes(event.target.name)) {
            newUserData[event.target.dataset['type']][event.target.name] = event.target.value;
            if(newUserData.correspondenceAddressLikeResidential) {
                newUserData.correspondenceAddress[event.target.name] = event.target.value;
            }
        }
        else {
            newUserData[event.target.name] = event.target.value;
        }
        // validation
        const errors = this.state.errors;
        if(event.target.name === 'name') {
            errors.main.name = newUserData[event.target.name].length > 0 ? false : true;
        }
        else if(event.target.name === 'lastName') {
            errors.main.lastName = newUserData[event.target.name].length > 0 ? false : true;
        }
        else if(event.target.name === 'positions') {
            errors.main.positions = newUserData.positions.length > 0 ? false : true;
        }
        else if(event.target.name === 'email') {
            errors.main.email = !validateEmail(event.target.value);
        }
        else if(event.target.name === 'password') {
            errors.main.password = validatePassword(event.target.value);
            errors.main.confirmPassword = newUserData.password != newUserData.confirmPassword ? true : false;
        }
        else if(event.target.name === 'confirmPassword') {
            errors.main.confirmPassword = newUserData.password != newUserData.confirmPassword ? true : false;
        }
        else if(event.target.name === 'phone') {
            errors.teacher.phone = !validatePhoneNumber(event.target.value);
        }
        else if(['universityName', 'fieldOfStudy', 'yearOfGraduation'].includes(event.target.name)) {
            errors.teacher.education = Object.keys(newUserData.education).length === 1 ? true : false;
        }
        else if(['street', 'houseNumber', 'apartmentNumber', 'zipCode', 'city', 'voivodeship'].includes(event.target.name)) {
            errors.administrativeWorker[event.target.dataset['type']][event.target.name] = newUserData[event.target.dataset['type']][event.target.name] === '' ? true : false;
            if(newUserData.correspondenceAddressLikeResidential) {
                errors.administrativeWorker.correspondenceAddress[event.target.name] = errors.administrativeWorker.address[event.target.name];
            }
        }
        // update state
        this.setState({
            errors: errors,
            newUserData: newUserData
        });
    }

    handleEducationChange(event) {
        console.log('handleEducationChange', event.target);
        let newUserData = this.state.newUserData;
        newUserData.education[event.target.dataset['index']][event.target.name] = event.target.value;
        this.setState({
            newUserData: newUserData
        });
    }

    handleCancelButton() {
        console.log('handleCancelButton');
        this.props.history.push('/dashboard/');
        // return  <Redirect to="/dashboard" />
    }

    handlePrevStepButton() {
        console.log('handlePrevStepButton');
        const prevStep = this.state.positionForm;
        this.setState({
            positionForm: prevStep === 0 ? null : prevStep - 1
        });
    }

    handleNextStepButton() {
        let errors = this.checkErrors();
        console.log('handleNextStepButton');
        console.log('error.length', errors.length);
        if(errors.length === 0) {
            const prevStep = this.state.positionForm;
            this.setState({
                positionForm: prevStep === null ? 0 : prevStep + 1
            });
        }
    }

    handleSubmitButton() {
        console.log('handleSubmitButton');
        let errors = this.checkErrors();
        if(errors.length === 0) {
            console.log('SUBMIT');
            let userData = this.state.user;
            let newUserData = this.state.newUserData;
            axios.post(
                "/api/auth/add_user",
                {...userData, newUserData: newUserData},
                {
                    dataType: 'json',
                    headers: {
                        Authorization: 'Bearer ' + userData.access_token
                    }
                })
            .then(response => {
                console.log('response', response);
                console.log('success', response.data.success);
                if (response.data.success) {
                    this.setState({
                        receivedErrors: null,
                        redirect: '/users'
                    });
                }
                return response;
            })
            .catch(error => {
                if(error.response) {
                    this.setState({receivedErrors: error.response.data.message});
                }
            });
        }
    }

    handleAddEducationButton() {
        console.log('handleAddEducationButton');
        let newUserData = this.state.newUserData;
        let errors = this.state.errors;
        errors.teacher.education = false;
        newUserData.education[newUserData.education.nextId] = {
            universityName: '',
            fieldOfStudy: '',
            yearOfGraduation: ''
        };
        newUserData.education.nextId += 1;
        this.setState({
            newUserData: newUserData,
            errors: errors
        });
    }

    handleRemoveEducation(event) {
        console.log('handleRemoveEducation');
        let newUserData = this.state.newUserData;
        let newEducation = {};
        let errors = this.state.errors;
        Object.keys(newUserData.education).map(function(key){
            if(event.target.dataset['index'] !== key) {
                console.log('return ' + key);
                newEducation[key] = newUserData.education[key];
            }
        });
        newUserData.education = newEducation;
        if(Object.keys(newEducation).length === 1) {
            errors.teacher.education = true;
        }
        this.setState({
            newUserData: newUserData,
            errors: errors
        })
    }

    handleCorrespondenceAddressLikeResidentialCheckbox() {
        const newUserData = this.state.newUserData;
        newUserData.correspondenceAddressLikeResidential = !newUserData.correspondenceAddressLikeResidential;
        const errors = this.state.errors;
        if(newUserData.correspondenceAddressLikeResidential) {
            newUserData.correspondenceAddress = { ...newUserData.address };
            errors.administrativeWorker.correspondenceAddress = { ...errors.administrativeWorker.address };
        }
        this.setState({
            newUserData: newUserData,
            errors: errors
        });
    }

    renderEducationTable(index) {
        console.log('renderEducationTable - index', index);
        if(Number.isInteger(parseInt(index))) {
            return (
                <tr key={index} id={"education" + (index)}>
                    <td style={{width: '5%'}}>
                        <button className="btn btn btn-outline-danger"
                                data-index={index}
                                onClick={this.handleRemoveEducation}
                        >x</button>
                    </td>
                    <td style={{width: '40%'}}>
                        <input
                            className="form-control"
                            type="text"
                            name="universityName"
                            placeholder="Nazwa uczelni"
                            value={this.state.newUserData.education[index].universityName}
                            data-index={index}
                            onChange={this.handleChange} />
                    </td>
                    <td style={{width: '40%'}}>
                        <input className="form-control"
                               type="text"
                               name="fieldOfStudy"
                               placeholder="Stopień"
                               value={this.state.newUserData.education[index].fieldOfStudy}
                               data-index={index}
                               onChange={this.handleChange} />
                    </td>
                    <td style={{width: '20%'}}>
                        <input className="form-control"
                               type="number"
                               name="yearOfGraduation"
                               placeholder="Rok ukończ."
                               value={this.state.newUserData.education[index].yearOfGraduation}
                               data-index={index}
                               onChange={this.handleChange}
                               min="1940"
                               max={new Date().getFullYear()} />
                    </td>
                </tr>
            );
        }
    }

    renderButtons() {
        return (
            <div className="form-group row">
                {this.state.positionForm === null ?
                    <div className="col-md-4">
                        <button className="btn btn-block btn-outline-danger" onClick={this.handleCancelButton}>Anuluj</button>
                    </div>
                    :
                    <div className="col-md-4">
                        <button className="btn btn-block btn-outline-primary" onClick={this.handlePrevStepButton}>Wstecz</button>
                    </div>
                }
                {this.state.positionForm !== null && this.state.positionForm === (this.state.newUserData.positions.length - 1) ?
                    <div className="col-md-4 offset-md-4">
                        <button className="btn btn-block btn-outline-success" onClick={this.handleSubmitButton}>Zapisz</button>
                    </div>
                    :
                    <div className="col-md-4 offset-md-4">
                        <button className="btn btn-block btn-outline-primary" onClick={this.handleNextStepButton}>Dalej</button>
                    </div>
                }
            </div>
        )
    }

    renderMainFrom() {
        return (
            <>
                <div className="form-group">
                    <input className={"form-control " + (this.state.errors.main.name ? 'is-invalid' : '') } type="text" name="name" placeholder="Imię" value={this.state.newUserData.name} onChange={this.handleChange} />
                    {this.state.errors.main.name ? <p className="text-danger">Pole jest wymagane!</p> : '' }
                </div>
                <div className="form-group">
                    <input className={"form-control " + (this.state.errors.main.lastName ? 'is-invalid' : '') } type="text" name="lastName" placeholder="Nazwisko" value={this.state.newUserData.lastName} onChange={this.handleChange} />
                    {this.state.errors.main.lastName ? <p className="text-danger">Pole jest wymagane!</p> : '' }
                </div>
                <div className="form-group">
                    <input className={"form-control " + (this.state.errors.main.email ? 'is-invalid' : '') } type="email" name="email" placeholder="Email" value={this.state.newUserData.email} onChange={this.handleChange} />
                    {this.state.errors.main.email ? <p className="text-danger">Proszę podać poprawny email!</p> : '' }
                </div>
                <div className="form-group">
                    <input className={"form-control " + (this.state.errors.main.password.length > 0 ? 'is-invalid' : '') } type="password" name="password" placeholder="Hasło" value={this.state.newUserData.password} onChange={this.handleChange} />
                    {this.state.errors.main.password.length > 0 ?
                        <div className="text-danger">
                            Hasło musi zawierać:<br/>
                            <ul>
                                {this.state.errors.main.password.map((error, index) => {
                                    return <li key={index}>{error}</li>
                                })}
                            </ul>
                        </div>
                    : '' }
                </div>
                <div className="form-group">
                    <input className={"form-control " + (this.state.errors.main.confirmPassword ? 'is-invalid' : '') } type="password" name="confirmPassword" placeholder="Powtórz hasło" value={this.state.newUserData.confirmPassword} onChange={this.handleChange} />
                    {this.state.errors.main.confirmPassword ? <p className="text-danger">Hasła nie pasują do siebie!</p> : '' }
                </div>
                <div className="form-group">
                    <h4>Stanowisko:</h4>
                    <input type="checkbox" name="positions" value="1" id="position1" onChange={this.handleChange} checked={this.state.newUserData.positions.indexOf('1') != -1 ? true : false} /><label htmlFor="position1">Wykładowca</label><br/>
                    <input type="checkbox" name="positions" value="2" id="position2" onChange={this.handleChange} checked={this.state.newUserData.positions.indexOf('2') != -1 ? true : false} /><label htmlFor="position2">Pracownik administracyjny</label>
                    {this.state.errors.main.positions ? <p className="text-danger">Proszę wybrać stanowisko!</p> : '' }
                </div>
                {this.renderButtons()}
            </>
        );
    }

    renderTeacherDataForm() {
        return (
            <>
                <div className="form-group">
                    <input className={"form-control " + (this.state.errors.teacher.phone ? 'is-invalid' : '') } type="text" name="phone" placeholder="Numer telefonu" value={this.state.newUserData.phone} onChange={this.handleChange} />
                    {this.state.errors.teacher.phone ? <p className="text-danger">Pole jest wymagane!</p> : '' }
                </div>
                <div className="form-group">
                    <h4>Wykształcenie: <button className="btn btn-sm btn-outline-primary" onClick={this.handleAddEducationButton}>+</button></h4>
                    {this.state.errors.teacher.education ? <p className="text-danger">Te informacje są wymagane!</p> : '' }
                    <table className="table table-hover">
                        <tbody id="education">
                            {Object.keys(this.state.newUserData.education).map((index) => this.renderEducationTable(index))}
                        </tbody>
                    </table>
                </div>
                {this.renderButtons()}
            </>
        );
    }

    renderAddressForm() {
        return (
            <>
                <h4>Adres zamieszkania:</h4>
                <div className="form-group row">
                    <div className="col-xs-12 col-md-6">
                        <input className={"form-control " + (this.state.errors.administrativeWorker.address.street ? 'is-invalid' : '') }
                               type="text"
                               name="street"
                               placeholder="Ulica"
                               value={this.state.newUserData.address.street}
                               data-type="address"
                               onChange={this.handleChange} />
                        {this.state.errors.administrativeWorker.address.street ? <p className="text-danger">Pole jest wymagane!</p> : '' }
                    </div>
                    <div className="col-xs-12 col-md-3">
                        <input className={"form-control " + (this.state.errors.administrativeWorker.address.houseNumber ? 'is-invalid' : '') }
                               type="text"
                               name="houseNumber"
                               placeholder="Numer domu"
                               value={this.state.newUserData.address.houseNumber}
                               data-type="address"
                               onChange={this.handleChange} />
                        {this.state.errors.administrativeWorker.address.houseNumber ? <p className="text-danger">Pole jest wymagane!</p> : '' }
                    </div>
                    <div className="col-xs-12 col-md-3">
                        <input className="form-control"
                               type="text"
                               name="apartmentNumber"
                               placeholder="Numer mieszkania"
                               value={this.state.newUserData.address.apartmentNumber}
                               data-type="address"
                               onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-xs-12 col-md-4">
                        <input className={"form-control " + (this.state.errors.administrativeWorker.address.zipCode ? 'is-invalid' : '') }
                               type="text"
                               name="zipCode"
                               placeholder="Kod pocztowy"
                               value={this.state.newUserData.address.zipCode}
                               data-type="address"
                               onChange={this.handleChange} />
                        {this.state.errors.administrativeWorker.address.zipCode ? <p className="text-danger">Pole jest wymagane!</p> : '' }
                    </div>
                    <div className="col-xs-12 col-md-8">
                        <input className={"form-control " + (this.state.errors.administrativeWorker.address.city ? 'is-invalid' : '') }
                               type="text"
                               name="city"
                               placeholder="Miasto"
                               value={this.state.newUserData.address.city}
                               data-type="address"
                               onChange={this.handleChange} />
                        {this.state.errors.administrativeWorker.address.city ? <p className="text-danger">Pole jest wymagane!</p> : '' }
                    </div>
                </div>
                <div className="form-group">
                    <input className={"form-control " + (this.state.errors.administrativeWorker.address.voivodeship ? 'is-invalid' : '') }
                           type="text"
                           name="voivodeship"
                           placeholder="Województwo"
                           value={this.state.newUserData.address.voivodeship}
                           data-type="address"
                           onChange={this.handleChange} />
                    {this.state.errors.administrativeWorker.address.voivodeship ? <p className="text-danger">Pole jest wymagane!</p> : '' }
                </div>
                <div className="form-group">
                    <input type="checkbox"
                           id="correspondenceAddressLikeResidentialCheckbox"
                           name="correspondenceAddressLikeResidential"
                           onChange={this.handleCorrespondenceAddressLikeResidentialCheckbox}
                           checked={this.state.newUserData.correspondenceAddressLikeResidential ? true : false} />
                    <label htmlFor="correspondenceAddressLikeResidentialCheckbox">Adres korespondencyjny taki sam jak zamieszkania</label>
                </div>
            </>
        )
    }

    correspondenceAddress() {
        return (
            <>
                <h4>Adres korespondencyjny:</h4>
                <div className="form-group row">
                    <div className="col-xs-12 col-md-6">
                        <input className={"form-control " + (this.state.errors.administrativeWorker.correspondenceAddress.street ? 'is-invalid' : '') }
                               type="text"
                               name="street"
                               placeholder="Ulica"
                               value={this.state.newUserData.correspondenceAddress.street}
                               data-type="correspondenceAddress"
                               onChange={this.handleChange} />
                        {this.state.errors.administrativeWorker.correspondenceAddress.street ? <p className="text-danger">Pole jest wymagane!</p> : '' }
                    </div>
                    <div className="col-xs-12 col-md-3">
                        <input className={"form-control " + (this.state.errors.administrativeWorker.correspondenceAddress.houseNumber ? 'is-invalid' : '') }
                               type="text"
                               name="houseNumber"
                               placeholder="Numer domu"
                               value={this.state.newUserData.correspondenceAddress.houseNumber}
                               data-type="correspondenceAddress"
                               onChange={this.handleChange} />
                        {this.state.errors.administrativeWorker.correspondenceAddress.houseNumber ? <p className="text-danger">Pole jest wymagane!</p> : '' }
                    </div>
                    <div className="col-xs-12 col-md-3">
                        <input className="form-control"
                               type="text"
                               name="apartmentNumber"
                               placeholder="Numer mieszkania"
                               value={this.state.newUserData.correspondenceAddress.apartmentNumber}
                               data-type="correspondenceAddress"
                               onChange={this.handleChange} />
                    </div>

                </div>
                <div className="form-group row">
                    <div className="col-xs-12 col-md-4">
                        <input className={"form-control " + (this.state.errors.administrativeWorker.correspondenceAddress.zipCode ? 'is-invalid' : '') }
                               type="text"
                               name="zipCode"
                               placeholder="Kod pocztowy"
                               value={this.state.newUserData.correspondenceAddress.zipCode}
                               data-type="correspondenceAddress"
                               onChange={this.handleChange} />
                        {this.state.errors.administrativeWorker.correspondenceAddress.zipCode ? <p className="text-danger">Pole jest wymagane!</p> : '' }
                    </div>
                    <div className="col-xs-12 col-md-8">
                        <input className={"form-control " + (this.state.errors.administrativeWorker.correspondenceAddress.city ? 'is-invalid' : '') }
                               type="text"
                               name="city"
                               placeholder="Miasto"
                               value={this.state.newUserData.correspondenceAddress.city}
                               data-type="correspondenceAddress"
                               onChange={this.handleChange} />
                        {this.state.errors.administrativeWorker.correspondenceAddress.city ? <p className="text-danger">Pole jest wymagane!</p> : '' }
                    </div>
                </div>
                <div className="form-group">
                    <input className={"form-control " + (this.state.errors.administrativeWorker.correspondenceAddress.voivodeship ? 'is-invalid' : '') }
                           type="text"
                           name="voivodeship"
                           placeholder="Województwo"
                           value={this.state.newUserData.correspondenceAddress.voivodeship}
                           data-type="correspondenceAddress"
                           onChange={this.handleChange} />
                    {this.state.errors.administrativeWorker.correspondenceAddress.voivodeship ? <p className="text-danger">Pole jest wymagane!</p> : '' }
                </div>
            </>
        )
    }

    renderAdministrativeWorkerDataForm() {
        return (
            <>
                {this.renderAddressForm()}
                {!this.state.newUserData.correspondenceAddressLikeResidential ? this.correspondenceAddress() : ''}
                {this.renderButtons()}
            </>
        );
    }

    renderForm() {
        if(this.state.positionForm === null) {
            return this.renderMainFrom();
        }
        else if(this.state.newUserData.positions[this.state.positionForm] == 1) {
            return this.renderTeacherDataForm();
        }
        else if(this.state.newUserData.positions[this.state.positionForm] == 2) {
            return this.renderAdministrativeWorkerDataForm();
        }
    }

    renderErrors() {
        console.log('showReceivedErrors', this.state.receivedErrors);
        const receivedErrors = this.state.receivedErrors;
        let errors = Object.keys(receivedErrors).map(error => (
            <li key={Math.random()}>{receivedErrors[error][0]}</li>
        ));
        return errors;
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }
        return (
            <div className="container">
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn}/>
                {this.state.receivedErrors ?
                    <div className="alert alert-danger">
                        <ul className="mb-0">
                            {this.renderErrors()}
                        </ul>
                    </div>
                    : ''
                }
                <div className="row mt-3">
                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <div className="card">
                            <div className="card-header">
                                Dodawanie użytkownika
                            </div>
                            <div className="card-body">
                                {this.renderForm()}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default AddUser;
