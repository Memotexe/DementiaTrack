import React, { Component } from "react";
import Repository from "../../../backend-connection/repository";
import "../../../stylesheets/Overview.css";
import DetermineUTI from "../../../backend-connection/DetermineUTI";
import daysjs from "dayjs";
import DetermineDA from "../../../backend-connection/determineDA";

export class Overview extends Component {
  constructor(props) {
    super(props)

    this.state = {
        analysisTime: null,
        analysis: "Please analyze to see results.",
        utiDetermination: null,
        utiFlag: "",
        DAFlag: "",
    }
  }

  clicked = async () => {
    let utiFlag = await this.updateUTI();
    let DAFlag = await this.updateDA();

    this.sendNotification(utiFlag);
    this.sendNotification(DAFlag);
  };

  sendNotification = (utiFlag) => {
    /* decision logic will need to be put in here */

    let resultText = "";

    if (utiFlag == "red") {
        console.log("SEND EMAIL")
        resultText = "Severe irregularities were found.";
    }
    else if (utiFlag == "yellow") {
        console.log("RANDOM BAD")
        resultText = "Some irregularities were found.";
    }
    else {
        console.log("NOTHING TO REPORT")
        resultText = "No irregularities were found."
    }

    this.setState({
        analysisTime: daysjs().format("YYYY-MM-DD hh:mm:ss A"),
        analysis: resultText
    })
  }

  sendNotification = (DAFlag) => {
    /* decision logic will need to be put in here */

    let resultText = "";

    if (DAFlag == "red") {
        console.log("SEND EMAIL")
        resultText = "Severe irregularities were found.";
    }
    else if (DAFlag == "yellow") {
        console.log("RANDOM BAD")
        resultText = "Some irregularities were found.";
    }
    else {
        console.log("NOTHING TO REPORT")
        resultText = "No irregularities were found."
    }

    this.setState({
        analysisTime: daysjs().format("YYYY-MM-DD hh:mm:ss A"),
        analysis: resultText
    })
  }


  updateUTI = async () => {
    let flag;

    let repo = new Repository();

    let dataTypeToRun = document.getElementById("dropdown").value;

    let response = await repo.GetUTIAnomalies(dataTypeToRun);

    let det = new DetermineUTI();
    let result = det.getDetermination(response.BathroomAnomalies, response.TempAnomalies, 30);

    if (result.Score > 0) {
        flag = "red";
    }
    else if (result.Determination == "No determination can be made.") {
        flag = "yellow";
    }
    else {
        flag = "green";
    }

    this.setState({
        utiDetermination: result.Determination,
        utiFlag: flag
    })

    return flag;
  }

  updateDA = async () => {
    let flag;

    let repo = new Repository();

    let dataTypeToRun = document.getElementById("dropdown").value;

    //console.log(document.getElementById("dropdown").value);

  
    if (document.getElementById("dropdown").value == "Normal") {
      let response = await repo.GetDAAr();
      let det = new DetermineDA();
      let result = det.getDetermination(response.Anomalies, 99);

      //console.log(result);

      if (result.Determination == "No determination can be made.") {
         flag = "yellow";
      }
      else if (result.Determination == "We detected several days of irregular behavior.") {
          flag = "red";
      }
      else {
          flag = "green";
      }

      this.setState({
          DADetermination: result.Determination,
          DAFlag: flag
      })
    } 
    else if (document.getElementById("dropdown").value == "Abnormal") {
      let response = await repo.GetDAMi();
      let det = new DetermineDA();
      let result = det.getDetermination(response.Anomalies, 83);

      //console.log(result);

      if (result.Determination == "No determination can be made.") {
          flag = "yellow";
      }
      else if (result.Determination == "We detected several days of irregular behavior.") {
          flag = "red";
      }
      else {
          flag = "green";
      }

      this.setState({
          DADetermination: result.Determination,
          DAFlag: flag
      })
    } 
    else if (document.getElementById("dropdown").value == "Random") {
      let response = await repo.GetDARa();
      let det = new DetermineDA();
      let result = det.getDetermination(response.Anomalies, 99);

      //console.log(result);

      if (result.Determination == "No determination can be made.") {
          flag = "yellow";
      }
      else if (result.Determination == "We detected several days of irregular behavior.") {
          flag = "red";
      }
      else {
          flag = "green";
      }

      this.setState({
          DADetermination: result.Determination,
          DAFlag: flag
      })
    } 

    return flag;
  }

  render() {
      return (
          <div>
              <h1 id="title">Overview</h1>
              <Summary analysis={this.state.analysis} time={this.state.analysisTime} />
              <Analyzer clicked={this.clicked} />
              <UTI determination={this.state.utiDetermination} flag={this.state.utiFlag} />
              <DA determination={this.state.DADetermination} flag={this.state.DAFlag} />
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
          <p>{this.props.analysis}</p>
          {this.props.time != null && 
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

class UTI extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="overview">
                <div className="overviewSymptom">
                    {this.props.flag == "" && 
                        <span className="dot" style={{ backgroundColor : "white" }} />
                    }

                    {this.props.flag == "red" && 
                        <span className="dot" style={{ backgroundColor : "rgb(249, 21, 47)" }} />
                    }

                    {this.props.flag == "yellow" && 
                        <span className="dot" style={{ backgroundColor : "rgb(250, 219, 1)" }} />
                    }

                    {this.props.flag == "green" && 
                        <span className="dot" style={{ backgroundColor : "rgb(39, 232, 51)" }} />
                    }

                    <div className="overviewSymptomTextContainer">
                        <h3>UTI</h3>

                        {this.props.determination == null && 
                            <p>Please analyze to see results.</p>
                        }

                        {this.props.determination && 
                            <p>{this.props.determination}</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

class DA extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
      return (
          <div id="overview">
              <div className="overviewSymptom">
                  {this.props.flag == "" && 
                      <span className="dot" style={{ backgroundColor : "white" }} />
                  }

                  {this.props.flag == "red" && 
                      <span className="dot" style={{ backgroundColor : "rgb(249, 21, 47)" }} />
                  }

                  {this.props.flag == "yellow" && 
                      <span className="dot" style={{ backgroundColor : "rgb(250, 219, 1)" }} />
                  }

                  {this.props.flag == "green" && 
                      <span className="dot" style={{ backgroundColor : "rgb(39, 232, 51)" }} />
                  }

                  <div className="overviewSymptomTextContainer">
                      <h3>Daily Activity</h3>

                      {this.props.determination == null && 
                          <p>Please analyze to see results.</p>
                      }

                      {this.props.determination && 
                          <p>{this.props.determination}</p>
                      }
                  </div>
              </div>
          </div>
      );
  }
}

export default Overview;
