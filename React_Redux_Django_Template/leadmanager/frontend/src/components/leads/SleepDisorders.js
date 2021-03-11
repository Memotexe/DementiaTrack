import React, { Component } from "react";
import ImageCarousel from "../helpers/ImageCarousel";
import "../../../stylesheets/Sleep.css";
import Repository from "../../../backend-connection/repository";
import { v4 as uuidv4 } from "uuid";
import daysjs from "dayjs";

export class SleepDisorders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      normal_anomalies: [],
      bad_anomalies: [],
      random_anomalies: [],
      src: "",
      Normal_Image: "",
      Bad_Image: "",
      Random_Image: "",
      lastruntime: "",
    };

    this.defaultData = ["No data to show"];
    this.defaultHeaders = ["Column 1"];
  }

  clicked = async () => {
    let repo = new Repository();

    let responseSleep = await repo.GetSleepAnomalies();

    this.setState({
      normal_anomalies: responseSleep.Normal_Anomalies,
      bad_anomalies: responseSleep.Bad_Anomalies,
      random_anomalies: responseSleep.Random_Anomalies,
      Normal_Image: responseSleep.Normal_Image,
      Bad_Image: responseSleep.Bad_Image,
      Random_Image: responseSleep.Random_Image,
      lastruntime: daysjs().format("YYYY-MM-DD hh:mm:ss A"),
    });
  };

  render() {
    return (
      <div id="page">
        <h1 id="title">Sleep Anomalies</h1>
        <Overview
          Normal_Anomaly={this.state.normal_anomalies}
          Bad_Anomaly={this.state.bad_anomalies}
          Random_Anomaly={this.state.random_anomalies}
          time={this.state.lastruntime}
          key={uuidv4()}
        />
        <Analyzer clicked={this.clicked} />
        <div id="symptomContainer">
            <SleepSummaryReport
                normal_image={this.state.Normal_Image}
                bad_image={this.state.Bad_Image}
                random_image={this.state.Random_Image}
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
    return (
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

class SleepSummaryReport extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="symptom">
        <h2 id="GraphTitle">Sleep Graphical Report</h2>
        <ImageCarousel
          key={uuidv4()}
          images={[
            <img
              src={`data:image/png;base64,${this.props.normal_image}`}
              className="graphImage"
            />,
            <img
              src={`data:image/png;base64,${this.props.bad_image}`}
              className="graphImage"
            />,
            <img
              src={`data:image/png;base64,${this.props.random_image}`}
              className="graphImage"
            />,
          ]}
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
        <hr style={{ backgroundColor: "#6699CC", borderWidth: "2px" }} />
        <p>Data last updated: {this.props.time}</p>
        <p>Normal Average Percent Time Asleep: {this.props.Normal_Anomaly[0]}%</p>
        <p>Normal Total Wake Bouts: {this.props.Normal_Anomaly[1]}</p>
        <p>Bad Average Percent Time Asleep: {this.props.Bad_Anomaly[0]}%</p>
        <p>Bad Total Wake Bouts: {this.props.Bad_Anomaly[1]}</p>
        <p>Random Average Percent Time Asleep: {this.props.Random_Anomaly[0]}%</p>
        <p>Random Total Wake Bouts: {this.props.Random_Anomaly[1]}</p>
      </div>
    );
  }
}

export default SleepDisorders;