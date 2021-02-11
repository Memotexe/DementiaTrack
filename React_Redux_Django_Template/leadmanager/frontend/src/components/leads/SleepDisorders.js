import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../../stylesheets/SleepDisorders.css";
import sleepPic from "../../../tests/images/bed-sleep.png";

/**This is where the site for the Sleep Disorders
 * part of the project. So with this, you can
 * utilize the javascript libraries to produce
 * or tailor this page to the Sleep Disorders
 * Symptom of dementia.
 **/

export class SleepDisorders extends Component {
  render() {
    return (
      <div id="page">
        <h1 id="title">
          <b>Sleep Disorders</b>
        </h1>
        <hr style={{ backgroundColor: "#6699CC" }} />
        <Overview />
        <div id="overview">
          <SleepLocal />
          <SleepDB />
        </div>
      </div>
    );
  }
}

class Overview extends React.Component {
  render() {
    return (
      <div id="overview">
        <h2>
          <b>Purpose Statement</b>
        </h2>
        <hr style={{ backgroundColor: "#6699CC" }} />
        <p>
          The purpose of this page is to utilize algorithms used to detect the
          stages of sleep to identify if the patient is showing issues in their
          sleep schedule. A sleep schedule of a patient gives a picture into how
          the patient's brain is able to recover in sleep. If issues in sleep
          arise issues in the brain may also arise showing signs of diseases
          like Dementia.
        </p>
        <img id="pic" src={sleepPic}></img>
      </div>
    );
  }
}

class SleepLocal extends React.Component {
  render() {
    return (
      <div id="set">
        <h4>
          <b> Local Analysis: </b>
        </h4>

        <button type="button">Analyze!</button>
        <br></br>
        <br></br>
      </div>
    );
  }
}

class SleepDB extends React.Component {
  render() {
    return (
      <div id="set">
        <h4>
          <b> Database Analysis: </b>
        </h4>
        <h5>Start Date:</h5>
        <input
          type="date"
          id="start"
          name="starting-date"
          min="1990-01-01"
          max="2020-12-31"
        ></input>
        <br></br>
        <h5>End Date:</h5>
        <input
          type="date"
          id="end"
          name="ending-date"
          min="1990-01-01"
          max="2020-12-31"
        ></input>
        <br></br>
        <br></br>

        <button type="button">Analyze!</button>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default SleepDisorders;
