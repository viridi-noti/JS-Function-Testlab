import { isObject } from 'lodash';

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

export const partialRegexMatchDemonstration = function () {
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
}
