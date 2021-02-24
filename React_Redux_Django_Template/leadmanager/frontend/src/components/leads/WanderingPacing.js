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
        Pacing: "",
        Lapping: "",
        Direct: "",
        Random: "",
        Chart: "",
        lastruntime: "",
    };

    this.defaultData = ["No data to show"];
    this.defaultHeaders = ["Column 1"];
  }

  clicked = async () => {
    let repo = new Repository();

    let responseMovement = await repo.GetLocationOccurences("Location");

    this.setState({
        Pacing: responseMovement.Pacing,
        Lapping: responseMovement.Lapping,
        Direct: responseMovement.Direct,
        Random: responseMovement.Random,
        Chart: responseMovement.Image,
        lastruntime: daysjs().format("YYYY-MM-DD hh:mm:ss A"),
    });
  };

  render() {
    return (
      <div id="page">
        <h1 id="title">Movement Patterns</h1>
        <Overview
          time={this.state.lastruntime}
          pacing={this.state.Pacing}
          lapping={this.state.Lapping}
          direct={this.state.Direct}
          random={this.state.Random}
          
          key={uuidv4()}
        />
        <Analyzer clicked={this.clicked} />
        <div id="symptomContainer">
            <BathroomTrips
                image={this.state.Chart}
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
        <h4>Percentage of Occurences</h4>
        <p>Data last updated: {this.props.time}</p>
        <p>Pacing: {this.props.pacing} %</p>
        <p>Lapping:{this.props.lapping} %</p>
        <p>Direct: {this.props.direct} %</p>
        <p>Random: {this.props.random} %</p>
      </div>
    );
  }
}

export default WanderingPacing;
