import React, { Component } from "react";
import Input from "./FormField";
import Button from "@material-ui/core/Button";
import Autocomplete from "./Autocomplete";
import { Redirect, Link } from "react-router";
import history from "../history";
import Flight from "./Flight";
import swal from "sweetalert";
import { getDate } from "date-fns/esm";

const category = ["Select Class", "Business", "Economy"];

export default class FlightFormField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrival: "",
            departure: "",
            redirect: false,
            data: "",
            value: "",
            departureDate: new Date(),
            returnDate: new Date()
        };
        this.parseDate = this.parseDate.bind(this);
    }

    parseDate = date => {
        const parsedDate = `${date.getFullYear()}-${date.getMonth() +
            1}-${date.getDate()}`;
        return parsedDate;
    };

    onSearchHandler = () => {
        const tripDetails = {
            departure: this.state.departure,
            arrival: this.state.arrival,
            departureDate: this.parseDate(this.state.departureDate),
            // returnDate: this.parseDate(this.state.returnDate),
            passenger: this.state.passengerCount,
            category: this.state.category
        };
        if (this.props.isDisableReturnDate) {
            tripDetails.returnDate = "";
        } else {
            tripDetails.returnDate = `${this.parseDate(this.state.returnDate)}`;
        }
        console.log(tripDetails);
        if (
            tripDetails.departure &&
            tripDetails.arrival &&
            tripDetails.departureDate &&
            tripDetails.passenger &&
            tripDetails.category
        ) {
            fetch("flight", {
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
    handleDepartureDateChange = date => {
        this.setState({ departureDate: date });
    };
    handleReturnDateChange = date => {
        this.setState({ returnDate: date });
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
        console.log(this.state.selectedDate);
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
                        label="Departure"
                        value={this.state.departureDate}
                        handleDateChange={this.handleDepartureDateChange}
                    />
                    <Input
                        label="Date"
                        type="date"
                        name="date"
                        label="Return"
                        value={this.state.returnDate}
                        handleDateChange={this.handleReturnDateChange}
                        isDisabled={this.props.isDisableReturnDate}
                    />
                    <Input
                        label="Travellers"
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
