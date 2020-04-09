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

// Calculate factor
const calculateFactor = () => {
  return Math.floor(inputData.timeToElapse / 3);
};

const result = 2 ** calculateFactor();

const covid19ImpactEstimator = () => {
  return {
    data: inputData,
    impact: {
      currentlyInfected: inputData.reportedCases * 10,
      infectionsByRequestedTime: inputData.currentlyInfected * result
    },
    severeImpact: {
      currentlyInfected: inputData.reportedCases * 50,
      infectionsByRequestedTime: inputData.currentlyInfected * result
    }
  };
};

export default covid19ImpactEstimator;
