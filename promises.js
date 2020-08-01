const { reject } = require('underscore');

const p = new Promise((resolve, reject) => {
  console.log(reject);
  //   resolve(1);
  reject(new Error('Something nasty'));
});
p.then((result) => console.log(result)).catch((e) => console.log(e.message));
