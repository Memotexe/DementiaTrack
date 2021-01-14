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
                    <li><a href="#/wanderingpacing">Wandering/Pacing</a></li>
                    <li><a href="#/sleepdisorders">Sleep Disorders</a></li>
                    <li><a href="#/uti">Urinary Tract Infection</a></li>
                    <li><a href="#/dailyactivities">Daily Activities</a></li>
                </ul>
                <h6>
                    Information about the contributors and the references can be found below at the bottom of the page. With that if you have any problems there is a help team email for any technical issues located below as well that you can contact us by.
                </h6>
            </div>
        )
    }
}

export default DBContents;
