import daysjs from "dayjs";

// TRIGGERS
const bathroomTriggerPercentage = .10;
const maxTempTrigger = 101.1;

// SCORES
const bathroomTripAnomaliesScore = .25;
const overlappingBathroomAndTempAnomalyScore = .15;
const maxTempScore = .10;

// TEXT
const goodText = "No irregularities to report.";
const indeterminateText = "No determination can be made.";
const bathroomTripAnomaliesText = "We detected several days of irregular behavior.";
const overlappingBathroomAndTempAnomalyText = "We detected a period of irregular behavior and body temperature.";
const maxTempText = "We detected a concerning maximum body temperature."

export default class DetermineUTI {
    getDetermination(bathroomData, tempData, dayCount) {
        let result = "";
        let score = 0;

        if (bathroomData.length / dayCount >= bathroomTriggerPercentage) {
            score += bathroomTripAnomaliesScore;
            result = bathroomTripAnomaliesText;
        }

        let daysWithTempAnomalies = this.getDaysWithTempAnomalies(tempData);

        let hasOverlappingAnomalyDays = this.checkIfOverlappingDays(bathroomData, daysWithTempAnomalies);

        if (hasOverlappingAnomalyDays == true) {
            score += overlappingBathroomAndTempAnomalyScore;
            result = overlappingBathroomAndTempAnomalyText;
        }

        if (this.getMaxTemp(tempData) >= maxTempTrigger) {
            score += maxTempScore;
            if (result == "") result = maxTempText
        }
        
        if (bathroomData.length == 0 && tempData.length == 0) {
            result = goodText;
        } 
        
        if (result == "") {
            result = indeterminateText;
        }

        return { "Determination": result, "Score": score };
    }

    checkIfOverlappingDays(bathroomData, daysWithTempAnomalies) {
        let result = false;

        bathroomData.forEach(day => {
            daysWithTempAnomalies.forEach(element => {
                if (day.Date === element) {
                    result = true;
                }
            });
        });

        return result;
    }

    getDaysWithTempAnomalies(tempData) {
        let days = []

        tempData.forEach(element => {
            if (!days.includes(element.Time)) {
                let formattedDate = daysjs(element.Time).format("MM/DD/YYYY")

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