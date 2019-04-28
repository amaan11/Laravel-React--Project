import { FETCH_USER, NEW_USER } from "../action/types";
import { TabContent } from "react-bootstrap";

const intialState = {
    user: {},
    newUser: {}
};

export default function(state = intialState, action) {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                user: action.payload
            };
        case NEW_USER:
        return {
            ...state,
            newuser:action.payload
        }
        default:
            return state;
    }
}
