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

// Estimate in weeks and months
const estimateInWeeksMonths = (duration) => {
  let estimate;
  if(duration == 'weeks') {
    estimate = inputData.timeToElapse / 7;
  } else if (inputData.periodType == 'months') {
    estimate = inputData.timeToElapse / 30;
  } else {
    estimate = inputData.timeToElapse;
  }
  factor = Math.floor(getFactor(estimate, 3));
  const result = 2 ** factor;
}

// Covid-19 Estimator
const covid19ImpactEstimator = () => {
  // const factor = Math.floor(getFactor(inputData.timeToElapse, 3));
  // const result = 2 ** factor;
  const estimate = estimateInWeeksMonths(inputData.periodType);

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
