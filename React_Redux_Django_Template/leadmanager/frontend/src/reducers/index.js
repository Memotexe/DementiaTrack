import {combineReducers } from 'redux'
import leads from './leads';
import auth from "./auth";

/** This is here to control functions through redux and helps
 * when you need to split the reducing function into seperate
 * functions. Helping manage each of the states with this.
 **/

export default combineReducers({
    leads,
    auth
});
