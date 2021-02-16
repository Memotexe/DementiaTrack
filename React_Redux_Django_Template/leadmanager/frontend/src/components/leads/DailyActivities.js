import React, { Component } from 'react';
import ScrollableTable from '../helpers/ScrollableTable';
import ImageCarousel from '../helpers/ImageCarousel';
import arubaPic from '../../../tests/images/DA-aruba.png';
import milanPic from '../../../tests/images/DA-milan.png';
import mockPic from '../../../tests/images/DA-mock.png';
import mock_2Pic from '../../../tests/images/DA-mock_2.png';
/* import tripsPic from '../../../tests/images/bathroom.png'; */

import '../../../stylesheets/DailyActivities.css';

/**This is where the site for the Daily Activities
 * part of the project. So with this, you can 
 * utilize the javascript libraries to produce 
 * or tailor this page to the Daily Activities
 * Symptom of dementia.
 **/

export class DailyActivities extends Component{
    constructor(props) {
        super(props);

        this.state = {
            std: 2,
            aruba_anom: 0,
            mil_anom: 20,
            mock_anom: 2,
            mock_anom_2: 0,
        };
    }

    render(){
        return(
            <div id="page">
                <h1 id="title">Daily Activities</h1>
                <Overview std={this.state.std} anom1={this.state.aruba_anom} anom2={this.state.mil_anom} anom3={this.state.mock_anom} anom4={this.state.mock_anom_2} />
                <div id="symptomContainer">
                    <ActivitiesAruba anom={this.state.aruba_anom}/>
                    <ActivitiesMilan anom={this.state.mil_anom}/>
                    <ActivitiesMock anom={this.state.mock_anom}/>
                    <ActivitiesMock_2 anom={this.state.mock_anom_2}/>
                </div>
            </div>
        )
    }
}

class Overview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    
    render() {
        return (
            <div id="overview">
                <h3>Summary</h3>
                <hr style={{backgroundColor: "#9954bb"}}/>
                <p>Data last updated: 6:16 PM 01/20/21</p>
                <p>Aruba Anomalies: {this.props.anom1}</p>
                <p>Milan Anomalies: {this.props.anom2}</p>
                <p>Mock Anomalies: {this.props.anom3}</p>
                <p>Mock_2 Anomalies: {this.props.anom4}</p>
                <p>Standard Deviation: 
                    <select name="Standard Deviation" id="std">
                        <option value="1">1</option>
                        <option value="1.25">1.25</option>
                        <option value="1.5">1.5</option>
                        <option value="1.75">1.75</option>
                        <option value="2">2</option>
                        <option value="2.25">2.25</option>
                        <option value="2.5">2.5</option>
                        <option value="2.75">2.75</option>
                        <option value="3">3</option>
                    </select>
                </p>
            </div>
        )
    }
}


/*
<ScrollableTable headings={["Date", "Time"]} data={[{}]} /> 
date: "1/11/19", time: "1:30 AM" 
*/
class ActivitiesAruba extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="symptom">
                <h3>Activities Aruba</h3>
                <h4>Anomalies</h4>
                {this.props.anom > 1 &&
                    <ScrollableTable headings={["Date", "Time"]} data={[{}]} /> 
                }
                <ImageCarousel images={[<img src={arubaPic} className="graphImage" />, <img src={arubaPic} className="graphImage"/>]}/>
            </div>
        )
    }
}

class ActivitiesMilan extends React.Component {
    render() {
        return (
            <div className="symptom">
                <h3>Activities Milan</h3>
                <h4>Anomalies</h4>
                {this.props.anom > 0 &&
                    <ScrollableTable headings={["Date"]} 
                        data={[{date: "10/29/2009"},
                        {date: "10/31/2009"},
                        {date: "11/01/2009"},
                        {date: "11/02/2009"},
                        {date: "11/03/2009"},
                        {date: "11/04/2009"},
                        {date: "11/05/2009"},
                        {date: "11/06/2009"},
                        {date: "11/07/2009"},
                        {date: "11/08/2009"},
                        {date: "11/09/2009"},
                        {date: "11/10/2009"},
                        {date: "11/11/2009"},
                        {date: "11/12/2009"},
                        {date: "11/13/2009"},
                        {date: "11/14/2009"},
                        {date: "11/15/2009"},
                        {date: "11/16/2009"},
                        {date: "11/17/2009"}]} /> 
                }
                
                <ImageCarousel images={[<img src={milanPic} className="graphImage" />, <img src={milanPic} className="graphImage"/>]}/>
            </div>
        )
    }
}

class ActivitiesMock extends React.Component {
    render() {
        return (
            <div className="symptom">
                <h3>Activities Mock</h3>
                <h4>Anomalies</h4>
                {this.props.anom > 0 &&
                    <ScrollableTable headings={["Date"]} 
                        data={[{date: "07/09/2010"},
                        {date: "07/10/2010"}]} />
                }

                
                <ImageCarousel images={[<img src={mockPic} className="graphImage" />, <img src={mockPic} className="graphImage"/>]}/>
            </div>
        )
    }
}


/*
<ScrollableTable headings={["Date", "Time"]} data={[{}]} /> 
*/
class ActivitiesMock_2 extends React.Component {
    render() {
        return (
            <div className="symptom">
                <h3>Activities Mock_2</h3>
                <h4>Anomalies</h4>
                {this.props.anom > 1 &&
                    <ScrollableTable headings={["Date", "Time"]} data={[{}]} /> 
                }
                <ImageCarousel images={[<img src={mock_2Pic} className="graphImage" />, <img src={mock_2Pic} className="graphImage"/>]}/>
            </div>
        )
    }
}

export default DailyActivities;
