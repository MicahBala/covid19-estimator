// Input Data
const inputData = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

const { reportedCases, timeToElapse, periodType } = inputData;

// Get factor
const getFactor = () => {
  let estimate;
  if (periodType === 'months') {
    estimate = timeToElapse * 30;
  } else if (periodType === 'weeks') {
    estimate = timeToElapse * 7;
  } else {
    estimate = timeToElapse;
  }

  const factor = estimate / 3;

  return (2 ** factor);
};

// Covid-19 Estimator
const covid19ImpactEstimator = () => {
  const data = inputData;
  const result = getFactor();

  const impact = {
    currentlyInfected: 0,
    infectionsByRequestedTime: 0
  };

  const severeImpact = {
    currentlyInfected: 0,
    infectionsByRequestedTime: 0
  };

  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * result;

  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * result;

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
