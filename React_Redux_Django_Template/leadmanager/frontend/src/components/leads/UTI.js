import React, { Component } from "react";
import ScrollableTable from "../helpers/ScrollableTable";
import ImageCarousel from "../helpers/ImageCarousel";
import tempPic from "../../../tests/images/temp.png";
import tripsPic from "../../../tests/images/bathroom.png";
import "../../../stylesheets/UTI.css";

export class UTI extends Component {
  render() {
    return (
      <div id="page">
        <h1 id="title">Urinary Tract Infection</h1>
        <Overview />
        <div id="symptomContainer">
          <BathroomTrips />
          <BodyTemperature />
        </div>
      </div>
    );
  }
}

class BathroomTrips extends React.Component {
  render() {
    return (
      <div className="symptom">
        <h3>Bathroom Trips</h3>
        <h4>Anomalies</h4>
        <ScrollableTable
          headings={["Date", "Time"]}
          data={[
            { date: "1/11/19", time: "1:30 AM" },
            { date: "1/11/19", time: "1:30 PM" },
            { date: "1/11/19", time: "1:30 PM" },
            { date: "1/11/19", time: "1:30 PM" },
            { date: "1/11/19", time: "1:30 PM" },
            { date: "1/11/19", time: "1:30 PM" },
            { date: "1/11/19", time: "1:30 PM" },
            { date: "1/11/19", time: "1:30 PM" },
            { date: "1/11/19", time: "1:30 PM" },
          ]}
        />
        <ImageCarousel
          images={[
            <img src={tempPic} className="graphImage" />,
            <img src={tripsPic} className="graphImage" />,
          ]}
        />
      </div>
    );
  }
}

class BodyTemperature extends React.Component {
  render() {
    return (
      <div className="symptom">
        <h3>Body Temperature</h3>
        <h4>Anomalies</h4>
        <ScrollableTable
          headings={["Date", "Time"]}
          data={[
            { date: "1/11/19", time: "1:30 AM" },
            { date: "1/11/19", time: "1:30 PM" },
            { date: "1/11/19", time: "1:30 PM" },
            { date: "1/11/19", time: "1:30 PM" },
            { date: "1/11/19", time: "1:30 PM" },
            { date: "1/11/19", time: "1:30 PM" },
            { date: "1/11/19", time: "1:30 PM" },
            { date: "1/11/19", time: "1:30 PM" },
            { date: "1/11/19", time: "1:30 PM" },
          ]}
        />
        <ImageCarousel
          images={[
            <img src={tempPic} className="graphImage" />,
            <img src={tripsPic} className="graphImage" />,
            <img src={tripsPic} className="graphImage" />,
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
        <hr style={{ backgroundColor: "#6699CC" }} />
        <p>Data last updated: 8:00 PM 1/13/21</p>
        <p>Bathroom Trip Anomalies: 0</p>
        <p>Body Temperature Anomalies: 0</p>
      </div>
    );
  }
}

export default UTI;
