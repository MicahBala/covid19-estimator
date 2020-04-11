const express = require('express');
const router = express.Router();
const estimator = require('../estimator');

router.post('/', (req, res) => {
  const inputData = {
    region: {
      name: req.body.name,
      avgAge: req.body.avgAge,
      avgDailyIncomeInUSD: req.body.avgDailyIncomeInUSD,
      avgDailyIncomePopulation: req.body.avgDailyIncomePopulation
    },
    periodType: req.body.periodType,
    timeToElapse: req.body.timeToElapse,
    reportedCases: req.body.reportedCases,
    population: req.body.population,
    totalHospitalBeds: req.body.totalHospitalBeds
  };

  let result = estimator(inputData);

  res.status(200).json({
    result
  });
});

module.exports = router;
