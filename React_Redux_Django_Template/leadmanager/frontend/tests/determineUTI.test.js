import DetermineUTI from "../backend-connection/determineUTI";
import "@testing-library/jest-dom";

describe("Given the UTI Determination class", () => {
  let det;

  beforeEach(() => {
    det = new DetermineUTI();
  });

  describe("When calling getDetermination function", () => {
    it("When given nothing the function returns good message", () => {
        let result = det.getDetermination([], [], 1);
        
        expect(result.Determination).toBe("No irregularities to report.")
        expect(result.Score).toBe(0)
    });

    it("When given bad bathroom trip data report score .25", () => {
      let bathroomData = [
        {'Date': "11/21/2010", Time: "Day", "Count": 22},
        {'Date': "11/16/2010", Time: "Day", "Count": 22},
        {'Date': "12/04/2010", Time: "Day", "Count": 22},
      ]
      let result = det.getDetermination(bathroomData, [], 30)

      expect(result.Determination).toBe("We detected several days of irregular behavior.")
      expect(result.Score).toBe(.25)
    });

    it("When given bad bathroom trip data and overlapping bad temperature data, report score .4", () => {
      let bathroomData = [
        {'Date': "11/21/2010", Time: "Day", "Count": 22},
        {'Date': "11/16/2010", Time: "Day", "Count": 22},
        {'Date': "12/04/2010", Time: "Day", "Count": 22},
      ]

      let tempData = [
        {'Time': "2010-11-21 17:00:00", 'Temp': 100.4},
      ]

      let result = det.getDetermination(bathroomData, tempData, 30)

      expect(result.Determination).toBe("We detected a period of irregular behavior and body temperature.")
      expect(result.Score).toBe(.4)
    });

    it("When given bad bathroom trip data and overlapping bad temperature data and a high temp, report score .5", () => {
      let bathroomData = [
        {'Date': "11/21/2010", Time: "Day", "Count": 22},
        {'Date': "11/16/2010", Time: "Day", "Count": 22},
        {'Date': "12/04/2010", Time: "Day", "Count": 22},
      ]

      let tempData = [
        {'Time': "2010-11-21 17:00:00", 'Temp': 101.4},
      ]

      let result = det.getDetermination(bathroomData, tempData, 30)

      expect(result.Determination).toBe("We detected a period of irregular behavior and body temperature.")
      expect(result.Score).toBe(.5)
    });

    it("When given only one bad bathroom trip day in the data report indeterminate", () => {
      let bathroomData = [
        {'Date': "11/21/2010", Time: "Day", "Count": 22},
      ]
      let result = det.getDetermination(bathroomData, [], 30)

      expect(result.Determination).toBe("No determination can be made.")
      expect(result.Score).toBe(0)
    });

    it("When given only one bad temperature trip day in the data report indeterminate", () => {
      let tempData = [
        {'Time': "2010-11-21 17:00:00", 'Temp': 100.4},
      ]

      let result = det.getDetermination([], tempData, 30)

      expect(result.Determination).toBe("No determination can be made.")
      expect(result.Score).toBe(0)
    });

    it("When a temperature over the max trigger limit, report score .10", () => {
      let tempData = [
        {'Time': "2010-11-21 17:00:00", 'Temp': 101.4},
      ]
      let result = det.getDetermination([], tempData, 30)

      expect(result.Determination).toBe("We detected a concerning maximum body temperature.")
      expect(result.Score).toBe(.10)
    });
  });

  describe("When calling helper functions", () => {
    it("Then getDaysWithTempAnomalies returns correct dates", () => {
      let tempData = [
        {'Time': "2010-11-21 17:00:00", 'Temp': 100.4},
      ]
  
      let expectedResult = ['11/21/2010'];

      let result = det.getDaysWithTempAnomalies(tempData)

      expect(result).toEqual(expectedResult);
    })

    it("Then checkIfOverlappingDays returns true if overlapping", () => {
      let tempData = ['11/21/2010'];

      let bathroomData = [
        {'Date': '11/21/2010', Time: "Day", "Count": 22},
      ]
  
      let result = det.checkIfOverlappingDays(bathroomData, tempData)

      expect(result).toBe(true);
    })

    it("Then checkIfOverlappingDays returns false if not overlapping", () => {
      let tempData = ['11/22/2010'];

      let bathroomData = [
        {'Date': '11/21/2010', Time: "Day", "Count": 22},
      ]
  
      let result = det.checkIfOverlappingDays(bathroomData, tempData)

      expect(result).toBe(false);
    })

    it("Then getMaxTempCalled returns max temp", () => {
      let tempData = [
        {'Time': "2010-11-21 17:00:00", 'Temp': 100.4},
        {'Time': "2010-11-21 17:00:00", 'Temp': 101.4},
      ]
  
      let result = det.getMaxTemp(tempData)

      expect(result).toEqual(101.4)
    })
  })
});
