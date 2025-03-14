import { test } from './0-test.js';

// O(n + m)
function countMostFrequent(firstArray, secondArray) {
  const numberRepeats = {};

  for (const number of [...firstArray, ...secondArray]) {
    numberRepeats[number] ??= 0;
    numberRepeats[number] += 1;
  }

  let maxRepeat = 0;

  for (const key in numberRepeats) {
    maxRepeat = Math.max(maxRepeat, numberRepeats[key]);
  }

  return maxRepeat;
}

// O((n + m)²)
function countMostFrequent2(firstArray, secondArray) {
  const union = [...firstArray, ...secondArray];

  return union.reduce((maxOccurences, current, _, array) => {
    const currentOccurences = array.filter((num) => num === current).length;

    return Math.max(currentOccurences, maxOccurences);
  }, 0);
}

test(countMostFrequent([1, 2, 2, 3], [0, 2, 4, 4]), 3);
test(countMostFrequent([], [0, 0]), 2);
test(countMostFrequent([1, 2, 3, 3, 3, 3, 3, 4, 5], [0, 1, 3, 3]), 7);
