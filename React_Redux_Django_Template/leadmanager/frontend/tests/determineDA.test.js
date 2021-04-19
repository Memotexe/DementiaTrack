import DetermineDA from "../backend-connection/determineDA";

describe('Given the Daily Activities determination class', () => 
{
    let det;

    beforeEach(() => 
    {
        det = new DetermineDA();
    })

    it('When there are no anomalies, return a good report', () => 
    {
        expect(det.getDetermination([], 30)).toEqual({"Determination": "No irregularities to report."});
    })

    it('When there are many anomalies, return an indeterminate report', () => 
    {
        expect(det.getDetermination([1,2,3,4,5], 5)).toEqual({"Determination": "No determination can be made."});
    })

    it('When there are some anomalies, return a bad report', () => 
    {
        expect(det.getDetermination([5], 5)).toEqual({"Determination": "We detected several days of irregular behavior."});
    })
})