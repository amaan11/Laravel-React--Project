import React, { Component } from "react";
import FlightFormField from "./FlightFormField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';


export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: 'roundtrip'
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (event) => {
        this.setState({ selectedValue: event.target.value })
    }
    render() {

        return (
            <div style={{ marginLeft: -25 }}>
                <img
                    src="https://ichef.bbci.co.uk/news/660/cpsprodpb/9DFF/production/_100474404_qantasdreamliner-imagefromqantaspress.jpg"
                    width={screen.width}
                    height="400px"
                />
                <div
                    style={{
                        position: "absolute",
                        left: 200,
                        top: 200
                    }}
                >
                    <h1
                        style={{
                            color: "black",
                            textAlign: "center",
                            paddingBottom: 60
                        }}
                    >
                        Book Flight Tickets
                    </h1>
                    <Radio
                        checked={this.state.selectedValue === 'oneway'}
                        onChange={this.handleChange}
                        value="oneway"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'one-way' }}
                        color="primary"
                    /><span>one-way</span>
                    <Radio
                        checked={this.state.selectedValue === 'roundtrip'}
                        onChange={this.handleChange}
                        value="roundtrip"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'round-trip' }}
                        color="primary"
                    /><span>round-trip</span>
                    {/* <RadioGroup
                        aria-label="Gender"
                        name="gender1"
                        value={this.state.trip}
                        onChange={this.handleChange}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div>
                                <FormControlLabel value="oneway" control={<Radio color="primary" />} label=" one-way" />
                            </div>
                            <div>
                                <FormControlLabel value="roundtrip" control={<Radio color="primary" />} label="round-trip" />
                            </div>
                        </div>

                    </RadioGroup> */}
                    <FlightFormField isDisableReturnDate={this.state.selectedValue == 'oneway' ? 'true' : ''} />
                </div>
                <div classname="Carousel" />
            </div>
        );
    }
}
