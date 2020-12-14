const { PerformanceObserver, performance } = require("perf_hooks");

// can I sum numbers in array to get target number

function executeWithPerformance(functionToRun, target, array, extraText) {
  const t0 = performance.now();
  const result = functionToRun(target, array);
  const t1 = performance.now();
  console.log(
    `from array ${array} we ${
      result ? "can" : "cant"
    } construct ${target}. It took ${t1 - t0} miliseconds ${extraText}`
  );
}

/*
m - target sum 
n - array length

brute force
time complexity O(n^m)
space complexity O(m)

memoize
time complexity O(m*n)
space complexity O(m)
*/

const canSumBrute = (targetSum, numbers) => {
  if (targetSum === 0) return true;
  if (targetSum < 0) return false;

  for (let number of numbers) {
    const remainder = targetSum - number;
    if (canSumBrute(remainder, numbers) === true) {
      return true;
    }
  }

  return false;
};

const canSumMemo = (targetSum, numbers, memo = {}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return true;
  if (targetSum < 0) return false;

  for (let number of numbers) {
    const remainder = targetSum - number;
    if (canSumMemo(remainder, numbers, memo) === true) {
      memo[targetSum] = true;
      return true;
    }
  }
  memo[targetSum] = false;
  return false;
};

executeWithPerformance(canSumBrute, 7, [2, 3], "(with bruteforce)");
executeWithPerformance(canSumBrute, 7, [5, 3, 4, 7], "(with bruteforce)");
executeWithPerformance(canSumBrute, 7, [2, 4], "(with bruteforce)");
executeWithPerformance(canSumBrute, 8, [2, 3, 5], "(with bruteforce)");
executeWithPerformance(canSumBrute, 251, [7, 14], "(with bruteforce)");

executeWithPerformance(canSumMemo, 7, [2, 3], "(with memoize)");
executeWithPerformance(canSumMemo, 7, [5, 3, 4, 7], "(with memoize)");
executeWithPerformance(canSumMemo, 7, [2, 4], "(with memoize)");
executeWithPerformance(canSumMemo, 8, [2, 3, 5], "(with memoize)");
executeWithPerformance(canSumMemo, 251, [7, 14], "(with memoize)");
