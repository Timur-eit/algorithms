import { test } from './0-test.js';

const parenthesisPairs = {
  '(': ')',
  '[': ']',
};

/* Set для более быстрой проверки, является ли символ нужной нам скобкой */
const openingParenthesis = new Set(Object.keys(parenthesisPairs));
const closingParenthesis = new Set(Object.values(parenthesisPairs));

function isValidParenthesis(text) {
  const stack = [];

  for (const character of text) {
    if (openingParenthesis.has(character)) {
      stack.push(character);
    }

    if (closingParenthesis.has(character)) {
      if (stack.length === 0) {
        return false;
      }

      const parenthesis = stack.pop();

      if (character !== parenthesisPairs[parenthesis]) {
        // если скобка — не закрывающая текущей открывающей
        return false;
      }
    }
  }

  return !stack.length;
}

test(isValidParenthesis('(((())()))'), true);
test(isValidParenthesis('())'), false);
test(isValidParenthesis(')('), false);
test(isValidParenthesis('([])'), true);
test(isValidParenthesis('([)]'), false);
test(isValidParenthesis('([)]'), true);
