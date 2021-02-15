import { faBoxTissue } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import Repository from "../../../backend-connection/repository";

export class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: [],
      start: "",
      end: ""
    };
  }

  setStart = (e) => {
    let start = e.target.value;

    this.setState({ start });
  }

  setEnd = (e) => {
    let end = e.target.value;

    this.setState({ end });
  }

  clicked = async () => {
    let repo = new Repository();

    let response = await repo.testBackendConnection(this.state.start, this.state.end);

    this.setState({
      result: response.Test,
    });
  }

  render() {
    return (
      <div>
        <h1>Test</h1>
        <span>Enter Command: </span>
        <input type="text" name="args"></input>
        <br />
        <button onClick={this.clicked}>Run</button>
        <p>Result: {this.state.result}</p>
        <h5>Start Date:</h5>
        <input 
          onChange={this.setStart}
          type="date"
          id="start"
          name="starting-date"
          min="01/01/1990"
          max="12/31/2020"
        ></input>
        <br></br>
        <h5>End Date:</h5>
        <input
          onChange={this.setEnd}
          type="date"
          id="end"
          name="ending-date"
          min="1990-01-01"
          max="2020-12-31"
        ></input>
      </div>
    );
  }
}

export default Test;
