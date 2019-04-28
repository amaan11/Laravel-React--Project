import React, { Component } from "react";
import Card from "./Card/Card";
import FormField from "./FormField";
import { Button } from "react-bootstrap";
import history from "../history";
import Pagination from "./Pagination";

const styles = {
    modifyBtn: {
        width: 110,
        padding: 10,
        position: "absolute",
        left: 1200,
        top: 20
    }
};
class Flight extends Component {
    constructor(props) {
        super(props);

        this.changeDateFormat = this.changeDateFormat.bind(this);
        this.changeTimeFormat = this.changeTimeFormat.bind(this);
    }

    changeDateFormat = date => {
        var mydate = new Date(date);
        const month = [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUNE",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC"
        ];
        var monthIndex = mydate.getMonth();
        var currentMonth = month[monthIndex];
        var currentDate = mydate.getDate();

        return currentMonth + " " + currentDate;
    };

    changeTimeFormat = time => {
        const mytime = time.split(":");
        return mytime[0] + ":" + mytime[1];
    };
    modifySearchhandler = () => {
        history.push("/home");
    };
    render() {
        const data = this.props.location.state.value;
        return (
            <div>
                <div style={{ margin: "25px" }}>
                    <FormField
                        label="Departure"
                        value={data[0].departure_city}
                    />
                    <FormField label="Arrival" value={data[0].arrival_city} />
                    <FormField label="Date" value={data[0].departure_date} />
                    <FormField label="No Of Passenger" value="1" />
                    <FormField label="class" value="Economy" />

                    <Button
                        variant="danger"
                        style={styles.modifyBtn}
                        onClick={this.modifySearchhandler}
                    >
                        Modify search
                    </Button>
                </div>
                {data.map(data => {
                    return (
                        <Card
                            image_url={data.airline_details.flight_image_url}
                            flightName={data.airline_details.flight_name}
                            flightNumber={data.flight_number}
                            departureTime={this.changeTimeFormat(
                                data.departure_time
                            )}
                            departureDate={this.changeDateFormat(
                                data.departure_date
                            )}
                            departureCity={data.departure_city}
                            arrivalTime={this.changeTimeFormat(
                                data.arrival_time
                            )}
                            arrivalDate={this.changeDateFormat(
                                data.arrival_date
                            )}
                            arrivalCity={data.arrival_city}
                            duration={this.changeTimeFormat(data.duration)}
                            stopCount={data.stop_count}
                            stopName={data.stop_name}
                            baseFare={data.fare_details.base_fare}
                            surcharges={data.fare_details.surcharges}
                            otherServices={data.fare_details.other_services}
                            totalFare={data.fare_details.total_fare}
                            baggageChecking={
                                data.airline_details.baggage_checkin
                            }
                            baggageCabin={data.airline_details.baggage_cabin}
                        />
                    );
                })}
            </div>
        );
    }
}
export default Flight;
