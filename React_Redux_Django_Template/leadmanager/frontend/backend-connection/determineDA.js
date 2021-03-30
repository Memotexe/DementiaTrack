import daysjs from "dayjs";

// TRIGGERS
const triggerPercentage = 0.25;

// SCORES
const anomaliesScore = 0.25;

// TEXT
const goodText = "No irregularities to report.";
const badText = "We detected several days of irregular behavior.";
const indetText = "No determination can be made.";

export default class DetermineDA {
    getDetermination(anomalies, dayCount) {
        let result = "";
        let score = 0;

        if (anomalies.length / dayCount >= triggerPercentage) {
            result += indetText;
        }
        
        if (anomalies.length == 0) {
            result = goodText;
        } 
        
        if (result == "") {
            result = badText;
            score = 0;
        }

        return { "Determination": result };
    }
}