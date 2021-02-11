import Api from "./api";

class Repository {
  async GetTemperatureAnomalies(argument) {
    let api = new Api();

    let response = await api.get("database/test?q=" + argument);

    if (response[0] != 200) {
      console.log("Connection Failed");
    }

    let responseData = response[1].Anomalies;
    let data = [];

    responseData.forEach((row) => {
      data.push({ date: row[0], value: row[1] });
    });

    return { Anomalies: data, Image: response[1].Image };
  }

  async GetBathroomTripAnomalies(argument) {
    let api = new Api();

    let response = await api.get("database/test?q=" + argument);

    if (response[0] != 200) {
      console.log("Connection Failed");
    }

    let responseData = response[1].Anomalies;
    let data = [];

    responseData.forEach((row) => {
      data.push({ date: "9/18/21", value: row[0] });
    });

    return { Anomalies: data, Image: response[1].Image };
  }
}

export default Repository;
