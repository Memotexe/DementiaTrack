import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

/**
 * In order to use Redux, everysite needs to have this
 * file in their directory system. A store is the neccessary
 * component of having the Redux respond with Django and react
 * and create/give some of the many prebuilt libraries and functions
 * the capability of functioning within the web application.
 **/
