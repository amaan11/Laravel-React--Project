import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import { withStyles } from "@material-ui/core/styles";
// import getCity from "./getCity";

// console.log(getCity());
const suggestions = [
    { label: "Ahmedabad" },
    { label: "Bangalore" },
    { label: "New Delhi" },
    { label: "Mumbai" },
    { label: "Pune" },
    { label: "Lucknow" },
    { label: "Goa" },
    { label: "Ranchi" },
    { label: "Hyderabad" },
    { label: "Kolkata" },
    { label: "Chennai" },
    { label: "Amritsar" },
    { label: "Cochin" },
    { label: "Ahmedabad" },
    { label: "Jaipur" },
    { label: "Bhubaneshwar" },
    { label: "lucknow" },
    { label: "Coimbatore" },
    { label: "Varanasi" },
    { label: "Nagpur" }
];

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input
                }
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) =>
                    part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 500 }}>
                            {part.text}
                        </span>
                    ) : (
                        <strong key={String(index)} style={{ fontWeight: 300 }}>
                            {part.text}
                        </strong>
                    )
                )}
            </div>
        </MenuItem>
    );
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

const styles = theme => ({
    root: {
        width: 200,
        height: 500,
        marginRight: 20,
        marginTop: 18
    },
    container: {
        position: "relative"
    },
    suggestionsContainerOpen: {
        position: "absolute",
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0
    },
    suggestion: {
        display: "block"
    },
    suggestionsList: {
        margin: "10px 0 0 0",
        padding: 0,
        listStyleType: "none"
    },
    divider: {
        height: theme.spacing.unit * 2
    }
});

class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            single: "",
            popper: "",
            suggestions: []
        };
    }
    getSuggestions = value => {
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;

        return inputLength === 0
            ? []
            : suggestions.filter(suggestion => {
                  const keep =
                      count < 5 &&
                      suggestion.label.slice(0, inputLength).toLowerCase() ===
                          inputValue;

                  if (keep) {
                      count += 1;
                  }

                  return keep;
              });
    };
    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { classes } = this.props;

        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion
        };

        return (
            <div className={classes.root}>
                <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                        classes,
                        label: this.props.label,
                        placeholder: this.props.label,
                        value: this.props.value,
                        onChange: this.props.changeHandler,
                        inputRef: node => {
                            this.popperNode = node;
                        },
                        InputLabelProps: {
                            shrink: true
                        }
                    }}
                    theme={{
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion
                    }}
                    renderSuggestionsContainer={options => (
                        <Popper
                            anchorEl={this.popperNode}
                            open={Boolean(options.children)}
                        >
                            <Paper
                                square
                                {...options.containerProps}
                                style={{
                                    width: this.popperNode
                                        ? this.popperNode.clientWidth
                                        : null
                                }}
                            >
                                {options.children}
                            </Paper>
                        </Popper>
                    )}
                />
            </div>
        );
    }
}

export default withStyles(styles)(AutoComplete);
