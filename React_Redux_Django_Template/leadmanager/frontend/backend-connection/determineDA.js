import daysjs from "dayjs";

// TRIGGERS
const hiTrigger = 0.85;
const loTrigger = 0.15;
const timePeriods = 4;

// TEXT
const goodText = "No irregularities to report.";
const badText = "We detected several days of anomalous Daily Activities.";
const indetText = "The values for Daily Activities are too random.";

export default class DetermineDA {
  getDetermination(anomalies, dayCount, startDate) {
    let result = "";
    let color = "";
    let score = 0;
    let anomSize = anomalies.length;
    let x = anomSize / dayCount;

    let DAResult = [];

    startDate = daysjs(startDate);

    if (anomSize == 0) {
      result = goodText;
      color = "rgb(39, 232, 51)";
    }

    if (result == "") {
      result =
        "We detected " + anomalies.length + " anomalies in daily activities.";
      score = 0;
      color = "red";
    }

    if (color != "rgb(39, 232, 51)") {
      let result = [];
      let dateRanges = [];

      for (let i = 0; i <= dayCount; i += dayCount / timePeriods) {
        let date = startDate.add(Math.round(i), "day");
        dateRanges.push(date);

        DAResult.push(0);
      }

      for (let i = 0; i < timePeriods; i++) {
        let color = "rgb(39, 232, 51)";
        let date1 = dateRanges[i];
        let date2 = dateRanges[i + 1];

        for (let j = 0; j < anomalies.length; j++) {
          let dataDate = daysjs(anomalies[j].Date);

          console.log(x);

          if (x == 1 || x <= loTrigger || x >= hiTrigger) {
            color = "yellow";
          } else if ((dataDate.isAfter(date1) && dataDate.isBefore(date2)) || dataDate.isSame(date1)
          ) {
            color = "red";
            DAResult[i] += 1;
          }
        }
        //result.push(color);
      }
    }

    console.log(color);

    return { 
      Determination: result, 
      Colors: color,
      DAOverTime: DAResult,
    };
  }
}
