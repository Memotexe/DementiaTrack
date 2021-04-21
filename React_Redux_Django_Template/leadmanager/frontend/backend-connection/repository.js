import Api from "./api";

class Repository {
  async GetUTIAnomalies(dataTypeToRun) {
    let api = new Api();

    let response = await api.get("database/uti?dataTypeToRun=" + dataTypeToRun);

    if (response[0] != 200) {
      console.log("Connection Failed");
    }

    let bathroomAnomalies = []

    let dayAnomalies = response[1].DayAnomalies;
    let nightAnomalies = response[1].NightAnomalies;

    let tempAnomalies = [];

    response[1].TempAnomalies.forEach(anomaly => {
      let date = anomaly["Time"].split(" ")[0]
      let time = anomaly["Time"].split(" ")[1]

      tempAnomalies.push({ "Date": date, "Time": time, "Temperature": anomaly['Temperature'] })
    })

    dayAnomalies.forEach(anomaly => {
      bathroomAnomalies.push({"Date": anomaly[0], "Time": "Day", "Count": anomaly[1]});
    })

    nightAnomalies.forEach(anomaly => {
      bathroomAnomalies.push({"Date": anomaly[0], "Time": "Night", "Count": anomaly[1]});
    })

    let images = [response[1].DayImg, response[1].NightImg, response[1].TempImg, response[1].CombinedGraph]

    let bathroomAnomalyCount = bathroomAnomalies.length;
    let tempAnomalyCount = tempAnomalies.length;

    return { 
      BathroomAnomalyCount: bathroomAnomalyCount,
      BathroomAnomalies: bathroomAnomalies,
      TempAnomalyCount: tempAnomalyCount,
      TempAnomalies: tempAnomalies,
      Images: images,
      StartDate: response[1].StartDate,
    };
  }

  async GetSleepAnomalies() {
    let api = new Api();

    let response = await api.get("database/sleep");

    if (response[0] != 200) {
      console.log("Connection Failed");
    }

    let normal_anomalies = response[1].Normal_Anomalies
    let bad_anomalies = response[1].Bad_Anomalies
    let random_anomalies = response[1].Random_Anomalies
    let normal_image = response[1].Normal_Image
    let bad_image = response[1].Bad_Image
    let random_image = response[1].Random_Image

    return {
      Normal_Anomalies: normal_anomalies,
      Bad_Anomalies: bad_anomalies,
      Random_Anomalies: random_anomalies,
      Normal_Image: normal_image,
      Bad_Image: bad_image,
      Random_Image: random_image
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
          Images: images,
          novPacingPer : response[1].novPacingPer,
          novLappingPer : response[1].novLappingPer,
          novDirectPer : response[1].novDirectPer,
          novRandomPer : response[1].novRandomPer,

          decPacingPer : response[1].decPacingPer,
          decLappingPer : response[1].decLappingPer,
          decDirectPer : response[1].decDirectPer,
          decRandomPer : response[1].decRandomPer,

          janPacingPer : response[1].janPacingPer,
          janLappingPer : response[1].janLappingPer,
          janDirectPer : response[1].janDirectPer,
          janRandomPer : response[1].janRandomPer,

          febPacingPer : response[1].febPacingPer,
          febLappingPer : response[1].febLappingPer,
          febDirectPer : response[1].febDirectPer,
          febRandomPer : response[1].febRandomPer,

          marPacingPer : response[1].marPacingPer,
          marLappingPer : response[1].marLappingPer,
          marDirectPer : response[1].marDirectPer,
          marRandomPer : response[1].marRandomPer,






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

    let anomalies = [];
    let dAnomalies = response[1].Anomalies;
    let dates = response[1].Date
    let mMeds = response[1].Morn_Meds
    let tv = response[1].WatchTV
    let chores = response[1].Chores
    let read = response[1].Read
    let eMeds = response[1].Eve_Meds
    let meditate = response[1].Meditate
    let startDate = response[1].StartDate

    console.log(mMeds)

    dAnomalies.forEach(anomaly => {
      anomalies.push({
        "Date": dates[anomaly], 
        "Morning Meds": mMeds[anomaly], 
        "Watch TV": tv[anomaly], 
        "Chores": chores[anomaly], 
        "Read": read[anomaly], 
        "Evening Meds": eMeds[anomaly], 
        "Meditate": meditate[anomaly]})
    })
      
    let images = [response[1].Image]

    return { 
      Anomalies: anomalies,
      Images: images,
      StartDate: startDate
    };
  }

  async GetDAAr() {
    let api = new Api();

    let response = await api.get("database/dailyAr");

    if (response[0] != 200) {
      console.log("Connection Failed");
    }

    let anomalies = [];
    let dAnomalies = response[1].Anomalies;
    let dates = response[1].Date
    let meal = response[1].Meal
    let house = response[1].Housekeeping
    let eat = response[1].Eating
    let relax = response[1].Relax
    let dish = response[1].Dishes
    let resp = response[1].Respirate
    let startDate = response[1].StartDate

    dAnomalies.forEach(anomaly => {
      anomalies.push({
        "Date" : dates[anomaly],
        "Meal Preparation" : meal[anomaly],
        "Housekeeping" : house[anomaly],
        "Eating" : eat[anomaly],
        "Relax" : relax[anomaly],
        "Wash Dishes" : dish[anomaly],
        "Respiration" : resp[anomaly]
      })   
    })
      
    let images = [response[1].Image]

    return { 
      Anomalies: anomalies,
      Images: images,
      StartDate: startDate
    };
  }

  async GetDARa() {
    let api = new Api();

    let response = await api.get("database/dailyRa");

    if (response[0] != 200) {
      console.log("Connection Failed");
    }

    let anomalies = [];
    let dAnomalies = response[1].Anomalies;
    let dates = response[1].Date
    let meal = response[1].Meal
    let house = response[1].Housekeeping
    let eat = response[1].Eating
    let relax = response[1].Relax
    let dish = response[1].Dishes
    let resp = response[1].Respirate
    let startDate = response[1].StartDate


    dAnomalies.forEach(anomaly => {
      anomalies.push({
        "Date" : dates[anomaly],
        "Meal Preparation" : meal[anomaly],
        "Housekeeping" : house[anomaly],
        "Eating" : eat[anomaly],
        "Relax" : relax[anomaly],
        "Wash Dishes" : dish[anomaly],
        "Respiration" : resp[anomaly]
      })    
    })

    let images = [response[1].Image]

    return {
      Anomalies: anomalies,
      Images: images,
      StartDate: startDate
    };
  }
  async GetSleepSelect(dataTypeToRun) {
    let api = new Api();

    let response = await api.get("database/sleepSelect?dataTypeToRun=" + dataTypeToRun);

    if (response[0] != 200) {
      console.log("Connection Failed");
    }

    let Percent_Anomalies = response[1].Percent_Anomalies
    let Wake_Anomalies = response[1].Wake_Anomalies
    let color = response[1].Color

    return {
      Percent_Anomalies: Percent_Anomalies,
      Wake_Anomalies: Wake_Anomalies,
      Color: color
    };
  }

  async sendEmail(message) {
    let api = new Api();

    let response = await api.post("email", { "Message": message });

    console.log(response);
  }
}

export default Repository;
