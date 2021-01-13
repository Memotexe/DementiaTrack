import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**This is the design page for the Dashboard.js file,
 * and the information and style put in this exported 
 * class will be used to design and set the style of the 
 * dashboard.
 **/

export class DBContents extends Component{
    render(){
        return(
            <div>
                <h2>
                    Dashboard
                </h2>
                <img></img>
                <h5>
                    Welcome to the DementiaTrack Web Application. Click one of the links below to head to the symptom you wish to analyze of the patient, or select from the navigation bar above:
                </h5>
                <ul>
                    <li>Wandering/Pacing</li>
                    <li>Sleep Disorders</li>
                    <li>Urinary Tract Infection</li>
                    <li>Daily Activities</li>
                </ul>
            </div>
        )
    }
}

export default DBContents;
