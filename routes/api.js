'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    const invalidNumber = initNum === "invalid number" ? "number" : null;
    const invalidUnit = initUnit === "invalid unit" ? "unit" : null;
    if (invalidNumber || invalidUnit) {
      const errorMessage = `invalid ${[invalidNumber, invalidUnit].filter(Boolean).join(" and ")}`;
      res.send(errorMessage);
    }

    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: string
    })
  });

};
