import React, { Component } from "react";
import Input from "./FormField";
import Button from "@material-ui/core/Button";
import Autocomplete from "./Autocomplete";
import { Redirect, Link } from "react-router";
import history from "../history";
import Flight from "./Flight";
import swal from "sweetalert";

const category = ["Business", "Premium Economy", "Economy"];

export default class FlightFormField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrival: "",
            departure: "",
            redirect: false,
            data: "",
            value: ""
        };
    }

    onSearchHandler = () => {
        const tripDetails = {
            departure: this.state.departure,
            arrival: this.state.arrival,
            date: this.state.date,
            passenger: this.state.passengerCount,
            category: this.state.category
        };
        if (
            tripDetails.departure &&
            tripDetails.arrival &&
            tripDetails.date &&
            tripDetails.passenger &&
            tripDetails.category
        ) {
            fetch("Flight", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                body: JSON.stringify(tripDetails)
            })
                .then(response => response.json())
                .then(response => {
                    this.setState({ redirect: true, data: response });
                });
        } else {
            swal("Please fill all the Fields");
        }
    };
    onChangeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleChange = (event, { newValue }) => {
        this.setState({
            departure: newValue
        });
    };
    handleChangeArrival = (event, { newValue }) => {
        this.setState({
            arrival: newValue
        });
    };
    swapInputHandler = (dep, arr) => {
        this.setState({ departure: arr, arrival: dep });
    };
    render() {
        if (this.state.redirect) {
            console.log("flight");
            history.push({
                pathname: "/flight",
                state: { value: this.state.data }
            });
        }
        if (this.state.redirect && this.props.redirect === "false") {
            // Remaining Redirection to same page with data
        }

        return (
            <div style={{ width: 1170 }}>
                <div
                    style={{
                        display: "flex",
                        backgroundColor: "white",
                        height: 80,
                        paddingLeft: 20,
                        borderRadius: 10
                    }}
                >
                    <Autocomplete
                        label="Departure"
                        changeHandler={this.handleChange}
                        value={this.state.departure}
                    />
                    <Button
                        onClick={() =>
                            this.swapInputHandler(
                                this.state.departure,
                                this.state.arrival
                            )
                        }
                        style={{
                            height: 30,
                            margin: "35px 20px 0 0",
                            border: "1px solid rgb(221,221,221)"
                        }}
                    >
                        <i
                            class="fas fa-exchange-alt"
                            style={{ fontSize: 20 }}
                        />
                    </Button>
                    <Autocomplete
                        label="Arrival"
                        changeHandler={this.handleChangeArrival}
                        value={this.state.arrival}
                    />
                    <Input
                        label="Date"
                        type="date"
                        name="date"
                        handler={this.onChangeHandler}
                    />
                    <Input
                        label="No. Of Passengers"
                        name="passengerCount"
                        handler={this.onChangeHandler}
                    />
                    <Input
                        label="Class"
                        type="Select"
                        selectValue={category}
                        name="category"
                        handler={this.onChangeHandler}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.onSearchHandler}
                        style={{ margin: "16px 20px 0 20px", height: 50 }}
                    >
                        Search
                    </Button>
                </div>
            </div>
        );
    }
}
