// Input Data
const inputData = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    angDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

// Get factor
const getFactor = (num1, num2) => {
  const factor = num1 / num2;
  return factor;
};

// Covid-19 Estimator
const covid19ImpactEstimator = () => {
  const factor = Math.floor(getFactor(inputData.timeToElapse, 3));
  const result = 2 ** factor;

  return {
    data: inputData,
    impact: {
      currentlyInfected: inputData.reportedCases * 10,
      infectionByRequestedTime: impact.currentlyInfected * result
    },
    severeImpact: {
      currentlyInfected: inputData.reportedCases * 50,
      infectionByRequestedTime: severeImpact.currentlyInfected * result
    }
  };
};

export default covid19ImpactEstimator;
