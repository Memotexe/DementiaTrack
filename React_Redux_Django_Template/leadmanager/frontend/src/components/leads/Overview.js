import { faBoxTissue } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import Repository from "../../../backend-connection/repository";
import "../../../stylesheets/Overview.css";

export class Overview extends Component {
  constructor(props) {
    super(props)

    this.state = {
        exampleSymptomDetermination: "",
        exampleSymptomFlag: ""
    }
  }

  clicked = async () => {
    let exampleResultRaisedFlag = await this.updateExampleSymptom();

    if (exampleResultRaisedFlag == true) {
        // send notification
    }
  };

  updateExampleSymptom = async () => {
    let isFlag = false;

    let repo = new Repository();

    let dataTypeToRun = document.getElementById("dropdown").value;

    let result = await repo.GetUTIAnomalies(dataTypeToRun);

    if(result.wasBad == true) {
        isFlag = true
    }

    this.setState({
      exampleSymptomDetermination: result.Determination,
      exampleSymptomFlag: result.wasBad
    });

    return isFlag;
  }

  render() {
      return (
          <div>
              <h1 id="title">Overview</h1>
              <Summary />
              <Analyzer />
              <ExampleSymptom determination={this.state.exampleSymptomDetermination} flag={this.state.exampleSymptomFlag} />
          </div>
      )
  }
}

class Summary extends React.Component {
    render() {
      return (
        <div id="overview">
          <h3>Summary</h3>
          <hr style={{ backgroundColor: "#6699CC", borderWidth: "2px" }} />
          <p>Some nice text of the result could go here.</p>
          {this.props.time != "" && 
            <p>Time of Analysis: {this.props.time}</p>
          }
          <p>{this.props.result}</p>
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

class ExampleSymptom extends React.Component {
    constructor(props) {
        super(props);
    }

    /* Default dot is white
     * Red is rgb(249, 21, 47)
     * Green is rgb(39, 232, 51)
     */
    render() {
        return (
            <div id="overview">
                <div className="overviewSymptom">
                    {!this.props.exampleSymptomFlag && 
                        <span className="dot" style={{ backgroundColor : "white" }} />
                    }

                    {this.props.exampleSymptomFlag == true && 
                        <span className="dot" style={{ backgroundColor : "rgb(249, 21, 47)" }} />
                    }

                    {this.props.exampleSymptomFlag == false && 
                        <span className="dot" style={{ backgroundColor : "rgb(39, 232, 51)" }} />
                    }

                    <div className="overviewSymptomTextContainer">
                        <h3>Example Symptom</h3>

                        {!this.props.exampleSymptomDetermination && 
                            <p>Please analyze to see results</p>
                        }

                        {this.props.exampleSymptomDetermination && 
                            <p>{this.props.exampleSymptomDetermination}</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Overview;
