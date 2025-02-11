/**
 * @param {string} str - строка для проверки
 * @returns {boolean} - true, если строка корректна, иначе false
 * O(n)
 */
function isValidParenthesis3(text) {
  const stack = [];

  for (const character of text) {
    if (character === '(') {
      stack.push(character)
    }

    if (character === ')') {
      if (!stack.length) {
        return false;
      }

      stack.pop();
    }
  }

  return !stack.length;
}

test(validateParenthesis('(((())()))'), true);
test(validateParenthesis('((())'), false);
test(validateParenthesis('(()))'), false);
test(validateParenthesis('()'), true);
test(validateParenthesis(''), true);
