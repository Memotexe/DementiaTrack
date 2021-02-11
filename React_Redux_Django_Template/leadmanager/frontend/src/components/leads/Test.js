import { faBoxTissue } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import Repository from "../../../backend-connection/repository";
var Buffer = require("buffer").Buffer;

export class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: "",
      argument: "",
      src: "",
    };

    this.clicked = this.clicked.bind(this);
    this.setArgument = this.setArgument.bind(this);
  }

  setArgument(e) {
    let argument = e.target.value;

    this.setState({ argument });
  }

  async clicked() {
    let repo = new Repository();

    let response = await repo.GetAnomalies(this.state.argument);

    this.setState({
      result: response.Anomalies,
      src: response.Image,
    });
  }

  render() {
    return (
      <div>
        <h1>Test</h1>
        <span>Enter Command: </span>
        <input type="text" name="args" onChange={this.setArgument}></input>
        <br />
        <button onClick={this.clicked}>Run</button>
        <p>Result: {this.state.result}</p>
        <img src={`data:image/png;base64,${this.state.src}`} alt="oops" />
        <Sum></Sum>
      </div>
    );
  }
}

class Sum extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sum: 0,
    };
  }

  add = () => {
    this.setState({ sum: this.state.sum + 1 });
  };

  subtract = () => {
    this.setState({ sum: this.state.sum - 1 });
  };

  render() {
    return (
      <div>
        <h1>Sum</h1>
        <Ranch
          somedata={"Hello World"}
          add={this.add}
          subtract={this.subtract}
        />
        <Ranch
          somedata={"Chicken Wings"}
          add={this.add}
          subtract={this.subtract}
        />
        <p>sum: {this.state.sum}</p>
      </div>
    );
  }
}

class Ranch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
    };
  }

  add = () => {
    this.setState({ num: this.state.num + 1 });

    this.props.add();
  };

  subtract = () => {
    this.setState({ num: this.state.num - 1 });

    this.props.subtract();
  };

  render() {
    return (
      <div>
        <h1>Ranch</h1>
        <p>{this.props.somedata}</p>
        <p>{this.state.num}</p>
        <button onClick={this.add}>Add Me</button>
        <button onClick={this.subtract}>Subtract Me</button>
      </div>
    );
  }
}

export default Test;
