import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from '../../actions/auth'



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
                    <Link to="" className="nav-link" >Sleep Disorders</Link>
                </li>
                <li className="nav-item">
                    <Link to="" className="nav-link" >UTI</Link>
                </li>
                <li className="nav-item">
                    <Link to="" className="nav-link" >Daily Activities</Link>
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
