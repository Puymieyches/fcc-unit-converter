function ConvertHandler() {
  
  function handleInput(input) {
    let numberS = input.match(/[-\.\d\/]+/g);
    const numberHandled = numberS ? handleNumbers(numberS[0]) : handleNumbers(null);

    let unitString = input.match(/[a-zA-Z]+/);
    const stringHandled = unitString ? handleString(unitString[0]) : 'invalid unit';
    return [numberHandled, stringHandled];
  };

  function handleNumbers(nums) {
    if (!nums) {
      return 1;
    }
    if (parseFloat(nums) < 0) {
      return 'invalid number';
    }
    const isFraction = nums.includes('/');
    if (!isFraction) {
      return parseFloat(nums);
    }
    const fractions = nums.split('/');
    if (fractions.length !== 2) {
      return 'invalid number';
    }
    const numerator = parseFloat(fractions[0]);
    const denominator = parseFloat(fractions[1]);
    if (numerator <= 0 || denominator <= 0) {
      return 'invalid number';
    }
    if(isNaN(numerator) || isNaN(denominator)) {
      return 'invalid number';
    }
    const result = numerator / denominator;
    return result;
  };

  function handleString(string) {
    const unitNames = ["gal", "L", "mi", "km", "lbs", "kg"];
    if (!string) {
      return 'invalid unit';
    }
    const stringUpperCase = string.toUpperCase();
    const matchedUnit = unitNames.find(unit => unit.toUpperCase() === stringUpperCase);

    if (!matchedUnit) {
      return 'invalid unit'
    }
    return matchedUnit;
  };

  this.getNum = function(input) {  
    return handleInput(input)[0];
  };
  
  this.getUnit = function(input) { 
    return handleInput(input)[1];
  };
  
  this.getReturnUnit = function(initUnit) {
    const reverseMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return reverseMap[initUnit]
  };

  this.spellOutUnit = function(unit) {
    const unitMap = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };  
    return unitMap[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let returnNum;
    let returnUnit;
    if (["gal", "L"].includes(initUnit)) {
      returnNum = initUnit === "gal" ? initNum * galToL : initNum / galToL;
      returnUnit = initUnit === "gal" ? "L" : "gal";
    }
    if (["lbs", "kg"].includes(initUnit)) {
      returnNum = initUnit === "lbs" ? initNum * lbsToKg : initNum / lbsToKg;
      returnUnit = initUnit === "lbs" ? "kg" : "lbs";
    }
    if (["mi", "km"].includes(initUnit)) {
      returnNum = initUnit === "mi" ? initNum * miToKm : initNum / miToKm;
      returnUnit = initUnit === "mi" ? "km" : "mi";
    }
    return parseFloat(returnNum.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
