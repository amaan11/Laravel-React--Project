import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "react-bootstrap";
import Modal from "../Modal";
import history from "../../history";

const styles = {
    card: {
        maxWidth: 1100,
        border: "1px solid rgb(221,221,221)",
        margin: "40px 10px 20px 150px"
    },
    title: {
        fontSize: 45,
        marginBottom: 2
    },
    cardContent: {
        display: "grid",
        gridTemplateColumns: "14%  20% 13% 14% 13% 14% 12%",
        gridGap: 2
    },
    cardInnerContent: {
        margin: "10px "
    },
    btn: {
        margin: "20px 0 0 20px"
    },
    stops: {
        borderBottom: "1px solid rgb(221,221,221)",
        textAlign: "center",
        marginTop: 15,
        paddingBottom: 10
    }
};

export default class SimpleCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            flight: false
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    flightData = {
        flightName: this.props.flightName,
        flightNumber: this.props.flightNumber,
        departureDate: this.props.departureDate,
        departureCity: this.props.departureCity,
        departureTime: this.props.departureTime,
        arrivalTime: this.props.arrivalTime,
        arrivalDate: this.props.arrivalDate,
        arrivalCity: this.props.arrivalCity,
        duration: this.props.duration,
        baseFare: this.props.baseFare,
        surcharges: this.props.surcharges,
        otherServices: this.props.otherServices,
        totalFare: this.props.totalFare
    };

    handleOpen = () => {
        this.setState({ modal: true });
    };
    handleClose = () => {
        this.setState({ modal: false });
    };

    render() {
        let CustomModal;
        if (this.state.modal) {
            CustomModal = (
                <Modal
                    show={this.state.modal}
                    handleClose={this.handleClose}
                    flightName={this.props.flightName}
                    flightNumber={this.props.flightNumber}
                    departureDate={this.props.departureDate}
                    // departureDay={this.props.departureDay}
                    departureCity={this.props.departureCity}
                    arrivalCity={this.props.arrivalCity}
                    baseFare={this.props.baseFare}
                    surcharges={this.props.surcharges}
                    otherServices={this.props.otherServices}
                    totalFare={this.props.totalFare}
                    baggageChecking={this.props.baggageChecking}
                    baggageCabin={this.props.baggageCabin}
                />
            );
        }
        if (this.state.flight) {
            history.push({
                pathname: "/flight/details",
                state: { value: this.flightData }
            });
        }

        return (
            <Card style={styles.card}>
                <CardContent style={styles.cardContent}>
                    <div>
                        <img
                            src="{this.props.image_url}"
                            width="80"
                            height="70"
                            style={{ margin: "15px 0 0 10px" }}
                        />
                    </div>
                    <div>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            style={styles.title}
                        >
                            {this.props.flightName}
                        </Typography>
                        <Typography color="textSecondary" variant="p">
                            {this.props.flightNumber}
                        </Typography>
                    </div>
                    <div style={styles.cardInnerContent}>
                        <Typography variant="h4">
                            {this.props.departureTime}
                        </Typography>
                        <Typography variant="h6">
                            {this.props.departureDate}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {this.props.departureCity}
                        </Typography>
                    </div>
                    <div style={{ marginRight: 15 }}>
                        <Typography style={styles.stops}>
                            {this.props.duration}({this.props.stopCount})
                        </Typography>
                        <Typography
                            style={{
                                width: 160,
                                textAlign: "center",
                                marginTop: 15,
                                textAlign: "center"
                            }}
                        >
                            {this.props.stopName}
                        </Typography>
                    </div>
                    <div style={styles.cardInnerContent}>
                        <Typography variant="h4">
                            {this.props.arrivalTime}
                        </Typography>
                        <Typography variant="h6">
                            {this.props.arrivalDate}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {this.props.arrivalCity}
                        </Typography>
                    </div>
                    <div style={styles.cardInnerContent}>
                        <Typography
                            color="textSecondary"
                            style={{ fontSize: 45 }}
                            gutterBottom
                            style={{ fontSize: 35 }}
                        >
                            <i
                                class="fas fa-rupee-sign"
                                style={{ marginRight: 10 }}
                            />
                            {this.props.totalFare}
                        </Typography>
                    </div>

                    <div style={styles.btn}>
                        <Button
                            variant="info"
                            onClick={() => {
                                this.setState({ flight: true });
                            }}
                        >
                            Book Now
                        </Button>
                        <div style={{ display: "flex" }}>
                            <Button variant="link" onClick={this.handleOpen}>
                                Flight Details
                            </Button>
                            {CustomModal}
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }
}
