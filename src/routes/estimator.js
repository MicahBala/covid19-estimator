const express = require('express');

const router = express.Router();
const estimator = require('../estimator');

router.post('/', (req, res, next) => {
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

  const { data, impact, severeImpact } = estimator(inputData);

  res.status(200).json({
    data,
    impact,
    severeImpact
  });
});

module.exports = router;
