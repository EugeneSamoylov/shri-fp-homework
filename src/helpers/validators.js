/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

 
import * as R from 'ramda';

// 1. Красная звезда, зеленый квадрат, все остальные белые
export const validateFieldN1 = R.where({
  star: R.equals('red'),
  square: R.equals('green'),
  triangle: R.equals('white'),
  circle: R.equals('white')
});

// 2. Как минимум две фигуры зеленые
export const validateFieldN2 = R.pipe(
  R.values,
  R.filter(R.equals('green')),
  R.length,
  R.lte(2)
);

// 3. Количество красных фигур равно кол-ву синих
export const validateFieldN3 = R.converge(
  R.equals, [
    R.pipe(R.values, R.filter(R.equals('red')), R.length),
    R.pipe(R.values, R.filter(R.equals('blue')), R.length)
  ]
);

// 4. Синий круг, красная звезда, оранжевый квадрат, треугольник любого цвета
export const validateFieldN4 = R.where({
  circle: R.equals('blue'),
  star: R.equals('red'),
  square: R.equals('orange')
});

// 5. Три+ фигуры одного цвета (кроме белого)
export const validateFieldN5 = R.pipe(
  R.values,
  R.reject(R.equals('white')),
  R.countBy(R.identity),
  R.values,
  R.any(R.lte(3))
);

// 6. Ровно две зеленые (треугольник - зеленый), одна красная
export const validateFieldN6 = R.allPass([
  R.propEq('triangle', 'green'),
  R.pipe(R.values, R.filter(R.equals('green')), R.length, R.equals(2)),
  R.pipe(R.values, R.filter(R.equals('red')), R.length, R.equals(1))
]);

// 7. Все фигуры оранжевые
export const validateFieldN7 = R.pipe(
  R.values,
  R.all(R.equals('orange'))
);

// 8. Звезда: не красная и не белая
export const validateFieldN8 = R.pipe(
  R.prop('star'),
  R.both(R.complement(R.equals('red')), R.complement(R.equals('white')))
);

// 9. Все фигуры зеленые
export const validateFieldN9 = R.pipe(
  R.values,
  R.all(R.equals('green'))
);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = R.allPass([
  R.converge(R.equals, [
    R.prop('triangle'),
    R.prop('square')
  ]),
  R.pipe(R.prop('triangle'), R.complement(R.equals('white')))
]);

// // 1. Красная звезда, зеленый квадрат, все остальные белые.
// export const validateFieldN1 = ({star, square, triangle, circle}) => {
//     if (triangle !== 'white' || circle !== 'white') {
//         return false;
//     }

//     return star === 'red' && square === 'green';
// };

// // 2. Как минимум две фигуры зеленые.
// export const validateFieldN2 = ({star, square, triangle, circle}) => {
//     let arr = [star, square, triangle, circle];
//     let counter = arr.reduce((sum, a) => a === 'green' ? sum +=1 : sum, 0);
//     if(counter >= 2) return true;
//     return false;
// };


// // 3. Количество красных фигур равно кол-ву синих.
// export const validateFieldN3 = ({star, square, triangle, circle}) => {
//     let arr = [star, square, triangle, circle];
//     let blue = arr.reduce((sum, a) => a === 'blue' ? sum +=1 : sum, 0);
//     let red = arr.reduce((sum, a) => a === 'red' ? sum +=1 : sum, 0);
//     if(blue === red) return true;
//     return false;
// };

// // 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
// export const validateFieldN4 = ({star, square, circle}) => {
//     return circle === "blue" && star === "red" && square === "orange";
// };

// // 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
// export const validateFieldN5 = ({star, square, triangle, circle}) => {
//     const colors = {};
//     const arr = [star, square, triangle, circle];
//     arr.forEach((a) => {
//         if(a in colors){
//             colors[a]++;
//         } else {
//             colors[a] = 1;
//         }
//     })
//     let counter = 0;
//     for(let color in colors){
//         if(color !== "white" && colors[color] > counter){
//             counter = colors[color];
//         }
//     }
//     return counter >= 3;
// };

// // 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
// export const validateFieldN6 = ({star, square, triangle, circle}) => {
//     if(triangle !== "green") return false;

//     const colors = {};
//     const arr = [star, square, triangle, circle];
//     arr.forEach((a) => {
//         if(a in colors){
//             colors[a]++;
//         } else {
//             colors[a] = 1;
//         }
//     })
//     return colors["green"] >= 2 && colors["red"] === 1;
// };

// // 7. Все фигуры оранжевые.
// export const validateFieldN7 = ({star, square, triangle, circle}) => {
//     const color = 'orange';
//     return circle === color && star === color && square === color && triangle === color;
// };

// // 8. Не красная и не белая звезда, остальные – любого цвета.
// export const validateFieldN8 = ({star}) => {
//     return star !== 'white' && star !== "red";
// };

// // 9. Все фигуры зеленые.
// export const validateFieldN9 = ({star, square, triangle, circle}) => {
//     let color = 'green';
//     return circle === color && star === color && square === color && triangle === color;
// };

// // 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
// export const validateFieldN10 = ({square, triangle}) => {
//     return triangle === square;
// };