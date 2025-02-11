const properties = [['size', 'm'], ['id', 3], ['color', 'white']];

const object = {};

// O(n)
for (const [key, value] of properties) {
  object[key] = value;
}


// старайтесь писать максимально простой код, чаще всего он работает лучше мудрёного

// O(n²) из-за спреда внутри reduce
// spread имеет сложность O(n)
const object1 = properties.reduce((accumulator, [key, value]) => ({
  ...accumulator,
  [key]: value,
}), {});

// O(n)
const object2 = properties.reduce((accumulator, [key, value]) => {
  accumulator[key] = value;
  return accumulator;
}, {});
