import Api from "./api";

class Repository {
  async GetTemperatureAnomalies() {
    let api = new Api();

    let response = await api.get("database/temp");

    if (response[0] != 200) {
      console.log("Connection Failed");
    }

    return { Anomalies: response[1].Anomalies, Image: response[1].Image };
  }

  async GetBathroomTripAnomalies() {
    let api = new Api();

    let response = await api.get("database/uti");

    if (response[0] != 200) {
      console.log("Connection Failed");
    }

    let anomalies = []

    let dayAnomalies = response[1].DayAnomalies;
    let nightAnomalies = response[1].NightAnomalies;

    dayAnomalies.forEach(anomaly => {
      anomalies.push({"Date": anomaly[0], "Time": "Day", "Count": anomaly[1]});
    })
      
    nightAnomalies.forEach(anomaly => {
      anomalies.push({"Date": anomaly[0], "Time": "Night", "Count": anomaly[1]});
    });

    let images = [response[1].DayImg, response[1].NightImg]

    return { 
      Anomalies: anomalies,
      Images: images
    };
  }


  async GetLocationOccurences(){
      let api = new Api();

      let response = await api.get("database/move");

      if(response[0] != 200){
        console.log("Connection Failed");
      }

      return { Results: response[1].Results }
  }

  async testBackendConnection(start, end) {
    let api = new Api();

    let response = await api.get("database/test?startdate=" + start + "&&enddate=" + end);

    if (response[0] != 200) {
      console.log("Connection Failed");
    }

    return response[1];
  }
}

export default Repository;
