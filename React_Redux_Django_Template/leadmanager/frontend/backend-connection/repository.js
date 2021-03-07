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
    })

    let images = [response[1].DayImg, response[1].NightImg]

    return { 
      Anomalies: anomalies,
      Images: images
    };
  }


  async GetLocationOccurences(dataTypeToRun){
      let api = new Api();

      let response = await api.get("database/move?dataTypeToRun=" + dataTypeToRun);

      if(response[0] != 200){
        console.log("Connection Failed");
      }

      let images = [response[1].Image1, response[1].Image2, response[1].Image3, response[1].Image4, response[1].Image5]

    

      return { Pacing: response[1].Pacing, 
          Lapping: response[1].Lapping, 
          Direct: response[1].Direct,
          Random: response[1].Random,
          Images: images
        };
  }

  async testBackendConnection(start, end) {
    let api = new Api();

    let response = await api.get("database/test?startdate=" + start + "&&enddate=" + end);

    if (response[0] != 200) {
      console.log("Connection Failed");
    }

    return response[1];
  }

  async GetDAAnomalies() {
    let api = new Api();

    let response = await api.get("database/daily");

    if (response[0] != 200) {
      console.log("Connection Failed");
    }

    let anomalies = []
    let dAnomalies = response[1].Anomalies;
    let dates = response[1].Date
    let bed = response[1].Bed
    let sleep = response[1].Sleep
    let Leave = response[1].Leave


    dAnomalies.forEach(anomaly => {
      anomalies.push({"Date" : dates[anomaly], "Bed to Toilet" : bed[anomaly], "Sleep" : sleep[anomaly], "Leave Home" : Leave[anomaly]})
    })
      
    let images = [response[1].Image]

    return { 
      Anomalies: anomalies,
      Images: images
    };
  }
}

export default Repository;
