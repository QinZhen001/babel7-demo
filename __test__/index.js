// test proxy
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply

async function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

async function sum(a, b) {
  await sleep(10000);
  return a + b;
}

const handler = {

  apply(target, thisArg, argumentsList) {
    let start = Date.now();
    console.log('target', target);
    console.log('thisArg', thisArg);
    console.log('argumentsList', argumentsList);

    // return target(argumentsList[0], argumentsList[1]) * 10;

    const res = target.apply(thisArg, argumentsList)

    if (res instanceof Promise) {
      return res.then((res) => {
        let end = Date.now();
        console.log('end - start', end - start);
        return res;
      })
    } else {
      let end = Date.now();
      console.log('end - start', end - start);
    }

    return res;
  },
};


const proxy1 = new Proxy(sum, handler);
console.log(sum(1, 2));
console.log("-------------------------------");
console.log(proxy1(1, 2));
