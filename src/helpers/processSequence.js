/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */

import Api from "../tools/api";

const api = new Api();

const lengthBetween = (min, max) => value => 
  value.length > min && value.length < max;

const isValidChars = value => 
  /^[0-9.]+$/.test(value);

const isValidNumber = value => {
  if (value.startsWith('0') && !value.startsWith('0.')) return false;
  if (value.endsWith('.')) return false;
  
  const num = parseFloat(value);
  return num > 0 && !isNaN(num);
};

const countDots = value => 
  value.split('').filter(char => char === '.').length;

const isValid = value => 
  lengthBetween(2, 10)(value) &&
  isValidChars(value) &&
  countDots(value) <= 1 &&
  isValidNumber(value);

const log = (value, writeLog) => {
  writeLog(value);
  return value;
};

const round = value => Math.round(Number(value));

const toBinary = number => 
  api.get("https://api.tech/numbers/base")({ 
    from: 10, 
    to: 2, 
    number 
  });

const getLength = str => str.length;

const square = num => num ** 2;

const mod3 = num => num % 3;

const getAnimal = id => 
  api.get(`https://animals.tech/${id}`)({});

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  Promise.resolve(value)
    .then(val => {
      writeLog(val);
      return val;
    })
    .then(val => {
      if (!isValid(val)) {
        throw new Error('ValidationError');
      }
      return val;
    })
    .then(round)
    .then(num => log(num, writeLog))
    .then(toBinary)
    .then(({ result }) => log(result, writeLog))
    .then(getLength)
    .then(len => log(len, writeLog))
    .then(square)
    .then(sq => log(sq, writeLog))
    .then(mod3)
    .then(mod => log(mod, writeLog))
    .then(getAnimal)
    .then(({ result }) => handleSuccess(result))
    .catch(error => {
      handleError(error.message === 'ValidationError' 
        ? 'ValidationError' 
        : error.result || 'Unknown error'
      );
    });
};

export default processSequence;


// import Api from "../tools/api";

// const api = new Api();

// function isValid(value) {
//   const len = value.length;
//   console.log(+value);
//   const symbs = "0123456789.".split("");
//   let dotsCount = 0;
//   return (
//     value[0] !== "." &&
//     (value[0] !== "0" || value[1] === ".") &&
//     value[len - 1] !== "." &&
//     len < 10 &&
//     len > 2 &&
//     value.split("").every((a) => {
//       if (a === ".") dotsCount++;
//       return symbs.includes(a);
//     }) &&
//     dotsCount < 2 &&
//     +value >= 0.5
//   );
// }

// function roundString(string) {
//   return Math.round(+string);
// }


// const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
//   writeLog(value);

//   if (!isValid(value)) {
//     handleError("ValidationError");
//     return;
//   }

//   const intValue = roundString(value);
//   writeLog(intValue);

//   api
//     .get("https://api.tech/numbers/base", {
//       from: 10,
//       to: 2,
//       number: intValue,
//     })
//     .then(({ result }) => {
//       writeLog(result);
//       let num = result.length;
//       writeLog(num);
//       num = num ** 2;
//       writeLog(num);
//       num = num % 3;
//       writeLog(num);
//       return num;
//     })
//     .then(num => api.get(`https://animals.tech/${num}`)(num))
//     .then(({ result }) => handleSuccess(result))
//     .catch(({ result }) => handleError(result));
// };

// export default processSequence;
