import daysjs from "dayjs";

// TRIGGERS
const hiTrigger = 0.85;
const loTrigger = 0.15;
const timePeriods = 5;

// TEXT
const goodText = "No irregularities reported.";
const indetText = "There is too much randomness in Daily Activities.";

export default class DetermineDA {
  getDetermination(anomalies, dayCount, startDate) {
    let result = "";
    let color = "";
    let score = 0;
    let anomSize = anomalies.length;
    let x = anomSize / dayCount;

    let DAResult = [];

    for (let i = 0; i <= dayCount; i += dayCount / timePeriods) {
      DAResult.push(0);
    }

    startDate = daysjs(startDate);

    if (anomSize == 0) {
      result = goodText;
      color = "rgb(39, 232, 51)";
    }

    if (result == "") {
      score = 0;
      color = "red";
      result = "We detected " + anomalies.length + " anomalies in daily activities.";
    }

    if (color == "red") {
      
      let result = [];
      let dateRanges = [];

      for (let i = 0; i <= dayCount; i += dayCount / timePeriods) {
        let date = startDate.add(Math.round(i), "day");
        dateRanges.push(date);
      }

      for (let i = 0; i < timePeriods; i++) {
        let date1 = dateRanges[i];
        let date2 = dateRanges[i + 1];

        for (let j = 0; j < anomalies.length; j++) {
          let dataDate = daysjs(anomalies[j].Date);

          if ((x <= loTrigger) || (x >= hiTrigger) && (dataDate.isAfter(date1) && dataDate.isBefore(date2)) || (dataDate.isSame(date1))) {
            color = "yellow";
            result = indetText;
            DAResult[i] += 1;
          } else if ((dataDate.isAfter(date1) && dataDate.isBefore(date2)) || (dataDate.isSame(date1))
          ) {
            color = "red";
            result = "We detected " + anomalies.length + " anomalies in daily activities.";
            DAResult[i] += 1;
          }
        }
      }
    }

    return { 
      Determination: result, 
      Colors: color,
      DAOverTime: DAResult,
    };
  }
}
