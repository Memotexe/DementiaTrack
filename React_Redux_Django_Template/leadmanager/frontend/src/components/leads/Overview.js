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
        utiColors: [],
        DAFlag: "",
        daColors: [],
        sleepDetermination: "Please analyze to see results.",
        sleepFlag: "",
        moveDetermination: null,
        moveFlag: "",
    }
  }

  clicked = async () => {
    let sleepFlag = await this.updateSleep();
    let utiFlag = await this.updateUTI();
    let DAFlag = await this.updateDA();
    let moveFlag = await this.updateMovement();

    await this.sendNotification(utiFlag, sleepFlag, DAFlag, moveFlag);
  };

  sendNotification = async (utiFlag, sleepFlag, DAFlag, moveFlag) => {
    let totalFlagged = 0;

    if (utiFlag == 'red' || utiFlag == 'yellow') totalFlagged++;
    if (sleepFlag == 'red' || sleepFlag == 'yellow') totalFlagged++;
    if (DAFlag == 'red' || DAFlag == 'yellow') totalFlagged++;
    if (moveFlag == 'red' || moveFlag == 'yellow') totalFlagged++;

    let resultText = "No irregularities were found.";
    let heading = "";

    if (utiFlag == "yellow" || sleepFlag == "yellow" || DAFlag == "yellow" || moveFlag == "yellow") {
        resultText = "Some irregularities were found.";
        heading = "<b>Notice: </b>"
    }
    else if (utiFlag == "red" || sleepFlag == "red" || DAFlag == "red" || moveFlag == "red") {
        resultText = "Severe irregularities were found."
        heading = "<b>Warning: </b>"
    }

    this.setState({
        analysisTime: "Last five months",
        analysis: resultText
    })
    
    if (totalFlagged >= 2) {
        let message =
            "<h1 style='text-align: center'>Alert From DementiaTrack</h1>" +
            "<p style='text-align: center'>" + heading + 
            resultText + "</p>" + 
            "<p style='text-align: center'>Time Range: " + this.state.analysisTime + "</p><br /><br />" + 
            "<div style='background-color: lightgray;border-radius:5px;padding:10px'>" +
            "<h3>UTI</h3><p>" + this.state.utiDetermination + "</p><br />" +
            "<h3>Daily Activities</h3><p>" + this.state.DADetermination + "</p><br />" +
            "<h3>Sleep</h3><p>" + this.state.sleepDetermination + "</p><br />" +
            "<h3>Movement</h3><p>" + this.state.moveDetermination + "</p></div>" +
            "<p style='text-align: center'><i>Please visit the website for more information.</i></p>"

        let repo = new Repository();
        await repo.sendEmail(message);
    }
  }

  updateUTI = async () => {
    let flag;

    let repo = new Repository();

    let dataTypeToRun = document.getElementById("dropdown").value;

    let response = await repo.GetUTIAnomalies(dataTypeToRun);

    let det = new DetermineUTI();
    let result = det.getDetermination(response.BathroomAnomalies, response.TempAnomalies, 30, response.StartDate);

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
        utiFlag: flag,
        utiColors: result.Colors
    })

    return flag;
  }

  updateDA = async () => {
    let flag;

    let repo = new Repository();

    let dataTypeToRun = document.getElementById("dropdown").value;    
  
    if (dataTypeToRun == "Normal") {
      let response = await repo.GetDAAr();

      let det = new DetermineDA();
      let result = det.getDetermination(response.Anomalies, 99, response.StartDate);

      if (result.Determination == "The values for Daily Activities are too random.") {
         flag = "yellow";
      }
      else if (result.Determination == "We detected several days of anomalous Daily Activities.") {
          flag = "red";
      }
      else {
          flag = "green";
      }

      this.setState({
          DADetermination: result.Determination,
          DAFlag: flag,
          daColors: result.Colors
      })
    } 
    else if (dataTypeToRun == "Abnormal") {
      let response = await repo.GetDAMi();

      let det = new DetermineDA();
      let result = det.getDetermination(response.Anomalies, 83, response.StartDate);

      if (result.Determination == "The values for Daily Activities are too random.") {
          flag = "yellow";
      }
      else if (result.Determination == "We detected several days of anomalous Daily Activities.") {
          flag = "red";
      }
      else {
          flag = "green";
      }

      this.setState({
          DADetermination: result.Determination,
          DAFlag: flag,
          daColors: result.Colors
      })
    } 
    else if (dataTypeToRun == "Random") {
      let response = await repo.GetDARa();

      let det = new DetermineDA();
      let result = det.getDetermination(response.Anomalies, 99, response.StartDate);

      if (result.Determination == "The values for Daily Activities are too random.") {
          flag = "yellow";
      }
      else if (result.Determination == "We detected several days of anomalous Daily Activities.") {
          flag = "red";
      }
      else {
          flag = "green";
      }

      this.setState({
          DADetermination: result.Determination,
          DAFlag: flag,
          daColors: result.Colors
      })
    } 
}


  updateSleep = async () => {
    let flag;

    let repo = new Repository();

    let dataTypeToRun = document.getElementById("dropdown").value;

    let response = await repo.GetSleepSelect(dataTypeToRun);

    flag = response.Color;
    let det = "";
    if(response.Color == "green"){
        det = "Sleep Results are acceptable.";
    } else if (response.Color == "red"){
        det = "Sleep Results are not acceptable please check sleep page for more details.";
    } else if (response.Color == "yellow"){
        det = "Sleep Results are inconclusive.";
    } else{
        det = "error";
    }

    this.setState({
        sleepDetermination: det,
        sleepFlag: response.Color
    })

    return flag;
  }

  updateMovement = async () => {
    let flag;
    let moveDetermination;
    let repo = new Repository();
    let dataTypeToRun = document.getElementById("dropdown").value;
    let responseMove = await repo.GetLocationOccurences(dataTypeToRun);

    let pacing = parseFloat(responseMove.Pacing);
    let lapping = parseFloat(responseMove.Lapping);
    let direct = parseFloat(responseMove.Direct);
    let Random = parseFloat(responseMove.Random);

    let pacingAndlapping = pacing + lapping;

    if(pacingAndlapping >= 50){
        flag = "red";
        moveDetermination = "Severe movement irregularities were present.";
    }else if (Random >= 60){
        flag = "yellow";
        moveDetermination = "Irregular movements found but not severe.";
    }else{
        flag = "green";
        moveDetermination = "No abnormal movement to be found.";
    
    }

    this.setState({
        moveFlag: flag,
        moveDetermination : moveDetermination
        
    })

    return flag;
  }

  render() {
      return (
          <div>
              <h1 id="title">Overview</h1>
              <Summary analysis={this.state.analysis} time={this.state.analysisTime} daColors={this.state.daColors} />
              <Analyzer clicked={this.clicked} />
              <UTI determination={this.state.utiDetermination} flag={this.state.utiFlag} colors={this.state.utiColors} />
              <DA determination={this.state.DADetermination} flag={this.state.DAFlag} colors={this.state.daColors} />
              <Sleep determination={this.state.sleepDetermination} flag={this.state.sleepFlag} />
              <MOVE determination={this.state.moveDetermination} flag ={this.state.moveFlag} />
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
            <p>Time Range: {this.props.time}</p>
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
                    <div>
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
                    </div>
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

class Sleep extends React.Component {
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
                        <h3>Sleep</h3>

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
                  <div>
                        {this.props.flag == "" &&
                            <span className="dot" style={{ backgroundColor : "white" }} />
                        }

                        {this.props.flag != "" &&
                            <span className="dot" style={{ backgroundColor: this.props.colors, margin: "10px" }} />
                        }
                  </div>
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

class MOVE extends React.Component {
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
                        <h3>Movement</h3>

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