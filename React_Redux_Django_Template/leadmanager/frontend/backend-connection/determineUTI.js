import daysjs from "dayjs";

// TRIGGERS
const bathroomTriggerPercentage = 0.1;
const maxTempTrigger = 101.1;
const timePeriods = 5;

// SCORES
const bathroomTripAnomaliesScore = 0.25;
const overlappingBathroomAndTempAnomalyScore = 0.15;
const maxTempScore = 0.1;

// TEXT
const goodText = "No irregularities to report.";
const indeterminateText = "No determination can be made.";
const bathroomTripAnomaliesText =
  "We detected several days of irregular behavior.";
const overlappingBathroomAndTempAnomalyText =
  "We detected a period of irregular behavior and body temperature.";
const maxTempText =
  "We detected a body temperature over " + maxTempTrigger + "F";

export default class DetermineUTI {
  getDetermination(bathroomData, tempData, dayCount, startDate) {
    let result = "";
    let overallColor = "green";
    let score = 0;
    startDate = daysjs(startDate);

    let daysWithTempAnomalies = this.getDaysWithTempAnomalies(tempData);

    if (bathroomData.length / dayCount >= bathroomTriggerPercentage) {
      score += bathroomTripAnomaliesScore;
      result = "We detected " + bathroomData.length + " bathroom trip";
      overallColor = "red";

      if (daysWithTempAnomalies.length > 0) {
        result += " and " + daysWithTempAnomalies.length + " body temperature";
      }

      result += " anomalies.";
    }

    let overlappingAnomalyDays = this.checkIfOverlappingDays(
      bathroomData,
      daysWithTempAnomalies
    );

    if (overlappingAnomalyDays != "") {
      score += overlappingBathroomAndTempAnomalyScore;
      result =
        "We detected " +
        bathroomData.length +
        " total bathroom trip anomalies and overlapping body temperature anomalies.";
      overallColor = "red";
    }

    if (this.getMaxTemp(tempData) >= maxTempTrigger) {
      score += maxTempScore;
      if (result == "") result = maxTempText;
      overallColor = "red";
    }

    if (bathroomData.length == 0 && tempData.length == 0) {
      result = goodText;
      overallColor = "green";
    }

    if (result == "") {
      result = indeterminateText;
      overallColor = "yellow";
    }

    let bathroomResult = [];
    let tempResult = [];

    let dateRanges = [];

    for (let i = 0; i < dayCount; i += dayCount / timePeriods) {
      let date = startDate.add(Math.round(i), "day");
      dateRanges.push(date);

      bathroomResult.push(0);
      tempResult.push(0);
    }

    for (let i = 0; i < timePeriods; i++) {
      let date1 = dateRanges[i];
      let date2 = dateRanges[i + 1];

      for (let j = 0; j < bathroomData.length; j++) {
        let dataDate = daysjs(bathroomData[j].Date);

        if (
          (dataDate.isAfter(date1) && dataDate.isBefore(date2)) ||
          dataDate.isSame(date1)
        ) {
          bathroomResult[i] += 1;
        }
      }

      for (let j = 0; j < daysWithTempAnomalies.length; j++) {
        let dataDate = daysjs(daysWithTempAnomalies[j]);

        if (
          (dataDate.isAfter(date1) && dataDate.isBefore(date2)) ||
          dataDate.isSame(date1)
        ) {
          tempResult[i] += 1;
        }
      }
    }

    return {
      Determination: result,
      Score: score,
      OverallColor: overallColor,
      BathroomOverTime: bathroomResult,
      TempOverTime: tempResult,
    };
  }

  checkIfOverlappingDays(bathroomData, daysWithTempAnomalies) {
    let date = "";

    bathroomData.forEach((day) => {
      daysWithTempAnomalies.forEach((element) => {
        if (day.Date === element) {
          date = day.Date;
        }
      });
    });

    return date;
  }

  getDaysWithTempAnomalies(tempData) {
    let days = [];

    tempData.forEach((element) => {
      if (!days.includes(element.Date)) {
        let formattedDate = daysjs(element.Date).format("MM/DD/YYYY");
        days.push(formattedDate);
      }
    });

    return days;
  }

  getMaxTemp(tempData) {
    let max = 0;

    tempData.forEach((element) => {
      if (element.Temp > max) {
        max = element.Temp;
      }
    });

    return max;
  }
}
