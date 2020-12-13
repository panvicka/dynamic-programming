const { PerformanceObserver, performance } = require("perf_hooks");

// 2D grid m*n, want to travel, only can go right and down
// reducing the size of the grid with every step

function executeWithPerformance(functionToRun, rows, colums, extraText) {
  const t0 = performance.now();
  const result = functionToRun(rows, colums);
  const t1 = performance.now();
  console.log(
    `grid with ${rows} rows and ${colums} columns can be traveled in ${result} ways and it took ${
      t1 - t0
    } miliseconds ${extraText}`
  );
}

// brute force
// O(2^(n+m))
// O(m+n)

// memo
// O(m*n)
// O(n+m)

const gridTravelBrute = (m, n) => {
  // travel grid of 1,1 can only be in one way (kinda do nothing)
  if (n === 1 && m === 1) return 1;
  // invalid grid wont be traveled
  if (n === 0 || m === 0) return 0;

  return gridTravelBrute(m - 1, n) + gridTravelBrute(n - 1, m);
};



const gridMemo = (m, n, memo = {}) => {
  // are arguments in memos
  const key = m + "," + n;
  if (key in memo) return memo[key];
  // travel grid of 1,1 can only be in one way (kinda do nothing)
  if (n === 1 && m === 1) return 1;
  // invalid grid wont be traveled
  if (n === 0 || m === 0) return 0;

  memo[key] = gridMemo(m - 1, n, memo) + gridMemo(n - 1, m, memo);
  return memo[key];
};

executeWithPerformance(gridTravelBrute, 1, 1, "(with bruteforce)");
executeWithPerformance(gridTravelBrute, 2, 3, "(with bruteforce)");
executeWithPerformance(gridTravelBrute, 3, 2, "(with bruteforce)");
executeWithPerformance(gridTravelBrute, 3, 3, "(with bruteforce)");
executeWithPerformance(gridTravelBrute, 15, 15, "(with bruteforce)");

executeWithPerformance(gridMemo, 1, 1, "(with bruteforce)");
executeWithPerformance(gridMemo, 2, 3, "(with bruteforce)");
executeWithPerformance(gridMemo, 3, 2, "(with bruteforce)");
executeWithPerformance(gridMemo, 3, 3, "(with bruteforce)");
executeWithPerformance(gridMemo, 15, 15, "(with bruteforce)");