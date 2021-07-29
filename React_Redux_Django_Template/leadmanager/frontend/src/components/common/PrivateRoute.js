import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**The PrivateRoute is a feature to see on whether the
 * user is logged in properly, so by checking the components
 * along with the rest framework, the system will check if the current user
 * accessing the site is logged in with a proper token, they can maintain access
 * to the page they are on. But if the user logs out on any of
 * the sites, it will auto redirect to the user login screen
 * and hide any part that the user who doesnt have an account
 * is not allowed to see.
 *
 * The mapStateToProps performs the same action basing it on the
 * authorize state of the user, if they are properly logged in
 * this will give them access. Else they will be pushed to the login
 * screen.
 **/

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <h2>Loading...</h2>;
      } else if (!auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
