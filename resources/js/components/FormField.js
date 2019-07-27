import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";
import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles({
    grid: {
        width: 200,
    },

});
const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    },
    menu: {
        width: 200
    }
});

function FormField(props) {

    const classes = useStyles();
    switch (props.type) {
        case "date":
            return (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container className={classes.grid} justify="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            id="mui-pickers-date"
                            label={props.label}
                            value={props.value}
                            onChange={props.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            style={{ marginRight: 15 }}
                            disablePast="false"
                            disableToolbar="false"
                            disabled={props.isDisabled}
                        />

                    </Grid>
                </MuiPickersUtilsProvider>
            );

        case "custom-dropdown":
            return (
                <div>
                    <TextField
                        label={props.label}
                        value={props.value}
                        name={props.name}
                        onChange={props.handler}
                        margin="normal"
                    />

                </div>
            )

        case "Select":
            return (
                <FormControl variant="outlined" style={{ marginTop: 16, width: 110 }}>
                    <InputLabel htmlFor="outlined-age-native-simple">
                        {props.label}
                    </InputLabel>
                    <Select
                        native
                        name={props.name}
                        onChange={props.handler}
                    >
                        {props.selectValue.map(option => {
                            return <option value={option}>{option}</option>;
                        })}
                    </Select>
                </FormControl>
            );

        default:
            return (
                <TextField
                    id="standard-name"
                    label={props.label}
                    value={props.value}
                    name={props.name}
                    onChange={props.handler}
                    margin="normal"
                    style={{ marginRight: 15 }}

                />
            );
    }
}


export default withStyles(styles)(FormField);
