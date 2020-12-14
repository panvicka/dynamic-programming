const { PerformanceObserver, performance } = require("perf_hooks");

// can I sum numbers in array to get target number? Return the shorters possible way to create it

function executeWithPerformance(functionToRun, target, array, extraText) {
  const t0 = performance.now();
  const result = functionToRun(target, array);
  const t1 = performance.now();
  let text = "";
  if (result) {
    text = `from array ${array} we can construct ${target} using ${result}`;
  } else {
    text = `from array ${array} we cant construct ${target}`;
  }

  console.log(`${text}. It took ${t1 - t0} miliseconds ${extraText}`);
}

/*
m - target sum
n - numbers.length

Brute force
time: branching factor - n, hight of the tree m, O(n^m*m) *m because of the array copying 
space: O(m^2)

Memo:
time O(m^2 *n)
space O(m^2)

*/

const bestSumBrute = (targetSum, numbers) => {
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  let shortestCombination = null;

  for (let number of numbers) {
    const remainder = targetSum - number;
    const remainderCombination = bestSumBrute(remainder, numbers);
    if (remainderCombination !== null) {
      const combination = [...remainderCombination, number];
      if (
        shortestCombination === null ||
        combination.length < shortestCombination.length
      ) {
        shortestCombination = combination;
      }
    }
  }

  return shortestCombination;
};

const bestSumMemo = (targetSum, numbers, memo = {}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  let shortestCombination = null;

  for (let number of numbers) {
    const remainder = targetSum - number;
    const remainderCombination = bestSumMemo(remainder, numbers, memo);
    if (remainderCombination !== null) {
      const combination = [...remainderCombination, number];
      if (
        shortestCombination === null ||
        combination.length < shortestCombination.length
      ) {
        shortestCombination = combination;
      }
    }
  }
  memo[targetSum] = shortestCombination;
  return memo[targetSum];
};

executeWithPerformance(bestSumBrute, 7, [5, 3, 4, 7], "(with bruteforce)");
executeWithPerformance(bestSumBrute, 8, [2, 3, 5], "(with bruteforce)");
executeWithPerformance(bestSumBrute, 8, [1, 4, 5], "(with bruteforce)");
executeWithPerformance(bestSumBrute, 7, [2, 4, 6], "(with bruteforce)");
executeWithPerformance(bestSumBrute, 30, [1, 2, 5, 25], "(with bruteforce)");

executeWithPerformance(bestSumMemo, 7, [5, 3, 4, 7], "(with memo)");
executeWithPerformance(bestSumMemo, 8, [2, 3, 5], "(with memo)");
executeWithPerformance(bestSumMemo, 8, [1, 4, 5], "(with memo)");
executeWithPerformance(bestSumMemo, 7, [2, 4, 6], "(with memo)");
executeWithPerformance(bestSumMemo, 30, [1, 2, 5, 25], "(with memo)");
executeWithPerformance(bestSumMemo, 100, [1, 2, 5, 25], "(with memo)");
executeWithPerformance(bestSumMemo, 327, [1, 2, 5, 21], "(with memo)");
executeWithPerformance(bestSumMemo, 3227, [1, 2, 5, 8], "(with memo)");
