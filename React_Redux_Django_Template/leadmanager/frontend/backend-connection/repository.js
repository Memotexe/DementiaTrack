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


  async GetLocationOccurences(){
      let api = new Api();

      let response = await api.get("database/move");

      if(response[0] != 200){
        console.log("Connection Failed");
      }



      return { Pacing: response[1].Pacing, 
          Lapping: response[1].Lapping, 
          Direct: response[1].Direct,
          Random: response[1].Random,
          Image: response[1].Image,
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

































  
  async GetDAMi() {
    let api = new Api();

    let response = await api.get("database/dailyMi");

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

  async GetDAAr() {
    let api = new Api();

    let response = await api.get("database/dailyAr");

    if (response[0] != 200) {
      console.log("Connection Failed");
    }

    let anomalies = []
    let dAnomalies = response[1].Anomalies;
    let dates = response[1].Date
    let bed = response[1].Bed
    let meal = response[1].Meal
    let house = response[1].Housekeeping
    let eat = response[1].Eating
    let leave = response[1].Leave
    let sleep = response[1].Sleep
    let relax = response[1].Relax
    let dish = response[1].Dishes
    let work = response[1].Work
    let resp = response[1].Respirate


    dAnomalies.forEach(anomaly => {
      anomalies.push({
        "Date" : dates[anomaly],
        "Bed to Toilet" : bed[anomaly],
        "Meal Preparation Begin" : meal[anomaly],
        "Housekeeping" : house[anomaly],
        "Eating" : eat[anomaly],
        "Leave Home" : leave[anomaly],
        "Sleep" : sleep[anomaly],
        "Relax" : relax[anomaly],
        "Wash Dishes" : dish[anomaly],
        "Work" : work[anomaly],
        "Respirate" : resp[anomaly]
      })   
    })
      
    let images = [response[1].Image]

    return { 
      Anomalies: anomalies,
      Images: images
    };


    

  }






  async GetDARa() {
    let api = new Api();

    let response = await api.get("database/dailyRa");

    if (response[0] != 200) {
      console.log("Connection Failed");
    }

    let anomalies = []
    let dAnomalies = response[1].Anomalies;
    let dates = response[1].Date
    let bed = response[1].Bed
    let meal = response[1].Meal
    let house = response[1].Housekeeping
    let eat = response[1].Eating
    let leave = response[1].Leave
    let sleep = response[1].Sleep
    let relax = response[1].Relax
    let dish = response[1].Dishes
    let work = response[1].Work
    let resp = response[1].Respirate


    dAnomalies.forEach(anomaly => {
      anomalies.push({
        "Date" : dates[anomaly],
        "Bed to Toilet" : bed[anomaly],
        "Meal Preparation Begin" : meal[anomaly],
        "Housekeeping" : house[anomaly],
        "Eating" : eat[anomaly],
        "Leave Home" : leave[anomaly],
        "Sleep" : sleep[anomaly],
        "Relax" : relax[anomaly],
        "Wash Dishes" : dish[anomaly],
        "Work" : work[anomaly],
        "Respirate" : resp[anomaly]
      })   
    })
      
    let images = [response[1].Image]

    return { 
      Anomalies: anomalies,
      Images: images
    };
  }

}

export default Repository;
