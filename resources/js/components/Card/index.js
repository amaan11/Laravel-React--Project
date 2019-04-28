import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Button } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";

const styles = {
    card: {
        maxWidth: 150
    },
    media: {
        margin: "20px 0 10px 20px",
        width: 60
    }
};

class ImgMediaCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className={styles.card}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.name}
                        </Typography>
                        <Typography variant="h6" component="h2">
                            <i
                                class="fas fa-rupee-sign"
                                style={{ marginRight: 10 }}
                            />
                            {this.props.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        variant="primary"
                        onClick={() =>
                            this.props.addonsHandler(this.props.price)
                        }
                    >
                        Add
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

ImgMediaCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImgMediaCard);
