import daysjs from "dayjs";

// TRIGGERS
const hiTrigger = 0.85;
const loTrigger = 0.15;
const daysForStoplight = 4;

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

        startDate = daysjs(startDate);
        
        if (anomSize == 0) {
            result = goodText;
            color = "rgb(39, 232, 51)"
        }
        
        if (result == "") {
            result = "We detected " + anomalies.length + " anomalies in daily activities.";
            score = 0;
            color = "red";
        }

        
        if (color != "rgb(39, 232, 51)") {
            let result = [];
            let dateRanges = [];

            for (let i = 0; i <= dayCount; i += (dayCount / daysForStoplight)) {
                let date = startDate.add(Math.round(i), 'day');
                dateRanges.push(date);
            }

            for (let i = 0; i < daysForStoplight; i++) {
                let color = "rgb(39, 232, 51)";
                let date1 = dateRanges[i];
                let date2 = dateRanges[i + 1];

                for (let j = 0; j < anomalies.length; j++) {
                    let dataDate = daysjs(anomalies[j].Date);

                    if (((anomSize / dayCount) <= loTrigger) || ((anomSize / dayCount) >= hiTrigger)) {
                        color = "yellow";
                    }
                    else if ((dataDate.isAfter(date1) && dataDate.isBefore(date2)) || dataDate.isSame(date1)) {
                        color = "red";
                    }
                    
                }
                result.push(color);
                //This fixed it to where it doesnt stop other api calls from occuring and the results posting on
                //the page. Although, whenever you try to run Random, it reads it as Abnormal and gives a red color
                //response. Take the time to fix this today if possible.
            }    
        }

        return { "Determination": result, "Colors": color };
    }
}
