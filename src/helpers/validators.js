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

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({star, square, triangle, circle}) => {
    if (triangle !== 'white' || circle !== 'white') {
        return false;
    }

    return star === 'red' && square === 'green';
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = ({star, square, triangle, circle}) => {
    let arr = [star, square, triangle, circle];
    let counter = arr.reduce((sum, a) => a === 'green' ? sum +=1 : sum, 0);
    if(counter >= 2) return true;
    return false;
};


// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = ({star, square, triangle, circle}) => {
    let arr = [star, square, triangle, circle];
    let blue = arr.reduce((sum, a) => a === 'blue' ? sum +=1 : sum, 0);
    let red = arr.reduce((sum, a) => a === 'red' ? sum +=1 : sum, 0);
    if(blue === red) return true;
    return false;
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = ({star, square, triangle, circle}) => {
    return circle === "blue" && star === "red" && square === "orange";
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = ({star, square, triangle, circle}) => {
    const colors = {};
    const arr = [star, square, triangle, circle];
    arr.forEach((a) => {
        if(a in colors){
            colors[a]++;
        } else {
            colors[a] = 1;
        }
    })
    let counter = 0;
    for(let color in colors){
        if(colors[color] > counter){
            counter = colors[color];
        }
    }
    return counter >= 3 ? true : false;
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = ({star, square, triangle, circle}) => {
    if(triangle !== "green") return false;

    const colors = {};
    const arr = [star, square, triangle, circle];
    arr.forEach((a) => {
        if(a in colors){
            colors[a]++;
        } else {
            colors[a] = 1;
        }
    })
    return colors["green"] >= 2 && colors["red"] === 1 ? true : false;
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = ({star, square, triangle, circle}) => {
    const color = 'orange';
    return circle === color && star === color && square === color && triangle === color;
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({star}) => {
    return star !== 'white' && star !== "red";
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = ({star, square, triangle, circle}) => {
    let color = 'green';
    return circle === color && star === color && square === color && triangle === color;
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({star, square, triangle, circle}) => {
    return triangle === square;
};
 