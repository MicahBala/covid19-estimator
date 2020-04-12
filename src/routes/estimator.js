const express = require('express');

const router = express.Router();
const estimator = require('../estimator');

const checkParameter = (res, parameter) => {
  if (parameter === 'json') {
    return res.setHeader('Content-Type', 'application/json');
  }
  if (parameter === 'xml') {
    return res.setHeader('Content-Type', 'application/xml');
  }
  throw new Error('Check your url again');
};

const getEstimate = req => {
  const inputData = {
    region: {
      name: req.body.region.name,
      avgAge: req.body.region.avgAge,
      avgDailyIncomeInUSD: req.body.region.avgDailyIncomeInUSD,
      avgDailyIncomePopulation: req.body.region.avgDailyIncomePopulation
    },
    periodType: req.body.periodType,
    timeToElapse: req.body.timeToElapse,
    reportedCases: req.body.reportedCases,
    population: req.body.population,
    totalHospitalBeds: req.body.totalHospitalBeds
  };

  // const { data, impact, severeImpact } = estimator(inputData);
  return estimator(inputData);
};

router.post('/', (req, res) => {
  const result = getEstimate(req);
  const { data, impact, severeImpact } = result;

  res.status(200).json({
    data,
    impact,
    severeImpact
  });
});

router.post('/:optional', (req, res) => {
  const urlParam = req.params.optional;

  checkParameter(res, urlParam);

  const result = getEstimate(req);
  const { data, impact, severeImpact } = result;

  res.status(200).json({
    data,
    impact,
    severeImpact
  });
});

module.exports = router;
