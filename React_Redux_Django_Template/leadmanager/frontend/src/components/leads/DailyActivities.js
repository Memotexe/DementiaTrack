import React, { Component } from 'react';
import ScrollableTable from '../helpers/ScrollableTable';
import ImageCarousel from '../helpers/ImageCarousel';
import "../../../stylesheets/Symptoms.css";
import Repository from "../../../backend-connection/repository";
import { v4 as uuidv4 } from "uuid";
import daysjs from "dayjs";

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
            MiAnomalies: [{ 
                date: "", 
                Morning_Meds: "", 
                Watch_TV: "", 
                Chores: "", 
                Read: "",
                Eve_Meds: "", 
                Meditate: ""
             },
            ],
            MiImages: [],
            
            ArAnomalies: [{
                date: "",                
                meal_preparation_begin: "",
                housekeeping_begin: "",
                eating_begin: "",
                relax_begin: "",
                wash_dishes_begin: "",
                respirate_begin: "" },
            ],
            ArImages: [],
            
            RaAnomalies: [{
                date: "",               
                meal_preparation_begin: "", 
                housekeeping_begin: "", 
                eating_begin: "", 
                relax_begin: "", 
                wash_dishes_begin: "", 
                respirate_begin: "" },
            ],
            RaImages: [],
            lastruntime: "",
        };

        this.defaultData = ["No data to show"];
        this.defaultHeaders = ["Column 1"];
    }

    clicked = async () => {
        let repo = new Repository();

        let responseDAMi = await repo.GetDAMi("Milan");
        let responseDAAr = await repo.GetDAAr("Aruba");
        let responseDARa = await repo.GetDARa("Random");

        this.setState({
            MiAnomalies: responseDAMi.Anomalies,
            MiImages: responseDAMi.Images,
            ArAnomalies: responseDAAr.Anomalies,
            ArImages: responseDAAr.Images,
            RaAnomalies: responseDARa.Anomalies,
            RaImages: responseDARa.Images,
            lastruntime: daysjs().format("YYYY-MM-DD hh:mm:ss A"),
        });
    }

    render(){
        return(
            <div id="page">
                <h1 id="title">Daily Activities</h1>
                <Overview 
                    DAAnomalyCount={(this.state.MiAnomalies.length + this.state.ArAnomalies.length + this.state.RaAnomalies.length) - 3}
                    time={this.state.lastruntime}
                    key={uuidv4()}
                    std={this.state.std}  
                />
                <Analyzer clicked={this.clicked} />
                <div id="DAsymptomContainer">
                    { this.state.ArAnomalies.length <= 1 &&
                        <ArActivities
                            images={this.state.ArImages}
                            data={this.state.ArAnomalies}
                            headings={[]}
                            key={uuidv4()}
                        />
                    }
                    { this.state.ArAnomalies.length > 1 &&
                        <ArActivities
                            images={this.state.ArImages}
                            data={this.state.ArAnomalies}
                            headings={["Date", "Meal Preparation", "Housekeeping", "Eating", "Relax", "Wash Dishes", "Respiration"]}
                            key={uuidv4()}
                        />
                    }

                    { this.state.MiAnomalies.length <= 1 &&
                        <MiActivities
                            images={this.state.MiImages}
                            data={this.state.MiAnomalies}
                            headings={[]}
                            key={uuidv4()}
                        />
                    }

                    { this.state.MiAnomalies.length > 1 &&
                        <MiActivities
                            images={this.state.MiImages}
                            data={this.state.MiAnomalies}
                            headings={["Date", "Morning Meds", "Watch TV", "Chores", "Read", "Evening Meds", "Meditate"]}
                            key={uuidv4()}
                        />
                    }
                    
                    { this.state.RaAnomalies.length <= 1 &&
                        <RaActivities
                            images={this.state.RaImages}
                            data={this.state.RaAnomalies}
                            headings={[]}
                            key={uuidv4()}
                        />
                    } 
                    
                    { this.state.RaAnomalies.length > 1 &&
                        <RaActivities
                            images={this.state.RaImages}
                            data={this.state.RaAnomalies}
                            headings={["Date", "Meal Preparation", "Housekeeping", "Eating", "Relax", "Wash Dishes", "Respiration"]}
                            key={uuidv4()}
                        />
                    } 
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
                <hr style={{ backgroundColor: "#6699CC", borderWidth: "2px" }} />
                <button onClick={this.props.clicked} className="button">
                    {"Run"}
                </button>

            </div>
        );
    }
}

class ArActivities extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="symptom">
                <h3>Aruba Daily Activities</h3>
                <h4>Aruba Anomalies</h4>
                <ScrollableTable
                    headings={this.props.headings}
                    data={this.props.data}
                    key={uuidv4()}
                />
                {this.props.images.length != 0 && 
                    <ImageCarousel
                        key={uuidv4()}
                        images=
                            {this.props.images.map((image) => (
                            <img
                                src={`data:image/png;base64,${image}`}
                                className="graphImageSquare"
                            />
                        ))}
                    />
                }
            </div>
        );
    }
}

class MiActivities extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="symptom">
                <h3>Milan Daily Activities</h3>
                <h4>Milan Anomalies</h4>
                <ScrollableTable
                    headings={this.props.headings}
                    data={this.props.data}
                    key={uuidv4()}
                />
                {this.props.images.length != 0 && 
                    <ImageCarousel
                        key={uuidv4()}
                        images=
                            {this.props.images.map((image) => (
                            <img
                                src={`data:image/png;base64,${image}`}
                                className="graphImageSquare"
                            />
                        ))}
                    />
                }
            </div>
        );
    }
}

class RaActivities extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="symptom">
                <h3>Random Dataset Daily Activities</h3>
                <h4>Random Anomalies</h4>
                <ScrollableTable
                    headings={this.props.headings}
                    data={this.props.data}
                    key={uuidv4()}
                />
                {this.props.images.length != 0 && 
                    <ImageCarousel
                        key={uuidv4()}
                        images=
                            {this.props.images.map((image) => (
                            <img
                                src={`data:image/png;base64,${image}`}
                                className="graphImageSquare"
                            />
                        ))}
                    />
                }
            </div>
        );
    }
}

class Overview extends React.Component {
    render() {
        return (
          <div id="overview">
            <h3>Symptom Summary</h3>
            <hr style={{ backgroundColor: "#6699CC", borderWidth: "2px" }} />
            <p>Data last updated: {this.props.time}</p>
            <p>Daily Activity Anomalies: {this.props.DAAnomalyCount}</p>
          </div>
        );
    }
}

export default DailyActivities;
