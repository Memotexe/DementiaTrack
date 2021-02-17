import React, { Component } from 'react';
import ScrollableTable from '../helpers/ScrollableTable';
import ImageCarousel from '../helpers/ImageCarousel';
import "../../../stylesheets/DailyActivities.css";
import Repository from "../../../backend-connection/repository";
import { v4 as uuidv4 } from "uuid";
import daysjs from "dayjs";

/*
import arubaPic from '../../../tests/images/DA-aruba.png';
import milanPic from '../../../tests/images/DA-milan.png';
import mockPic from '../../../tests/images/DA-mock.png';
import mock_2Pic from '../../../tests/images/DA-mock_2.png';
import tripsPic from '../../../tests/images/bathroom.png'; 
*/

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
            anomalies: "",
            src: "",
            DAAnomalies: [
                { date: "", time: "", count: "" },
            ],
            DAImages: [],
            lastruntime: "",
        };

        this.defaultData = ["No data to show"];
        this.defaultHeaders = ["Column 1"];
    }

    clicked = async () => {
        let repo = new Repository();

        let responseDA = await repo.GetDAAnomalies("Bathroom");

        this.setState({
            DAAnomalies: responseBathroom.Anomalies,
            DAImages: responseDA.Images,
            lastruntime: daysjs().format("YYYY-MM-DD hh:mm:ss A"),
        });
    }

    render(){
        return(
            <div id="page">
                <h1 id="title">Daily Activities</h1>
                <Overview 
                    DAAnomalyCount={this.state.DAAnomalies.length - 1}
                    time={this.state.lastruntime}
                    key={uuidv4()}
                    std={this.state.std}  
                />
                <Analyzer clicked={this.clicked} />
                <div id="symptomContainer">
                    <Activities
                        images={this.state.DAImages}
                        data={this.state.DAAnomalies}
                        headings={["Date", "Time", "Count"]}
                        key={uuidv4()}
                    />
                </div>
            </div>
        );
    }
}

class Analyzer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return  (
            <div id="overview">
                <h3>Analyze</h3>
                <hr style={{backgroundColor: "#9954bb", borderWidth: "2px"}} />
                <button style={{backgroundColor: "lightcoral", borderColor: "#9954bb"}} onClick={this.props.clicked} className="button">
                    {"Run"}
                </button>
            </div>
        );
    }
}

class Activities extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="symptom">
                <h3>Daily Activities</h3>
                <h4>Anomalies</h4>
                <ScrollableTable
                    headings={this.props.headings}
                    data={this.props.data}
                    key={uuidv4()}
                />
                <ImageCarousel
                    key={uuidv4()}
                    images=
                        {this.props.images.map((image) => (
                        <img
                            src={`data:image/png;base64,${image}`}
                            className="graphImage"
                        />
                    ))}
                />
            </div>
        );
    }
}

class Overview extends React.Component {
    render() {
        return (
          <div id="overview">
            <h3>Symptom Summary</h3>
            <hr style={{ backgroundColor: "#9954bb", borderWidth: "2px" }} />
            <p>Data last updated: {this.props.time}</p>
            <p>Daily Activity Anomalies: {this.props.DAAnomalyCount}</p>
          </div>
        );
    }
}



export default DailyActivities;
