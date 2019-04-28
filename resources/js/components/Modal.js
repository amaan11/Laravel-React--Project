import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flight: true,
            fare: false,
            baggage: false
        };
    }
    render() {
        let flight, fare, baggage;
        if (this.state.flight) {
            flight = (
                <div style={{ marginTop: 10 }}>
                    <div style={{ display: "flex", marginBottom: 25 }}>
                        <div>
                            <img
                                src="https://media.glassdoor.com/sqll/354360/indigo-squarelogo.png"
                                width="50"
                                height="60"
                            />
                        </div>
                        <div style={{ marginLeft: 10 }}>
                            <div style={{ fontSize: 20 }}>
                                {this.props.flightName} ,{" "}
                                {this.props.flightNumber}
                            </div>
                            <div style={{ fontSize: 10 }}>
                                Operated By {this.props.flightName}
                            </div>
                        </div>

                        <div style={{ marginLeft: 70, fontSize: 20 }}>
                            {this.props.departureDate},WED
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div style={{ marginRight: 20 }}>
                            {this.props.departureCity}
                        </div>
                        <div style={{ marginRight: 20 }}>
                            -------
                            <i class="fas fa-plane" />
                            --------
                        </div>
                        <div>{this.props.arrivalCity}</div>
                    </div>
                </div>
            );
        }
        if (this.state.fare) {
            fare = (
                <div>
                    <div style={{ fontSize: 25, color: "rgb(135,135,135)" }}>
                        Fare Breakdown
                    </div>
                    <div
                        style={{
                            borderBottom: "1px solid rgb(221,221,221)",
                            display: "grid",
                            gridTemplateColumns: "2fr 1fr"
                        }}
                    >
                        <div style={{ marginRight: 45 }}>Base Fare</div>
                        <div>
                            <i
                                class="fas fa-rupee-sign"
                                style={{ marginRight: 10 }}
                            />
                            {this.props.baseFare}
                        </div>
                    </div>
                    <div
                        style={{
                            borderBottom: "1px solid rgb(221,221,221)",
                            display: "grid",
                            gridTemplateColumns: "2fr 1fr",
                            paddingTop: 10
                        }}
                    >
                        <div style={{ marginRight: 45 }}>Surcharges</div>
                        <div>
                            <i
                                class="fas fa-rupee-sign"
                                style={{ marginRight: 10 }}
                            />
                            {this.props.surcharges}
                        </div>
                    </div>
                    <div
                        style={{
                            borderBottom: "1px solid rgb(221,221,221)",
                            display: "grid",
                            gridTemplateColumns: "2fr 1fr",
                            paddingTop: 10
                        }}
                    >
                        <div style={{ marginRight: 45 }}>Other Services</div>
                        <div>
                            <i
                                class="fas fa-rupee-sign"
                                style={{ marginRight: 10 }}
                            />
                            {this.props.otherServices}
                        </div>
                    </div>
                    <div
                        style={{
                            borderBottom: "1px solid rgb(221,221,221)",
                            display: "grid",
                            gridTemplateColumns: "2fr 1fr",
                            paddingTop: 10
                        }}
                    >
                        <div style={{ marginRight: 45 }}>
                            <strong>Total Fare</strong>
                        </div>
                        <div>
                            <i
                                class="fas fa-rupee-sign"
                                style={{ marginRight: 10 }}
                            />
                            <strong>{this.props.totalFare}</strong>
                        </div>
                    </div>
                </div>
            );
        }
        if (this.state.baggage) {
            baggage = (
                <div>
                    <div
                        style={{
                            borderBottom: "1px solid rgb(221,221,221)",
                            display: "grid",
                            gridTemplateColumns: "2fr 2fr 2fr",
                            padding: "10px 0 10px 0"
                        }}
                    >
                        <div>Baggage</div>
                        <div>CheckIn</div>
                        <div>Cabin</div>
                    </div>
                    <div
                        style={{
                            borderBottom: "1px solid rgb(221,221,221)",
                            display: "grid",
                            gridTemplateColumns: "2fr 2fr 2fr",
                            padding: "10px 0 10px 0"
                        }}
                    >
                        <div>Adult</div>
                        <div>{this.props.baggageChecking}</div>
                        <div>{this.props.baggageCabin}</div>
                    </div>
                </div>
            );
        }
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Flight details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button
                            variant="link"
                            onClick={() => {
                                this.setState({
                                    flight: true,
                                    fare: false,
                                    baggage: false
                                });
                            }}
                        >
                            Flight Details
                        </Button>
                        <Button
                            variant="link"
                            onClick={() => {
                                this.setState({
                                    flight: false,
                                    fare: true,
                                    baggage: false
                                });
                            }}
                        >
                            Fare Summary
                        </Button>
                        <Button
                            variant="link"
                            onClick={() => {
                                this.setState({
                                    flight: false,
                                    fare: false,
                                    baggage: true
                                });
                            }}
                        >
                            Baggage
                        </Button>
                        {flight}
                        {fare}
                        {baggage}
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
