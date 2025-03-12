import { test } from './0-test.js';

// O(log n)

/**
 * @param {Array<string>} array
 * @param {string} searchItem
 * @returns {number | null}
 */
function binarySearch(array, searchItem) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (array[mid] === searchItem) {
      return mid;
    }

    if (array[mid].localeCompare(searchItem) < 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return null;
}

const plants = [
  'Аспарагус',
  'Гвоздика',
  'Жасмин',
  'Калина',
  'Малина',
  'Пион',
  'Тысячелистник',
  'Хризантема',
  'Шафран',
  'Юкка',
];

console.log(test(binarySearch(plants, 'Жасмин'), 2));
console.log(test(binarySearch(plants, 'Пион'), 5));
console.log(test(binarySearch(plants, 'Роза'), null));
