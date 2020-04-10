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

// Covid-19 Estimator
const covid19ImpactEstimator = (data) => {
  const {
    reportedCases, timeToElapse, periodType, totalHospitalBeds
  } = data;

  // Get factor
  let estimate;
  if (periodType === 'months') {
    estimate = timeToElapse * 30;
  } else if (periodType === 'weeks') {
    estimate = timeToElapse * 7;
  } else {
    estimate = timeToElapse;
  }

  const factor = Math.floor(estimate / 3);
  const result = 2 ** factor;

  const impact = {};
  const severeImpact = {};

  const getCases = (cases, estimateNum) => cases * estimateNum;

  impact.currentlyInfected = getCases(reportedCases, 10);
  impact.infectionsByRequestedTime = getCases(impact.currentlyInfected, result);

  const severCases = getCases(impact.infectionsByRequestedTime, 0.85);
  const hospitalBeds = getCases(totalHospitalBeds, 0.75);

  impact.severeCasesByRequestedTime = Math.floor(severCases);
  impact.hospitalBedsByRequestedTime = Math.floor(hospitalBeds);

  severeImpact.currentlyInfected = getCases(reportedCases, 50);
  severeImpact.infectionsByRequestedTime = getCases(severeImpact.currentlyInfected, result);

  const severeImpactCases = getCases(severeImpact.infectionsByRequestedTime, 0.85);
  const severeImpactHospitalBeds = getCases(totalHospitalBeds, 0.75);

  severeImpact.severeCasesByRequestedTime = Math.truc(severeImpactCases);
  severeImpact.hospitalBedsByRequestedTime = Math.truc(severeImpactHospitalBeds);

  return { data, impact, severeImpact };
};

covid19ImpactEstimator(inputData);

export default covid19ImpactEstimator;
