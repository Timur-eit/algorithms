/*
Корректность подхода к подготовке данных для задачи имеет вес в производительности и простоте решения.

Офис X работает по правилам коворкинга: каждый сотрудник может работать из дома или приходить в офис. В спокойные дни в офисе тихо, приходят пара-тройка людей. А ближе к релизам/отчётным периодам/другим завалам людей гораздо больше, но все сотрудники всё равно никогда не выходят.
Начальство хочет какое-то время понаблюдать, сколько же человек максимум приходят в офис, чтобы сократить количество «посадочных мест» и меньше платить за аренду. Для этого они наладили систему, которая фиксирует время захода и выхода людей из офиса, и планируют из этих данных получить максимальное количество присутствующих сотрудников в день.
Система сохраняет данные в формате [времяВхода, времяВыхода] для каждого сотрудника. Если люди входят и выходят одновременно, считается, что выход происходит раньше (уходящий человек уже встал с места и освободил его, а входящий ещё не успел занять).

Задача: написать функцию, получающую из информации в системе максимальное количество одновременно находящихся сотрудников в офисе.

Примеры:
count([]) // 0
count([[1, 5], [5, 10]]) // 1
count([[1, 5], [0, 1], [4, 5]]) // 2
count([[1, 10], [5, 6], [2, 3], [7, 8]]) // 2
count([[1, 2], [1, 10], [4, 9], [8, 15], [5, 6], [8, 16]]) // 4
*/

/**
 *
 * @param {number[][]} input - [ [enter, leave] ]
 * @returns {number}
 * O(n log n)
 */
function count(input) {
  const events = [];

  for (const [enter, leave] of input) {
    events.push([enter, 'in']);
    events.push([leave, 'out']);
  }

  events.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] === 'in' ? 1 : -1; // если время одинаковое, то выход раньше
    }
    return a[0] - b[0];
  });

  let maxCount = 0;
  let currentCount = 0;

  for (const [, event] of events) {
    if (event === 'in') {
      currentCount++;
      maxCount = Math.max(maxCount, currentCount);
    } else {
      currentCount--;
    }
  }

  return maxCount;
}

function compareEntries(left, right) {
  // Выход раньше входа в то же время
  if (left.time === right.time) {
    return left.isEntering ? 1 : -1;
  }

  return left.time - right.time;
}

function count(input) {
  const entries = [];

  for (const [enteringTime, leavingTime] of input) {
    entries.push({
      time: enteringTime,
      isEntering: true,
    });

    entries.push({
      time: leavingTime,
      isEntering: false,
    });
  }

  entries.sort(compareEntries);

  let currentCount = 0;
  let maximumCount = 0;

  for (const { isEntering } of entries) {
    currentCount += isEntering ? 1 : -1;

    maximumCount = Math.max(currentCount, maximumCount);
  }

  return maximumCount;
}

test(count([]), 0);
test(
  count([
    [1, 5],
    [5, 10],
  ]),
  1,
);
test(
  count([
    [1, 5],
    [0, 1],
    [4, 5],
  ]),
  2,
);
test(
  count([
    [1, 10],
    [5, 6],
    [2, 3],
    [7, 8],
  ]),
  2,
);
test(
  count([
    [1, 2],
    [1, 10],
    [4, 9],
    [8, 15],
    [5, 6],
    [8, 16],
  ]),
  4,
);

/*
Неудачное решение

Если время хранится в миллисекундах, как это чаще всего и делается, то на 12 часов открытого офиса будет приходиться 43200000 ключей!
Расходы памяти просто огромнейшие, да и по времени заполнения это решение очень медленное.
*/
function count(input) {
  const logs = {};

  for (const [startTime, endTime] of input) {
    for (let i = startTime; i < endTime; i++) {
      logs[i] = logs[i] ? logs[i] + 1 : 1;
    }
  }

  return Math.max(...Object.values(logs), 0);
}
