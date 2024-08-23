const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('should correctly read a whole number input', function() {
        const input = '32kg';
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 32);
    });
    test('should correctly read a decimal number input', function() {
        const input = '32.3';
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 32.3, 'The number should be 32.3');
    });
    test('should correctly read a fractional input', function() {
        const input = '2/4';
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 0.5);
    });
    test('should correctly read a fractional input with a decimal', function() {
        const input = '2.75/5.5';
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 0.5, 'The number should be 0.5');
    });
    test('should correctly return an error on a double-fraction (i.e. 3/2/3)', function() {
        const input = '3/2/3';
        const result = convertHandler.getNum(input);
        assert.equal(result, "invalid number", 'The number should not come through');
    });
    test('should correctly default to a numerical input of 1 when no numerical input is provided', function() {
        const input = 'kg';
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 1, 'defaults to 1');
    });
    test('should correctly read each valid input unit', function() {
        const validInput = ["gal", "L", "mi", "km", "lbs", "kg"];
        validInput.forEach(unit => {
            const input = `69${unit}`;
            const result = convertHandler.getUnit(input);
            assert.equal(result, unit);
        });
    });
    test('should correctly return an error for an invalid input unit', function() {
        const input = 'kgo';
        const result = convertHandler.getUnit(input);
        assert.equal(result, 'invalid unit', 'Should be the error message');
    });
    test('should return the correct return unit for each valid input unit', function() {
        const validInput = ["gal", "L", "mi", "km", "lbs", "kg"];
        const validOutput = ["L", "gal", "km", "mi", "kg", "lbs"];
        validInput.forEach((unit, index) => {
            const returnUnit = convertHandler.getReturnUnit(unit);
            assert.equal(returnUnit, validOutput[index])
        });        
    });
    test('should correctly return the spelled-out string unit for each valid input unit', function() {
        const validInput = ["gal", "L", "mi", "km", "lbs", "kg"];
        const validSpelledOutInput = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"];
        validInput.forEach((unit, index) => {
            const spelledUnit = convertHandler.spellOutUnit(unit);
            assert.equal(spelledUnit, validSpelledOutInput[index]);
        });
    });
    test('should correctly convert gal to L', function() {
        const inputNum = 10;
        const inputUnit = 'gal';
        const result = convertHandler.convert(inputNum, inputUnit);
        assert.equal(result, 37.85410);
    });
    test('should correctly convert L to gal', function() {
        const inputNum = 10;
        const inputUnit = 'L';
        const result = convertHandler.convert(inputNum, inputUnit);
        assert.equal(result, 2.64172);
    });
    test('should correctly convert mi to km', function() {
        const inputNum = 10;
        const inputUnit = 'mi';
        const result = convertHandler.convert(inputNum, inputUnit);
        assert.equal(result, 16.09340);
    });
    test('should correctly convert km to mi', function() {
        const inputNum = 10;
        const inputUnit = 'km';
        const result = convertHandler.convert(inputNum, inputUnit);
        assert.equal(result, 6.21373);
    });
    test('should correctly convert lbs to kg', function() {
        const inputNum = 10;
        const inputUnit = 'lbs';
        const result = convertHandler.convert(inputNum, inputUnit);
        assert.equal(result, 4.53592);
    });
    test('should correctly convert kg to lbs', function() {
        const inputNum = 10;
        const inputUnit = 'kg';
        const result = convertHandler.convert(inputNum, inputUnit);
        assert.equal(result, 22.04624);
    });
});