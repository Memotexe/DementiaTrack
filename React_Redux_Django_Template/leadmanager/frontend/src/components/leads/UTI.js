import React, { Component } from "react";
import ScrollableTable from "../helpers/ScrollableTable";
import ImageCarousel from "../helpers/ImageCarousel";
import "../../../stylesheets/Symptoms.css";
import Repository from "../../../backend-connection/repository";
import { v4 as uuidv4 } from "uuid";
import daysjs from "dayjs";
import DetermineUTI from "../../../backend-connection/DetermineUTI";

export class UTI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anomalies: "",
      src: "",
      bathroomAnomalies: [
        { Date: " ", Time: " ", Count: " " },
        { Date: " ", Time: " ", Count: " " },
        { Date: " ", Time: " ", Count: " " },
        { Date: " ", Time: " ", Count: " " },
        { Date: " ", Time: " ", Count: " " },
      ],
      temperatureAnomalies: [
        { Date: " ", Time: " ", Temperature: " " },
        { Date: " ", Time: " ", Temperature: " " },
        { Date: " ", Time: " ", Temperature: " " },
        { Date: " ", Time: " ", Temperature: " " },
        { Date: " ", Time: " ", Temperature: " " },
      ],
      bathroomAnomalyCount: 0,
      tempAnomalyCount: 0,
      images: [],
      lastruntime: "",
    };

    this.defaultData = ["No data to show"];
    this.defaultHeaders = ["Column 1"];
  }

  clicked = async () => {
    let repo = new Repository();

    let dataTypeToRun = document.getElementById("dropdown").value;

    let response = await repo.GetUTIAnomalies(dataTypeToRun);
    let bathroomAnomalies = response.BathroomAnomalies;
    let tempAnomalies = response.TempAnomalies;

    let det = new DetermineUTI();
    let result = det.getDetermination(bathroomAnomalies, tempAnomalies, 30);

    // insert blank rows to populate table
    let diffBathroom = 5 - bathroomAnomalies.length;
    let diffTemp = 5 - tempAnomalies.length;

    for (let i = 0; i < diffBathroom; i++) {
      bathroomAnomalies.push({ Date: " ", Time: " ", Count: " " });
    }

    for (let i = 0; i < diffTemp; i++) {
      tempAnomalies.push({ Date: " ", Time: " ", Temperature: " " });
    }

    this.setState({
      bathroomAnomalies: bathroomAnomalies,
      temperatureAnomalies: tempAnomalies,
      bathroomAnomalyCount: response.BathroomAnomalyCount,
      tempAnomalyCount: response.TempAnomalyCount,
      images: response.Images,
      lastruntime: daysjs().format("YYYY-MM-DD hh:mm:ss A"),
      determination: result.Determination,
    });
  };

  render() {
    return (
      <div id="page">
        <h1 id="title">Urinary Tract Infection</h1>
        <Overview
          bathroomAnomalyCount={this.state.bathroomAnomalyCount}
          temperatureAnomalyCount={this.state.tempAnomalyCount}
          time={this.state.lastruntime}
          key={uuidv4()}
          result={this.state.determination}
        />
        <Analyzer clicked={this.clicked} />
        <div id="symptomContainer">
          <Symptoms
            images={this.state.images}
            dataBathroom={this.state.bathroomAnomalies}
            headingsBathroom={["Date", "Time", "Count"]}
            dataTemp={this.state.temperatureAnomalies}
            headingsTemp={["Date", "Time", "Temperature"]}
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
        <select id="dropdown">
          <option value="Normal">Normal</option>
          <option value="Abnormal">Abnormal</option>
          <option value="Random">Random</option>
        </select>
        <br />
        <button onClick={this.props.clicked} className="button">
          {"Run"}
        </button>
      </div>
    );
  }
}

class Symptoms extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="symptom">
        <div id="tableContainer">
          <div>
            <h3>Bathroom Trips</h3>
            <h4>Anomalies</h4>
            <ScrollableTable
              className="table"
              headings={this.props.headingsBathroom}
              data={this.props.dataBathroom}
              key={uuidv4()}
            />
          </div>
          <div>
            <h3>Body Temperature</h3>
            <h4>Anomalies</h4>
            <ScrollableTable
              className="table"
              headings={this.props.headingsTemp}
              data={this.props.dataTemp}
              key={uuidv4()}
            />
          </div>
        </div>
        {this.props.images.length != 0 && (
          <ImageCarousel
            key={uuidv4()}
            images={this.props.images.map((image) => (
              <img
                src={`data:image/png;base64,${image}`}
                className="graphImageLong"
              />
            ))}
          />
        )}
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
        <p>Bathroom Trip Anomalies: {this.props.bathroomAnomalyCount}</p>
        <p>Body Temperature Anomalies: {this.props.temperatureAnomalyCount}</p>
        {this.props.time != "" && <p>Time of Analysis: {this.props.time}</p>}
        <p>{this.props.result}</p>
      </div>
    );
  }
}

export default UTI;
