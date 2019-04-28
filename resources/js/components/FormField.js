import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";

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

class FormField extends React.PureComponent {
    render() {
        const { classes } = this.props;

        switch (this.props.type) {
            case "date":
                return (
                    <TextField
                        id="standard-name"
                        label={this.props.label}
                        value={this.props.value}
                        style={styles.formStyle}
                        type="date"
                        defaultValue="2019-03-28"
                        name={this.props.name}
                        onChange={this.props.handler}
                        margin="normal"
                        style={styles.formStyle}
                    />
                );

            case "Select":
                return (
                    <FormControl variant="outlined" style={{ marginTop: 16 }}>
                        <InputLabel htmlFor="outlined-age-native-simple">
                            {this.props.label}
                        </InputLabel>
                        <Select
                            native
                            name={this.props.name}
                            onChange={this.props.handler}
                        >
                            {this.props.selectValue.map(option => {
                                return <option value={option}>{option}</option>;
                            })}
                        </Select>
                    </FormControl>
                );

            default:
                return (
                    <TextField
                        id="standard-name"
                        label={this.props.label}
                        value={this.props.value}
                        name={this.props.name}
                        className={classes.textField}
                        onChange={this.props.handler}
                        margin="normal"
                    />
                );
        }
    }
}

export default withStyles(styles)(FormField);
