import React, { Component } from "react";
import FlightFormField from "./FlightFormField";

export default class Menu extends Component {
    constructor(props) {
        super(props);
    }
    compo;
    render() {
        return (
            <div style={{ marginLeft: -25 }}>
                <img
                    src="https://www.imore.com/sites/imore.com/files/styles/xlarge/public/field/image/2017/02/airplane-flight-sunset.jpg?itok=8iUtkHU-"
                    width={screen.width}
                    height="400px"
                />
                <div
                    style={{
                        position: "absolute",
                        left: 200,
                        top: 180
                    }}
                >
                    <h1
                        style={{
                            color: "white",
                            textAlign: "center"
                        }}
                    >
                        Book Flight Tickets
                    </h1>
                    <FlightFormField />
                </div>
            </div>
        );
    }
}
