/**
 * @param {string} str - строка для проверки
 * @returns {boolean} - true, если строка корректна, иначе false
 * O(n)
 */
function isValidParenthesis(str) {
  let balance = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      balance++;
    } else if (str[i] === ')') {
      balance--;
    }

    if (balance < 0) {

      return false;
    }
  }


  return balance === 0;
}

function isValidParenthesis2(text) {
  let balance = 0;

  for (const character of text) {
    if (character === '(') {
      balance++;
    }

    if (character === ')') {
      if (balance === 0) {
        return false;
      }

      balance--;
    }
  }

  return balance === 0;
}

// test(validateParenthesis('(((())()))'), true);
// test(validateParenthesis('((())'), false);
// test(validateParenthesis('(()))'), false);
// test(validateParenthesis('()'), true);
// test(validateParenthesis(''), true);
