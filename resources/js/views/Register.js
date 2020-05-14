import React, {Component} from 'react';
import RegisterContainer from '../controllers/RegisterController';
import Footer from "../components/Footer";
import Header from "../components/Header";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: props.location,
        }
    }

    render() {
        return (
            <div className="container">
                <Header userData={{}} userIsLoggedIn={false}/>
                <RegisterContainer redirect={this.state.redirect} />
                <Footer/>
            </div>
        )
    }
}
export default Register;
