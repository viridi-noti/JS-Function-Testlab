// Import stylesheets
import './style.css';
import { ceil, isObject } from 'lodash';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;


function createRoundUpFn(precision) {
  var cache = null;
  return function(value) {
    if (!value && value !== 0) {
      return null;
    }
    var parsedNum = Number(value + '');
    if (isNaN(parsedNum)) {
      if (cache) {
        console.log(`return cached number = ${cache}`);
        return cache;
      }
      console.log('no cache, return 0');
      return 0;
    }
    var rounded = ceil(value, precision);
    console.log(`previous value = ${cache}, new value = ${rounded}`);
    cache = rounded;
    return rounded;
  };
}

var roundUp1 = createRoundUpFn(2);
var roundUp2 = createRoundUpFn(2);

// roundUp1('1.2');
// roundUp1('1.2a');
// roundUp2('2.4b');
// roundUp2('-2.4');
// roundUp1('1.24');
// roundUp1('1a.24');
// roundUp2('2.456');
// roundUp2('2.a2');

function createOptionalRegexAtom(regexAtom) {
  return `(?:${regexAtom}|\$)`;
}

function createPartialMatchRegex(regexArray) {
  let strBuilder = '';
  regexArray.forEach(element => {
    if (isObject(element)) {
      if (!element.multiply || !element.value) {
        return;
      }
      for(let i = 0; i < element.multiply; i++) {
        strBuilder += createOptionalRegexAtom(element.value);
      }
      return;
    }
    strBuilder += createOptionalRegexAtom(element);
  });
  console.log(strBuilder);
  return RegExp(`^${strBuilder}\$`);
}

var d3 = { value: '[\\d]', multiply: 3 };
var d2 = { value: '[\\d]', multiply: 2 };
var dash = '-'
var reg1 = createPartialMatchRegex([d3, dash, d3, dash, d2]);
function testReg1(value) {
  console.log(`Test --- START ---`);
  console.log(`* value = ${value}`);
  console.log(`*  test result = ${reg1.test(value)}`);
  console.log(`Test ---- END ----`);
}
testReg1('88');
testReg1('88-');
testReg1('888');
testReg1('888-');
testReg1('888-33');
testReg1('888-333-22');
