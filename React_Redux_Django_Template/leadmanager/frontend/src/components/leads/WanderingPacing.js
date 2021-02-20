import React, { Component } from "react";
import ScrollableTable from "../helpers/ScrollableTable";
import ImageCarousel from "../helpers/ImageCarousel";
import "../../../stylesheets/UTI.css";
import Repository from "../../../backend-connection/repository";
import { v4 as uuidv4 } from "uuid";
import daysjs from "dayjs";

export class WanderingPacing extends Component {
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

    let responseMovement = await repo.GetLocationOccurences("Location");

    this.setState({
      bathroomAnomalies: responseMovement.Results,
      lastruntime: daysjs().format("YYYY-MM-DD hh:mm:ss A"),
    });
  };

  render() {
    return (
      <div id="page">
        <h1 id="title">Movement Patterns</h1>
        <Overview
          bathroomAnomalyCount={this.state.bathroomAnomalies.length - 1}
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
        <h3>Movement Analysis</h3>
        <h4>Occurences</h4>
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
        <hr style={{ backgroundColor: "#6699CC", borderWidth: "2px" }} />
        <p>Data last updated: {this.props.time}</p>
        <p>Pacing: {this.props.bathroomAnomalyCount}</p>
        <p>Lapping: </p>
        <p>Direct: </p>
        <p>Random: </p>
      </div>
    );
  }
}

export default WanderingPacing;
