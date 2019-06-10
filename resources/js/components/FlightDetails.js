import React, { Component } from "react";
import FormField from "./FormField";
import { Button } from "react-bootstrap";
import Card from "./Card/index";

const food = [
    {
        name: "Veg Meal",
        price: "200"
    },
    {
        name: "Poha",
        price: "100"
    },
    {
        name: "Samosa",
        price: "100"
    },
    {
        name: "Sandwich",
        price: "150"
    },
    {
        name: " Non Veg ",
        price: "300"
    },
    {
        name: "Expresso",
        price: "100"
    },
    {
        name: "Capuchinno",
        price: "100"
    }
];
const baggages = [
    {
        weight: "5kg",
        price: "600"
    },
    {
        weight: "10kg",
        price: "1200"
    },
    {
        weight: "15kg",
        price: "1800"
    }
];
const styles = {
    flight: {
        border: "1px solid rgb(221,221,221)",
        margin: 15
    },
    steps: {
        width: 20,
        height: 20,
        color: "white",
        backgroundColor: "blue",
        textAlign: "center",
        borderRadius: 10
    },
    mainText: {
        fontSize: 15,
        color: "blue",
        marginLeft: 10
    },
    innerdiv: {
        display: "flex",
        borderBottom: "1px solid rgb(221,221,221)",
        padding: 10
    },
    anotherDiv: {
        fontSize: 20,
        borderBottom: "1px solid rgb(221,221,221)"
    },
    flightDetails: {
        padding: 10,
        display: "grid",
        gridTemplateColumns: "2fr 2fr 2fr 2fr",
        marginLeft: 20
    },
    logo: {
        margin: "0 5px 0 5px"
    },
    airportDetails: {
        fontSize: 10
    },
    btn: {
        margin: 10,
        textAlign: "right"
    },
    passengerDetails: {
        margin: 20
    },
    fare: {
        borderBottom: "1px solid rgb(221,221,221)",
        display: "grid",
        gridTemplateColumns: "2fr 2fr",
        padding: 10
    }
};
export default class FlightDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meals: true,
            baggage: false,
            totalAddons: 0,
            passenger: false
        };
        this.onFareHandler = this.onFareHandler.bind(this);
    }
    onFareHandler = () => {
        console.log(this.props.price);
    };

    addonsHandler = price => {
        let totalAddons = this.state.totalAddons;

        let addons = parseInt(totalAddons) + parseInt(price);
        this.setState({ totalAddons: addons });
    };

    render() {
        let adultFormField;
        adultFormField = (
            <div style={styles.passengerDetails}>
                <h3>Adult </h3>
                <div>
                    <FormField label="FirstName" />
                    <FormField label="MiddleName" />
                    <FormField label="LastName" />
                    <FormField label="age" />
                </div>
            </div>
        );
        let meals, baggage;
        let flightDetails = this.props.location.state.value;

        if (this.state.meals) {
            meals = (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 2fr 2fr 2fr 2fr 2fr  2fr",
                        gridGap: 10
                    }}
                >
                    {food.map(food => {
                        return (
                            <Card
                                name={food.name}
                                price={food.price}
                                addonsHandler={price =>
                                    this.addonsHandler(price)
                                }
                            />
                        );
                    })}
                </div>
            );
        }
        if (this.state.baggage) {
            baggage = (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 2fr 2fr 2fr 2fr 2fr  2fr",
                        gridGap: 10
                    }}
                >
                    {baggages.map(baggages => {
                        return (
                            <Card
                                name={baggages.weight}
                                price={baggages.price}
                            />
                        );
                    })}
                </div>
            );
        }

        return (
            <div>
                <h1 style={{ textAlign: "center", marginTop: 10 }}>
                    Review Your Booking
                </h1>
                <div
                    style={{ display: "grid", gridTemplateColumns: "65% 35%" }}
                >
                    <div style={styles.flight}>
                        <div style={styles.innerdiv}>
                            <div style={styles.steps}>1</div>
                            <h4 style={styles.mainText}>Flight Details</h4>
                        </div>
                        <div style={styles.anotherDiv}>
                            <div style={{ margin: 20 }}>
                                {flightDetails.departureCity}
                                <i class="fas fa-plane" style={styles.logo} />
                                {flightDetails.arrivalCity}
                            </div>
                            <div style={{ margin: 20 }}>
                                WED, {flightDetails.departureDate}
                            </div>
                        </div>
                        <div style={styles.flightDetails}>
                            <div>
                                <img src="" />
                                <div>{flightDetails.flightName}</div>
                                <div>Economy</div>
                                <div>({flightDetails.flightNumber})</div>
                            </div>
                            <div>
                                <div>Wed ,{flightDetails.departureDate}</div>
                                <div>{flightDetails.departureTime}</div>
                                <div>{flightDetails.departureCity}</div>
                                <div style={{ fontSize: 15 }}>
                                    kempegowda International
                                    Airport,Bangalore,India(Terminal-1)
                                </div>
                            </div>
                            <div>
                                <div>
                                    ----{flightDetails.duration} ---
                                    <i class="fas fa-plane" />
                                </div>
                            </div>
                            <div>
                                <div> {flightDetails.arrivalDate}</div>
                                <div>{flightDetails.arrivalTime}</div>
                                <div>{flightDetails.arrivalCity}</div>
                                <div style={{ fontSize: 15 }}>
                                    Sardar Vallabhai Patel
                                    Airport,Ahmedabad,India(Terminal-1)
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={styles.flight}>
                        <h4 style={styles.mainText}>Fare Summary</h4>
                        <div style={styles.fare}>
                            <div>Base Fare</div>
                            <div>
                                <i
                                    class="fas fa-rupee-sign"
                                    style={{ marginRight: 10 }}
                                />
                                {flightDetails.baseFare}
                            </div>
                        </div>
                        <div style={styles.fare}>
                            <div>Surcharges</div>
                            <div>
                                <i
                                    class="fas fa-rupee-sign"
                                    style={{ marginRight: 10 }}
                                />
                                {flightDetails.surcharges}
                            </div>
                        </div>
                        <div style={styles.fare}>
                            <div>Other Services</div>
                            <div>
                                <i
                                    class="fas fa-rupee-sign"
                                    style={{ marginRight: 10 }}
                                />
                                {flightDetails.otherServices}
                            </div>
                        </div>
                        <div style={styles.fare}>
                            <div>Add Ons</div>
                            <div>
                                <i
                                    class="fas fa-rupee-sign"
                                    style={{ marginRight: 10 }}
                                />
                                {this.state.totalAddons}
                            </div>
                        </div>
                        <div style={styles.fare}>
                            <div>Total Amount</div>
                            <div>
                                <i
                                    class="fas fa-rupee-sign"
                                    style={{ marginRight: 10 }}
                                />
                                {flightDetails.totalFare +
                                    parseInt(this.state.totalAddons)}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={styles.flight}>
                    <div style={styles.innerdiv}>
                        <div style={styles.steps}>2</div>
                        <h4 style={styles.mainText}>Add Ons</h4>
                    </div>
                    <Button
                        variant="link"
                        onClick={() => {
                            this.setState({
                                meals: true,
                                baggage: false
                            });
                        }}
                    >
                        Add Meals
                    </Button>
                    <Button
                        variant="link"
                        onClick={() => {
                            this.setState({
                                meals: false,
                                baggage: true
                            });
                        }}
                    >
                        Add Baggage
                    </Button>

                    {meals}
                    {baggage}
                </div>
                <div style={styles.flight}>
                    <div style={styles.innerdiv}>
                        <div style={styles.steps}>3</div>
                        <h4 style={styles.mainText}>Passenger Details</h4>
                    </div>
                    {adultFormField}
                    {this.state.passenger ? adultFormField : ""}
                    {/* <div style={styles.passengerDetails}> */}
                    {/* <h3>Adult 1</h3>
                        <div>
                            <FormField label="FirstName" />
                            <FormField label="MiddleName" />
                            <FormField label="LastName" />
                            <FormField label="age" />
                        </div> */}

                    <Button
                        variant="primary"
                        style={styles.btn}
                        onClick={() => this.setState({ passenger: true })}
                    >
                        Add Adult
                    </Button>
                    <div style={{ display: "flex" }}>
                        <FormField label="Email" />
                        <h6 style={{ marginTop: 50 }}>
                            Your Ticket will be send to this email
                        </h6>
                    </div>
                    <div>
                        <FormField label="Mobile No." />
                    </div>

                    <Button variant="info" style={styles.btn}>
                        Book Now
                    </Button>
                </div>
            </div>
        );
    }
}
