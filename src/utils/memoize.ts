const memoize = (fn: Function) => {
  const cache = new Map();
  return function (...args: any) {
    const strArgs = JSON.stringify(args);
    if (!cache.has(strArgs)) {
      cache.set(strArgs, fn(...args));
    }
    return cache.get(strArgs);
  };
};

export default memoize;
