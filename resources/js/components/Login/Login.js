import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Login.css";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchUser } from "../../action/userAction";
import Input from "../FormField";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import swal from "sweetalert";

class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLogin: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = async e => {
        e.preventDefault();

        const userDetails = {
            email: this.state.email,
            password: this.state.password
        };
        await this.props.fetchUser(userDetails);
    };

    responseGoogle = response => {
        const userGoogleLogindetails = {
            name: response.w3.ig,
            email: response.w3.U3,
            providerName: "google",
            providerId: response.googleId,
            access_token: response.accessToken
        };
        fetch("social-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            body: JSON.stringify(userGoogleLogindetails)
        })
            .then(response => response.json())
            .then(response => {
                if (response === "login Successful") {
                    this.setState({ isLogin: true });
                } else {
                    swal(
                        "Login failed!",
                        "Please enter a valid Username and password!"
                    );
                }
            });
        localStorage.setItem("acessToken", response.accessToken);
    };

    responseFacebook = response => {
        const userFbDetails = {
            name: response.name,
            email: response.email,
            providerName: "facebook",
            providerId: response.id,
            access_token: response.accessToken
        };

        fetch("social-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            body: JSON.stringify(userFbDetails)
        })
            .then(response => response.json())
            .then(response => {
                if (response === "login Successful") {
                    this.setState({ login: true });
                } else {
                    swal(
                        "Login failed!",
                        "Please enter a valid username and password!"
                    );
                }
            });

        localStorage.setItem("acessToken", response.accessToken);

        // console.log(response.accessToken);
    };
    render() {
        if (this.state.isLogin) {
            return <Redirect to="/" />;
        }
        return (
            <div className="mainDiv">
                <div className="LoginApp">
                    <div className="login-heading">
                        <h1 style={{ marginLeft: 90 }}>Login</h1>
                    </div>
                    <div className="signInDiv">
                        <div>
                            <h5>Don't Have an account?</h5>
                        </div>
                        <div>
                            <Link to="/signup">Sign Up Now!</Link>
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div>
                                <Input
                                    label="Enter Email"
                                    name="email"
                                    handler={this.handleChange}
                                />
                            </div>
                            <div>
                                <Input
                                    label="Enter Password"
                                    name="password"
                                    handler={this.handleChange}
                                    className="form-control"
                                />
                            </div>
                            {/* <label>Email:</label>
                            <input
                                type="text"
                                placeholder="Enter Email"
                                className="form-control"
                                name="email"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="form-control"
                                name="password"
                                onChange={this.handleChange}
                            />*/}
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            className="loginBtn "
                        >
                            Login
                        </Button>
                    </form>

                    <Link to="/login/forgetPassword">Forget Password</Link>
                    <h4>OR</h4>

                    <GoogleLogin
                        clientId="906384274002-db020th06m5t8hi8otnt5j3hmb82dkic.apps.googleusercontent.com"
                        fields="name,email"
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        className="google-login"
                    />
                    <br />
                    <br />

                    <FacebookLogin
                        appId="542360292953893"
                        fields="name,email"
                        callback={this.responseFacebook}
                        version="3.1"
                        className="kep-login-facebook"
                    />
                </div>
            </div>
        );
    }
}
Login.PropTypes = {
    fetchUser: PropTypes.func.isRequired
};
const mapStateToProps = state => {
    return { user: state.User.user };
};
const bindActions = dispatch => ({
    fetchUser: data => dispatch(fetchUser(data))
});

export default connect(
    mapStateToProps,
    bindActions
)(Login);
