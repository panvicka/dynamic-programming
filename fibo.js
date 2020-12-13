const { PerformanceObserver, performance } = require("perf_hooks");

function executeWithPerformance(functionToRun, parameter, textToPrint) {
  const t0 = performance.now();
  const result = functionToRun(parameter);
  const t1 = performance.now();
  console.log(
    `fib of ${parameter} is ${result} and it took ${t1 - t0} miliseconds`
  );
}

const fibBruteForce = (n) => {
  // first base cases
  if (n <= 2) return 1;
  return fibBruteForce(n - 1) + fibBruteForce(n - 2);
};

// memoization
// js object, keys are arguments, values are return values
// so i dont have to calculate stuff over and over again

const fibWithMemo = (n, memo = {}) => {
  // first base cases
  if (n in memo) return memo[n]; // if I have already calculated this, just fetch it without recalculation
  if (n <= 2) return 1;

  return fibBruteForce(n - 1) + fibBruteForce(n - 2);
};

executeWithPerformance(fibBruteForce, 6, "fib of 10 brute force");
executeWithPerformance(fibBruteForce, 45, "fib of 10 brute force");
executeWithPerformance(fibBruteForce, 43, "fib of 43 brute force");
