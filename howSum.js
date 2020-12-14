const { PerformanceObserver, performance } = require("perf_hooks");

// can I sum numbers in array to get target number? Return any of the combination

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
Brute force 
m - target sum
n - number.lenght

number of recursive calls, time: O(n^m * m)
[...remainderResult, number] --> copy of array with maximum lenght m (adds *m to the time complexity)
space: O(m)

Memoized
time: O(n*m*m) = O(n*m^2)
space: O(m*m) = O(m^2)
maximum lenght of the array is m with m keys

*/

const howSumBrute = (targetSum, numbers) => {
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  for (let number of numbers) {
    const remainder = targetSum - number;
    const remainderResult = howSumBrute(remainder, numbers);
    if (remainderResult !== null) {
      //is possible to generate the target
      return [...remainderResult, number]; // labels of the edges pushed to the array
    }
  }

  return null;
};

const howSumMemo = (targetSum, numbers, memo={}) => {
    if (targetSum in memo) return memo[targetSum];
    if (targetSum === 0) return [];
    if (targetSum < 0) return null;
  
    for (let number of numbers) {
      const remainder = targetSum - number;
      const remainderResult = howSumMemo(remainder, numbers, memo);
      if (remainderResult !== null) {
        //is possible to generate the target
        memo[targetSum] = [...remainderResult, number]; // labels of the edges pushed to the array
        return memo[targetSum];
      }
    }
    memo[targetSum] = null;
    return null;
  };

executeWithPerformance(howSumBrute, 7, [2, 3], "(with bruteforce)");
executeWithPerformance(howSumBrute, 7, [5, 3, 4, 7], "(with bruteforce)");
executeWithPerformance(howSumBrute, 7, [2, 4], "(with bruteforce)");
executeWithPerformance(howSumBrute, 8, [2, 3, 5], "(with bruteforce)");
executeWithPerformance(howSumBrute, 20, [2, 1, 5], "(with bruteforce)");
executeWithPerformance(howSumBrute, 251, [7, 14], "(with bruteforce)");


executeWithPerformance(howSumMemo, 7, [2, 3], "(with memo)");
executeWithPerformance(howSumMemo, 7, [5, 3, 4, 7], "(with memo)");
executeWithPerformance(howSumMemo, 7, [2, 4], "(with memo)");
executeWithPerformance(howSumMemo, 8, [2, 3, 5], "(with memo)");
executeWithPerformance(howSumMemo, 20, [2, 1, 5], "(with memo)");
executeWithPerformance(howSumMemo, 251, [7, 14], "(with memo)");