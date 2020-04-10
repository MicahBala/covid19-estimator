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

  const factor = Math.trunc(estimate / 3);
  const result = 2 ** factor;

  const impact = {
    currentlyInfected: 0,
    infectionsByRequestedTime: 0,
    severeCasesByRequestedTime: 0,
    hospitalBedsByRequestedTime: 0
  };
  const severeImpact = {
    currentlyInfected: 0,
    infectionsByRequestedTime: 0,
    severeCasesByRequestedTime: 0,
    hospitalBedsByRequestedTime: 0
  };

  const getCases = (cases, estimateNum) => cases * estimateNum;

  impact.currentlyInfected = getCases(reportedCases, 10);
  impact.infectionsByRequestedTime = getCases(impact.currentlyInfected, result);

  let severeCases = getCases(impact.infectionsByRequestedTime, 0.15);
  severeCases = Math.trunc(severeCases);

  let hospitalBeds = getCases(totalHospitalBeds, 0.35);
  hospitalBeds = Math.trunc(hospitalBeds - severeCases);

  impact.severeCasesByRequestedTime = severeCases;
  impact.hospitalBedsByRequestedTime = hospitalBeds;

  severeImpact.currentlyInfected = getCases(reportedCases, 50);
  severeImpact.infectionsByRequestedTime = getCases(severeImpact.currentlyInfected, result);

  let severeImpactCases = getCases(severeImpact.infectionsByRequestedTime, 0.15);
  severeImpactCases = Math.trunc(severeImpactCases);

  let severeImpactHospitalBeds = getCases(totalHospitalBeds, 0.35);
  severeImpactHospitalBeds = Math.trunc(severeImpactHospitalBeds - severeImpactCases);

  severeImpact.severeCasesByRequestedTime = severeImpactCases;
  severeImpact.hospitalBedsByRequestedTime = severeImpactHospitalBeds;

  return { data, impact, severeImpact };
};

covid19ImpactEstimator(inputData);

export default covid19ImpactEstimator;
