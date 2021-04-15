import daysjs from "dayjs";

// TRIGGERS
const bathroomTriggerPercentage = .10;
const maxTempTrigger = 101.1;
const daysForStopLight = 4;

// SCORES
const bathroomTripAnomaliesScore = .25;
const overlappingBathroomAndTempAnomalyScore = .15;
const maxTempScore = .10;

// TEXT
const goodText = "No irregularities to report.";
const indeterminateText = "No determination can be made.";
const bathroomTripAnomaliesText = "We detected several days of irregular behavior.";
const overlappingBathroomAndTempAnomalyText = "We detected a period of irregular behavior and body temperature.";
const maxTempText = "We detected a body temperature over " + maxTempTrigger + "F";

export default class DetermineUTI {
    getDetermination(bathroomData, tempData, dayCount, startDate) {
        let result = "";
        let overallColor = "green";
        let score = 0;
        startDate = daysjs(startDate);

        if (bathroomData.length / dayCount >= bathroomTriggerPercentage) {
            score += bathroomTripAnomaliesScore;
            result = "We detected " + bathroomData.length + " bathroom trip anomalies";
            overallColor = "red";
        }   

        let daysWithTempAnomalies = this.getDaysWithTempAnomalies(tempData);

        let overlappingAnomalyDays = this.checkIfOverlappingDays(bathroomData, daysWithTempAnomalies); 

        if (overlappingAnomalyDays != "") {
            score += overlappingBathroomAndTempAnomalyScore;
            result = "We detected " + bathroomData.length + " total bathroom trip anomalies and overlapping body temperature anomalies on " + daysjs(overlappingAnomalyDays).format("MM/DD/YYYY") + ".";
            overallColor = "red";
        }

        if (this.getMaxTemp(tempData) >= maxTempTrigger) {
            score += maxTempScore;
            if (result == "") result = maxTempText
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

        let colorResult = [];

        if (overallColor == "green") {
            for (let i = 0; i < daysForStopLight; i++) {
                colorResult.push('green');
            }
        }
        else {
            let dateRanges = [];
    
            for (let i = 0; i <= dayCount; i += (dayCount / daysForStopLight)) {
                let date = startDate.add(Math.round(i), 'day');
                dateRanges.push(date);
            }
    
            for (let i = 0; i < daysForStopLight; i++) {
                let color = 'green';
                let date1 = dateRanges[i];
                let date2 = dateRanges[i + 1];

                for (let j = 0; j < bathroomData.length; j++) {
                    let dataDate = daysjs(bathroomData[j].Date);

                    if ((dataDate.isAfter(date1) && dataDate.isBefore(date2)) || dataDate.isSame(date1)) {
                        color = overallColor;
                    }
                }

                for (let j = 0; j < daysWithTempAnomalies.length; j++) {
                    let dataDate = daysjs(daysWithTempAnomalies[j]);

                    if ((dataDate.isAfter(date1) && dataDate.isBefore(date2)) || dataDate.isSame(date1)) {
                        color = overallColor;
                    }
                }

                colorResult.push(color);
            }
        }

        return { "Determination": result, "Score": score, "Colors": colorResult };
    }

    checkIfOverlappingDays(bathroomData, daysWithTempAnomalies) {
        let date = ""

        bathroomData.forEach(day => {
            daysWithTempAnomalies.forEach(element => {
                if (day.Date === element) {
                    date = day.Date;
                } 
            });
        });

        return date;
    }

    getDaysWithTempAnomalies(tempData) {
        let days = []

        tempData.forEach(element => {
            if (!days.includes(element.Time)) {
                let formattedDate = daysjs(element.Date).format("MM/DD/YYYY")

                days.push(formattedDate);
            }
        });

        return days;
    }

    getMaxTemp(tempData) {
        let max = 0;

        tempData.forEach(element => {
            if (element.Temp > max) {
                max = element.Temp;
            }
        });

        return max;
    }
}