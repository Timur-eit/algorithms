import { test } from './0-test.js';

// O(n), но быстрее в реальных условиях за счёт раннего выхода.
function iqTest(stringOfNumbers) {
  const isEven = (num) => num % 2 === 0;
  const getPosition = (num) => num + 1;
  const numbersList = stringOfNumbers.split(' ').map(Number);

  let evenCount = 0;
  let oddCount = 0;

  let lastEvenIndex = -1;
  let lastOddIndex = -1;

  for (let index = 0; index < numbersList.length; index++) {
    const currentNumber = numbersList[index];

    if (isEven(currentNumber)) {
      evenCount++;
      lastEvenIndex = index;
    } else {
      oddCount++;
      lastOddIndex = index;
    }

    if (evenCount > 1 && oddCount === 1) {
      return getPosition(lastOddIndex);
    }

    if (oddCount > 1 && evenCount === 1) {
      return getPosition(lastEvenIndex);
    }
  }

  return evenCount === 1
    ? getPosition(lastEvenIndex)
    : getPosition(lastOddIndex);
}

// alternative solution, но в iqTest есть ранний выход и не нужно идти по всему массиву
// O(n), без раннего выхода, медленнее для больших массивов.
function iqTest2(numbers) {
  const remainders = numbers.split(' ').map((x) => x % 2);
  const sum = remainders.reduce((a, b) => a + b);
  const target = sum > 1 ? 0 : 1;

  return remainders.indexOf(target) + 1;
}

test(iqTest2('2 4 7 8 10'), 3);
test(iqTest2('1 2 1 1'), 2);
test(iqTest2('1 3 5 7 19 237 2 555'), 7);
