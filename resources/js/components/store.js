import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
import logger from "redux-logger";

const intialState = {};
const middleware = [thunk];

const store = createStore(
    rootReducer,
    intialState,
    applyMiddleware(...middleware, logger)
);

export default store;
