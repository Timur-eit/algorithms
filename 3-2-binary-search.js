/// <reference path="./3-2-binary-search-types" />
import { test } from './0-test.js';
import { MOCK_LEAGUE, MOCK_RATING } from './3-2-binary-search-mock-data.js';

/**
 *
 * @param {number} leaguePoints
 * @param {TPlayer[]} league
 * @returns  {TFoundPlayer}
 */
function findPlayerPosition(league, leaguePoints) {
  let left = 0;
  let right = league.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const { leaguePoints: currentLeaguePoints } = league[mid];

    if (currentLeaguePoints === leaguePoints) {
      while (
        mid + 1 < league.length && // Проверяем, что не вышли за границы массива
        league[mid + 1].leaguePoints === leaguePoints // Следующий игрок тоже с такими же очками?
      ) {
        mid++; /* Если да, двигаемся вправо (к последнему игроку с такими же очками)  */
      }

      return { isFound: true, playerPosition: league.length - mid };
    }

    if (currentLeaguePoints > leaguePoints) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return {
    isFound: false,
    minPoints: league.length ? league[0].leaguePoints : -Infinity,
    maxPoints: league.length
      ? league[league.length - 1].leaguePoints
      : Infinity,
  };
}

/**
 * Бинарный поиск O(log n + log m) = O(log (n x m))
 * @param {number} leaguePoints
 * @param {TLeaderboard} leaderboard
 * @returns {{ league: number, placement: number } | null}
 */
function findPlacement(leaderboard, leaguePoints) {
  let left = 0;
  let right = leaderboard.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    const currentLeague = leaderboard[mid];
    const { isFound, playerPosition, minPoints, maxPoints } =
      findPlayerPosition(currentLeague, leaguePoints) ?? {};

    if (isFound) {
      return { league: mid + 1, placement: playerPosition };
    }

    // проверка, что leaguePoints входит в диапазон лиги
    if (leaguePoints < minPoints) {
      right = mid - 1;
    } else if (leaguePoints > maxPoints) {
      left = mid + 1;
    } else {
      return null;
    }
  }

  return null;
}

console.log(findPlacement(MOCK_RATING, 1476));
