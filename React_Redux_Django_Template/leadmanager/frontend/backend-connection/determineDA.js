import daysjs from "dayjs";

// TRIGGERS
const hiTrigger = 0.85;
const loTrigger = 0.15;
const daysForStoplight = 4;

// SCORES
// const anomaliesScore = 0.25;

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
        let colorResult = [];
        let x = anomSize / dayCount;

        startDate = daysjs(startDate);
        //endDate = startDate.add(Math.round(30), 'day');
        
        if (anomSize == 0) {
            result = goodText;
            color = "green"
        }
        
        if (result == "") {
            result = "We detected " + anomalies.length + " anomalies in daily activities.";
            score = 0;
            color = "red";
        }

        if (color == "green") {
            // Return all greens
            for (let i = 0; i < daysForStoplight; i++) {
                colorResult.push('green');
            }
        }
        else {
            let result = [];
            let dateRanges = [];

            for (let i = 0; i <= dayCount; i += (dayCount / daysForStoplight)) {
                let date = startDate.add(Math.round(i), 'day');
                dateRanges.push(date);
            }

            for (let i = 0; i < daysForStoplight; i++) {
                let color = "green";
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
                console.log("HERE IS COLORS");
                console.log(colorResult);
                colorResult.push(color);
            }    
        }

        return { "Determination": result, "Colors": colorResult };
    }
}