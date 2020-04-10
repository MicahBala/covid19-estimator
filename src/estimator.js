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
    reportedCases,
    timeToElapse,
    periodType,
    totalHospitalBeds,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
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
    hospitalBedsByRequestedTime: 0,
    casesForICUByRequestedTime: 0,
    casesForVentilatorsByRequestedTime: 0,
    dollarsInFlight: 0
  };
  const severeImpact = {
    currentlyInfected: 0,
    infectionsByRequestedTime: 0,
    severeCasesByRequestedTime: 0,
    hospitalBedsByRequestedTime: 0,
    casesForICUByRequestedTime: 0,
    casesForVentilatorsByRequestedTime: 0,
    dollarsInFlight: 0
  };

  const getCases = (cases, estimateNum) => cases * estimateNum;

  impact.currentlyInfected = getCases(reportedCases, 10);
  impact.infectionsByRequestedTime = getCases(impact.currentlyInfected, result);

  let severeCases = getCases(impact.infectionsByRequestedTime, 0.15);
  severeCases = Math.trunc(severeCases);

  let casesForICU = getCases(impact.infectionsByRequestedTime, 0.5);
  casesForICU = Math.trunc(casesForICU);

  let casesForVentilators = getCases(impact.infectionsByRequestedTime, 0.2);
  casesForVentilators = Math.trunc(casesForVentilators);

  const populationIncome = Math.trunc(avgDailyIncomePopulation * avgDailyIncomeInUSD);
  const moneyLoss = (impact.currentlyInfected * populationIncome) / estimate;

  let hospitalBeds = getCases(totalHospitalBeds, 0.35);
  hospitalBeds = Math.trunc(hospitalBeds - severeCases);

  impact.severeCasesByRequestedTime = severeCases;
  impact.hospitalBedsByRequestedTime = hospitalBeds;
  impact.casesForICUByRequestedTime = casesForICU;
  impact.casesForVentilatorsByRequestedTime = casesForVentilators;
  impact.dollarsInFlight = Math.trunc(moneyLoss);

  severeImpact.currentlyInfected = getCases(reportedCases, 50);
  severeImpact.infectionsByRequestedTime = getCases(severeImpact.currentlyInfected, result);

  let severeImpactCases = getCases(severeImpact.infectionsByRequestedTime, 0.15);
  severeImpactCases = Math.trunc(severeImpactCases);

  let severeCasesForICU = getCases(severeImpact.infectionsByRequestedTime, 0.5);
  severeCasesForICU = Math.trunc(severeCasesForICU);

  let severeCasesForVentilators = getCases(severeImpact.infectionsByRequestedTime, 0.2);
  severeCasesForVentilators = Math.trunc(severeCasesForVentilators);

  const severePopIncome = Math.trunc(avgDailyIncomePopulation * avgDailyIncomeInUSD);
  const severeMoneyLoss = (severeImpact.currentlyInfected * severePopIncome) / estimate;

  let severeImpactHospitalBeds = getCases(totalHospitalBeds, 0.35);
  severeImpactHospitalBeds = Math.trunc(severeImpactHospitalBeds - severeImpactCases);

  severeImpact.severeCasesByRequestedTime = severeImpactCases;
  severeImpact.hospitalBedsByRequestedTime = severeImpactHospitalBeds;
  severeImpact.casesForICUByRequestedTime = severeCasesForICU;
  severeImpact.casesForVentilatorsByRequestedTime = severeCasesForVentilators;
  severeImpact.dollarsInFlight = Math.trunc(severeMoneyLoss);

  return { data, impact, severeImpact };
};

covid19ImpactEstimator(inputData);

export default covid19ImpactEstimator;
