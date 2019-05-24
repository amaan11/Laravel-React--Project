import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "./Menu";
const drawerWidth = 180;

const styles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    },
    btn: {
        color: "white",
        margin: "0 20px 0 1200px"
    },
    signupBtn: {
        color: "white"
    }
});

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        open: false
    };

    drawerEventHandler = text => {
        if (text == "Sign Out") {
            this.signOutHandler();
        }
    };

    mouseOver = event => {
        var element = document.getElementById("button");
        var e = document.getElementById("signupBtn");

        e.style.color = "white";
        element.style.color = "white";
    };
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    signOutHandler = () => {
        // console.log(Auth->user());
    };

    render() {
        const { classes, theme } = this.props;
        const { open } = this.state;
        const data = this.props.location.state.value;

        // console.log("data", data.firstname);

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                open && classes.hide
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <a
                            href="/login"
                            className={classes.btn}
                            onMouseOver={this.mouseOver}
                            id="button"
                        >
                            Login
                        </a>
                        <a
                            href="signup"
                            className={classes.signupBtn}
                            onMouseOver={this.mouseOver}
                            id="signupBtn"
                        >
                            Signup
                        </a>
                        <Typography variant="h6" color="inherit" noWrap />
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <List>
                            {["Hello" + " " + data.firstname].map(
                                (text, index) => (
                                    <ListItem button key={text}>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                )
                            )}{" "}
                        </List>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === "ltr" ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    </div>
                    <Divider />

                    <List>
                        {["Book Flight"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {[
                            "My Profile",
                            "My Bookings",
                            "About Us",
                            "Sign Out"
                        ].map((text, index) => (
                            <ListItem
                                button
                                key={text}
                                onClick={() => this.drawerEventHandler(text)}
                            >
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <div />
                    <Menu />
                </main>
            </div>
        );
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(HomePage);
