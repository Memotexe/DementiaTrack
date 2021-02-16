import React, { Component } from "react";
import ScrollableTable from "../helpers/ScrollableTable";
import ImageCarousel from "../helpers/ImageCarousel";
import "../../../stylesheets/UTI.css";
import Repository from "../../../backend-connection/repository";
import { v4 as uuidv4 } from "uuid";
import daysjs from "dayjs";

export class UTI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anomalies: "",
      src: "",
      bathroomAnomalies: [
        { date: "", time: "", count: "" },
      ],
      bathroomImages: [],
      temperatureAnomalies: [
        { date: "", time: "" },
      ],
      temperatureImage: "",
      lastruntime: "",
    };

    this.defaultData = ["No data to show"];
    this.defaultHeaders = ["Column 1"];
  }

  clicked = async () => {
    let repo = new Repository();

    let responseBathroom = await repo.GetBathroomTripAnomalies("Bathroom");
    let responseTemperature = await repo.GetTemperatureAnomalies("Temperature");

    this.setState({
      bathroomAnomalies: responseBathroom.Anomalies,
      bathroomImages: responseBathroom.Images,
      temperatureAnomalies: responseTemperature.Anomalies,
      temperatureImage: responseTemperature.Image,
      lastruntime: daysjs().format("YYYY-MM-DD hh:mm:ss A"),
    });
  };

  render() {
    return (
      <div id="page">
        <h1 id="title">Urinary Tract Infection</h1>
        <Overview
          bathroomAnomalyCount={this.state.bathroomAnomalies.length - 1}
          temperatureAnomalyCount={this.state.temperatureAnomalies.length - 1}
          time={this.state.lastruntime}
          key={uuidv4()}
        />
        <Analyzer clicked={this.clicked} />
        <div id="symptomContainer">
          <BathroomTrips
            images={this.state.bathroomImages}
            data={this.state.bathroomAnomalies}
            headings={["Date", "Time", "Count"]}
            key={uuidv4()}
          />
          <BodyTemperature
            image={this.state.temperatureImage}
            data={this.state.temperatureAnomalies}
            headings={["Time", "Temperature"]}
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

class BathroomTrips extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="symptom">
        <h3>Bathroom Trips</h3>
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

class BodyTemperature extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="symptom">
        <h3>Body Temperature</h3>
        <h4>Anomalies</h4>
        <ScrollableTable
          headings={this.props.headings}
          data={this.props.data}
          key={uuidv4()}
        />
        <ImageCarousel
          key={uuidv4()}
          images={[
            <img
              src={`data:image/png;base64,${this.props.image}`}
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
        <p>Bathroom Trip Anomalies: {this.props.bathroomAnomalyCount}</p>
        <p>Body Temperature Anomalies: {this.props.temperatureAnomalyCount}</p>
      </div>
    );
  }
}

export default UTI;
