import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Homepage from "./Homepage";
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import Flight from "./Flight";
import history from "../history";
import FlightDetails from "./FlightDetails";
import store from "./store";
import { Provider } from "react-redux";

export default class Index extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div>
                        <Route path="/" exact component={Homepage} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Login} />

                        <Route
                            path="/login/forgetPassword"
                            component={ForgetPassword}
                        />

                        <Route path="/flight" exact component={Flight} />
                        {/* <Route path="/flight/search" exact component={Flight} /> */}
                        <Route
                            path="/flight/details"
                            exact
                            component={FlightDetails}
                        />
                    </div>
                </Router>
            </Provider>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<Index />, document.getElementById("app"));
}
