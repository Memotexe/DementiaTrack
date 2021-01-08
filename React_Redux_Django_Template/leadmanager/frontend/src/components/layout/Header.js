import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from '../../actions/auth'

/**
 * This Header is what it sounds like, this is the top
 * navigation bar for the web application, this will be at the 
 * top of the site and will allow the user to cycle throughout
 * the multiple symptoms and thier own seperate page.
 * With that there will be the logout button for the user to log
 * out when they do not want to be logged in anymore.
 * This will only display certain navigation items when
 * the user is logged in, and logged out. 
 *
 * The propTypes are limited to:
 *     auth: which is to check if the user is authorized.
 *     logout: is the fucntion to be used when the user clicks
 *            The logout button.
 *
 * mapStateToProps is to be used for checking on whether the account 
 * is logged in or logged out to properly display the correct components
 * of the site.
 *
 *
 *
 *
 *
 *
 *
 **/



export class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <span className="navbar-text mr-2">
                   <strong>{'Symptoms:'}</strong>
                </span>
                <li className="nav-item">
                    <a className="nav-link" href="#/wanderingpacing" >Wandering/Pacing</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#/sleepdisorders" >Sleep Disorders</a>
                </li>
                <li className="nav-item">
                    <a  className="nav-link" href="#/uti" >UTI</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#/dailyactivities" >Daily Activities</a>
                </li>



                <span className="navbar-text mr-3">
                    <strong>{user ? `|Welcome ${user.username}|`: ""}</strong>
                </span>
                <li className="nav-item">
                    <button onClick={this.props.logout} className="nav-link btn btn-info btn-sm text-light">Logout</button>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="#">DementiaTrack</a>                         
                    </div>
                    {isAuthenticated ? authLinks: guestLinks}
                </div>
            </nav>          
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
