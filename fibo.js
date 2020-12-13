const { PerformanceObserver, performance } = require("perf_hooks");

function executeWithPerformance(functionToRun, parameter, extraText) {
  const t0 = performance.now();
  const result = functionToRun(parameter);
  const t1 = performance.now();
  console.log(
    `fib of ${parameter} is ${result} and it took ${
      t1 - t0
    } miliseconds ${extraText}`
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
// now O(n) time complexity and O(n) space complexity 

const fibWithMemo = (n, memo = {}) => {
  // first base cases
  if (n in memo) return memo[n]; // if I have already calculated this, just fetch it without recalculation
  if (n <= 2) return 1;
  memo[n] = fibWithMemo(n - 1, memo) + fibWithMemo(n - 2, memo);
  return memo[n];
};

executeWithPerformance(fibBruteForce, 6, "(with bruteforce)");
executeWithPerformance(fibBruteForce, 10, "(with bruteforce)");
executeWithPerformance(fibBruteForce, 40, "(with bruteforce)");

executeWithPerformance(fibWithMemo, 6, "(with memo)");
executeWithPerformance(fibWithMemo, 10, "(with memo)");
executeWithPerformance(fibWithMemo, 40, "(with memo)");
