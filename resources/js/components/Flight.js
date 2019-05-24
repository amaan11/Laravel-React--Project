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
    },
    timeFilter: {
        margin: 5
    },
    mainDivFilter: {
        display: "flex",
        flexDirection: "row"
    }
};
class Flight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            airline: {
                indigo: false,
                spicejet: false,
                airindia: false,
                vistara: false
            },
            stops: {
                nostop: false,
                onestop: false
            },
            sort: {
                departure_time: "",
                arrival_time: "",
                duration: "",
                price: ""
            },
            count: {
                departure_time: 0,
                arrival_time: 0,
                duration: 0,
                price: 0
            },
            sortedData: []
        };

        this.changeDateFormat = this.changeDateFormat.bind(this);
        this.changeTimeFormat = this.changeTimeFormat.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.sortHandler = this.sortHandler.bind(this);
    }

    sortHandler = sortOption => {
        const data = this.props.location.state.value;
        this.setState(
            () => {
                return {
                    count: {
                        ...this.state.count,
                        [sortOption]: this.state.count[sortOption] + 1
                    }
                };
            },
            () => {
                if (this.state.count[sortOption] % 2 === 1) {
                    this.setState(
                        () => {
                            return {
                                sort: {
                                    ...this.state.sort,
                                    [sortOption]: "asc"
                                }
                            };
                        },
                        () => {
                            const sortData = {
                                // [sortOption]: this.state.sort[sortOption],
                                sort: "true",
                                sortField: [sortOption],
                                sortOrder: this.state.sort[sortOption],
                                departure: data[0].departure_city,
                                arrival: data[0].arrival_city,
                                date: data[0].departure_date,
                                passenger: "1",
                                category: "economy"
                            };
                            fetch("sort-flight", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "X-CSRF-TOKEN": $(
                                        'meta[name="csrf-token"]'
                                    ).attr("content")
                                },
                                body: JSON.stringify(sortData)
                            })
                                .then(response => response.json())
                                .then(response =>
                                    this.setState({ sortedData: response })
                                );
                        }
                    );
                } else {
                    this.setState(
                        () => {
                            return {
                                sort: {
                                    ...this.state.sort,
                                    [sortOption]: "desc"
                                }
                            };
                        },
                        () => {
                            const sortData = {
                                // [sortOption]: this.state.sort[sortOption],
                                sort: "true",
                                sortField: [sortOption],
                                sortOrder: this.state.sort[sortOption],
                                departure: data[0].departure_city,
                                arrival: data[0].arrival_city,
                                date: data[0].departure_date,
                                passenger: "1",
                                category: "economy"
                            };
                            fetch("sort-flight", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "X-CSRF-TOKEN": $(
                                        'meta[name="csrf-token"]'
                                    ).attr("content")
                                },
                                body: JSON.stringify(sortData)
                            })
                                .then(response => response.json())
                                .then(response =>
                                    this.setState({ sortedData: response })
                                );
                        }
                    );
                }
            }
        );

        // this.setState((previousState, props) => {
        //     return {
        //         count: {
        //             ...previousState.count,
        //             [sortOption]: previousState.count[sortOption] + 1
        //         }
        //     };
        // });

        // this.state.count.sortOption++;

        // if (this.state.count % 2 == 1) {
        //     this.setState({ sort: "asc" });
        // } else {
        //     this.setState({ sort: "desc" });
        // }
    };

    handleInputChange = (event, filtername) => {
        // console.log(filtername, event.target.checked);
        const name = event.target.name;
        const value = event.target.checked;
        if (filtername == "airline") {
            this.setState(() => {
                return {
                    airline: { ...this.state.airline, [name]: value }
                };
            });
        }
        if (filtername == "stops") {
            this.setState(() => {
                return {
                    stops: { ...this.state.stops, [name]: value }
                };
            });
        }
        // } else {
        //     this.setState((previousState, props) => {
        //         return { stops: { ...previousState.stops, [name]: value } };
        //     });
        // }
    };

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
    applyFilter = () => {
        const postData = {
            departureTime: this.state.departureTime,
            arrivalTime: this.state.arrivalTime,
            airline: this.state.airline,
            stops: this.state.stops,
            filter: true
        };
        fetch("apply-filter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            body: JSON.stringify(postData)
        });
    };
    render() {
        let data = [];

        if (this.state.sortedData.length === 0) {
            console.log("No sorting applied");
            data = this.props.location.state.value;
        } else {
            console.log(" sorting applied");

            data = this.state.sortedData;
        }

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
                <div
                    style={{
                        margin: "20px 110px 20px 110px"
                    }}
                >
                    <div class="row">
                        <div class="col-sm-3">
                            <h6>Departure From {data[0].departure_city}</h6>
                            <div style={styles.mainDivFilter}>
                                <div>
                                    <input
                                        type="checkbox"
                                        onChange={this.handleInputChange}
                                    />
                                    <span style={styles.timeFilter}>
                                        Before 10am
                                    </span>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        onChange={this.handleInputChange}
                                    />
                                    <span style={styles.timeFilter}>
                                        10am-4pm
                                    </span>
                                </div>
                            </div>
                            <div style={styles.mainDivFilter}>
                                <div>
                                    <input
                                        type="checkbox"
                                        onChange={this.handleInputChange}
                                    />
                                    <span style={styles.timeFilter}>
                                        4pm-10pm
                                    </span>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        onChange={this.handleInputChange}
                                    />
                                    <span style={styles.timeFilter}>
                                        After 10pm
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <h6>Arrival To {data[0].arrival_city}</h6>
                            <div style={styles.mainDivFilter}>
                                <div>
                                    <input
                                        type="checkbox"
                                        name="arrivalTime"
                                        onChange={this.handleInputChange}
                                    />
                                    <span style={styles.timeFilter}>
                                        Before 10am
                                    </span>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        name="arrivalTime"
                                        onChange={this.handleInputChange}
                                    />
                                    <span style={styles.timeFilter}>
                                        10am-4pm
                                    </span>
                                </div>
                            </div>
                            <div style={styles.mainDivFilter}>
                                <div>
                                    <input
                                        type="checkbox"
                                        name="arrivalTime"
                                        onChange={this.handleInputChange}
                                    />
                                    <span style={styles.timeFilter}>
                                        4pm-10pm
                                    </span>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        name="arrivalTime"
                                        onChange={this.handleInputChange}
                                    />
                                    <span style={styles.timeFilter}>
                                        After 10pm
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <h6>Stops</h6>
                            <div>
                                <input
                                    type="checkbox"
                                    name="nostop"
                                    onChange={e =>
                                        this.handleInputChange(e, "stops")
                                    }
                                    // checked={this.state.stops.noStop}
                                />
                                <span style={styles.timeFilter}>No Stops</span>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="onestop"
                                    onChange={e =>
                                        this.handleInputChange(e, "stops")
                                    }
                                    // checked={this.state.stops.oneStop}
                                />
                                <span style={styles.timeFilter}>1 Stop</span>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <h6>Airlines</h6>
                            <div>
                                <input
                                    type="checkbox"
                                    name="indigo"
                                    onChange={e =>
                                        this.handleInputChange(e, "airline")
                                    }
                                />
                                <span style={styles.timeFilter}>Indigo</span>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="spicejet"
                                    onChange={e =>
                                        this.handleInputChange(e, "airline")
                                    }
                                />
                                <span style={styles.timeFilter}>Spice Jet</span>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="airindia"
                                    onChange={e =>
                                        this.handleInputChange(e, "airline")
                                    }
                                />
                                <span style={styles.timeFilter}>Air India</span>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="vistara"
                                    onChange={e =>
                                        this.handleInputChange(e, "airline")
                                    }
                                />
                                <span style={styles.timeFilter}>Vistara</span>
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button
                                type="submit"
                                class="btn btn-link"
                                onClick={this.applyFilter}
                            >
                                Apply Filter
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        margin: "0px 0px 0 160px"
                    }}
                >
                    <Button variant="link" style={{ marginRight: 310 }}>
                        Sort By
                    </Button>
                    <Button
                        variant="link"
                        style={{ marginRight: 10 }}
                        onClick={() => this.sortHandler("departure_time")}
                    >
                        {this.state.sort.departure_time == "asc" ? (
                            <i class="fas fa-sort-down" style={{ margin: 5 }} />
                        ) : (
                            ""
                        )}
                        {this.state.sort.departure_time == "desc" ? (
                            <i class="fas fa-sort-up" style={{ margin: 5 }} />
                        ) : (
                            ""
                        )}
                        Departure
                    </Button>

                    <Button
                        variant="link"
                        style={{ marginRight: 40 }}
                        onClick={() => this.sortHandler("duration")}
                    >
                        {this.state.sort.duration == "asc" ? (
                            <i class="fas fa-sort-down" style={{ margin: 5 }} />
                        ) : (
                            ""
                        )}
                        {this.state.sort.duration == "desc" ? (
                            <i class="fas fa-sort-up" style={{ margin: 5 }} />
                        ) : (
                            ""
                        )}
                        Duration
                    </Button>
                    <Button
                        variant="link"
                        style={{ marginRight: 50 }}
                        onClick={() => this.sortHandler("arrival_time")}
                    >
                        {this.state.sort.arrival_time == "asc" ? (
                            <i class="fas fa-sort-down" style={{ margin: 5 }} />
                        ) : (
                            ""
                        )}
                        {this.state.sort.arrival_time == "desc" ? (
                            <i class="fas fa-sort-up" style={{ margin: 5 }} />
                        ) : (
                            ""
                        )}
                        Arrival
                    </Button>
                    <Button
                        variant="link"
                        onClick={() => this.sortHandler("price")}
                    >
                        {this.state.sort.price == "asc" ? (
                            <i class="fas fa-sort-down" style={{ margin: 5 }} />
                        ) : (
                            ""
                        )}
                        {this.state.sort.price == "desc" ? (
                            <i class="fas fa-sort-up" style={{ margin: 5 }} />
                        ) : (
                            ""
                        )}
                        Price
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
                            baseFare={data.base_fare}
                            surcharges={data.surcharges}
                            otherServices={data.other_services}
                            totalFare={data.total_fare}
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
