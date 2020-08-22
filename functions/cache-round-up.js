import { ceil } from 'lodash';

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

export const cacheRoundUpDemonstration = function () {
  var roundUp1 = createRoundUpFn(2);
  var roundUp2 = createRoundUpFn(2);

  roundUp1('1.2');
  roundUp1('1.2a');
  roundUp2('2.4b');
  roundUp2('-2.4');
  roundUp1('1.24');
  roundUp1('1a.24');
  roundUp2('2.456');
  roundUp2('2.a2');
}
