export const test = (expect, result) => {
  const isEqual = expect === result;

  // ANSI
  const red = '\x1b[31m';
  const green = '\x1b[32m';
  const reset = '\x1b[0m';

  const message = `${
    isEqual ? green : red
  }expect: ${expect}, result: ${result}${reset}`;

  console.log(message);
  return isEqual;
};
