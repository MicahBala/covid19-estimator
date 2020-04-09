const inputData = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    angDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  priodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

const covid19ImpactEstimator = data => {
  data = inputData;
  const factor = Math.floor(data.timeToElapse / 3);
  const result = 2 ** factor;

  return {
    data: inputData,
    impact: {
      currentlyInfected: data.reportedCases * 10,
      infectionsByRequestedTime: data.currentlyInfected * result
    },
    severeImpact: {
      currentlyInfected: data.reportedCases * 50,
      infectionsByRequestedTime: data.currentlyInfected * result
    }
  };
};

export default covid19ImpactEstimator;
