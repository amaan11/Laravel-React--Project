import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Signup.css";
import swal from "sweetalert";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { newUser } from "../../action/userAction";

class Signup extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
            userName: "",
            password: "",
            confirmPassword: "",
            errors: {},
            isValid: true,
            signupMessage: "",
            fields: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    handleValidation() {
        const errors = this.state.errors;
        if (!this.state.firstName) {
            errors["firstName"] = "First  Name Cannot Be empty";
            this.setState({ isValid: false });
        } else {
            errors["firstName"] = "";
            this.setState({ isValid: true });
        }
        if (!this.state.lastName) {
            errors["lastName"] = "last  Name Cannot Be empty";
            this.setState({ isValid: false });
        } else {
            errors["lastName"] = "";
            this.setState({ isValid: true });
        }

        let lastAtPos = this.state.email.lastIndexOf("@");
        let lastDotPos = this.state.email.lastIndexOf(".");
        let firstAtPos = this.state.email.indexOf("@");
        let lastCharPos = this.state.email.charCodeAt(
            this.state.email.length - 1
        );

        if (
            !(
                lastAtPos < lastDotPos - 1 &&
                firstAtPos > 0 &&
                lastDotPos > 2 &&
                firstAtPos === lastAtPos &&
                ((lastCharPos >= 65 && lastCharPos <= 90) ||
                    (lastCharPos >= 97 && lastCharPos <= 122))
            )
        ) {
            errors["email"] = "Invalid Email!Please Type valid email";
            this.setState({ isValid: false });
        } else {
            errors["email"] = "";
            this.setState({ isValid: true });
        }

        if (this.state.contact.length !== 10) {
            errors["contact"] = "please enter a valid contact number";
            this.setState({ isValid: false });
        } else {
            errors["contact"] = "";
            this.setState({ isValid: true });
        }

        var reg = /^[A-Z]*[a-z]*[0-9]*$/;
        var test = reg.test(this.state.password);
        if (!test || this.state.password.length < 6) {
            errors["password"] =
                "Password must be atleast 6 digits and include only characters and digits";
            this.setState({ isValid: false });
        } else {
            errors["password"] = "";
            this.setState({ isValid: true });
        }

        if (this.state.password !== this.state.confirmPassword) {
            errors["confirmpassword"] = "Password Does not match";
            this.setState({ isValid: false });
        } else {
            errors["confirmpassword"] = "";
            this.setState({ isValid: true });
        }
        console.log(errors);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    submitHandler = async e => {
        e.preventDefault();

        this.handleValidation();
        const userData = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            contact: this.state.contact,
            username: this.state.userName,
            password: this.state.password
        };

        await this.props.newUser(userData);
    };

    render() {
        return (
            <div className="SignupApp">
                <h1 style={{ textAlign: 'center' }}>Signup </h1>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group-signup">
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                className="name-control form-control"
                                onChange={this.handleChange}
                            />
                            <span style={{ color: "red" }}>
                                {this.state.errors.firstName}
                            </span>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                className="name-control form-control"
                                onChange={this.handleChange}
                            />

                            <span style={{ color: "red" }}>
                                {this.state.errors.lastName}
                            </span>
                        </div>
                    </div>
                    <input
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        onChange={this.handleChange}
                    />
                    <span style={{ color: "red" }}>
                        {this.state.errors.email}
                    </span>
                    <input
                        type="number"
                        name="contact"
                        className="form-control"
                        placeholder="Contact Number"
                        onChange={this.handleChange}
                    />
                    <span style={{ color: "red" }}>
                        {this.state.errors.contact}
                    </span>
                    <input
                        type="text"
                        name="userName"
                        className="form-control"
                        placeholder="Username"
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={this.handleChange}
                    />
                    <span style={{ color: "red" }}>
                        {this.state.errors.password}
                    </span>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Confirm password"
                        onChange={this.handleChange}
                    />
                    <span style={{ color: "red" }}>
                        {this.state.errors.confirmpassword}
                    </span>
                    <Button
                        type="submit"
                        variant="primary"
                        className="signupbutton"
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { newuser: state.User.user };
};
const bindActions = dispatch => ({
    newUser: data => dispatch(newUser(data))
});

export default connect(
    mapStateToProps,
    bindActions
)(Signup);
