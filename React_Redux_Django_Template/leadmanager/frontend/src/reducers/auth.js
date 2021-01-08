import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../actions/types";

/**This initialstate is set to be null because when 
 * the user goes to access the web application, if
 * they are not logged in, we do not want them to access
 * the application.
 *
 * */

const initialState={
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

/**This function is used to place a switch case for
 * the login and register features along with the
 * logout feature. So if they login the state is changed
 * to that of a logged in user. Same is for if a user
 * logs out, they will be redirected to a login screen.
 *
 *
 * @param {state} : State is used to find out if the user is logged in,
 * logged out, successfully registered, or failed to login in or logout.
 * @param {action} This is used to say what action is being done and in return
 * sends back the state of the user based on whether the action was successful or not.
 *
 *
 *
 *
 *
 * */

export default function(state=initialState,action){
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                isLoading:true
            };
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isLoading:false
            };

        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}
