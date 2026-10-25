// median.js - агрегация 3 прогонов T-A2-CAF: медианы + флаги надёжности
// Без внешних зависимостей и API. В локальном режиме заменяет Code-ноду n8n.
//
// Использование:
//   node median.js run1.json run2.json run3.json     (файлы с JSON)
//   node median.js '{"t_units":61,...}' '{"t_units":58,...}' '{"t_units":63,...}'  (сырые JSON)
//
// Выход: {median: {...}, reliable: {...}, spread_max_pct: N, runs: [...]}
// Надёжность: |value - median| / median > 0.15  ->  reliable: false

const fs = require("fs");

const METRICS = ["t_units", "words", "errors", "e_per_100", "eft_per_t", "mlt", "subordination"];

function loadArg(arg) {
  let raw = arg;
  if (fs.existsSync(arg) && fs.statSync(arg).isFile()) {
    raw = fs.readFileSync(arg, "utf8");
  }
  return JSON.parse(raw.replace(/^\uFEFF/, ""));
}

function median(vals) {
  const sorted = [...vals].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

const runs = process.argv.slice(2).map(loadArg);
if (runs.length !== 3) {
  console.error("Нужно ровно 3 прогона (файлы или JSON-строки).");
  process.exit(1);
}
for (const r of runs) {
  for (const m of METRICS) {
    if (typeof r[m] !== "number") {
      console.error(`В прогоне нет числового поля "${m}":`, JSON.stringify(r).slice(0, 200));
      process.exit(1);
    }
  }
}

const metrics = {};
const reliable = {};
let maxSpread = 0;
for (const m of METRICS) {
  const vals = runs.map((r) => r[m]);
  const med = median(vals);
  const spread = Math.max(...vals.map((v) => Math.abs(v - med) / med));
  metrics[m] = med;
  reliable[m] = spread <= 0.15;
  maxSpread = Math.max(maxSpread, spread);
}

const result = {
  median: metrics,
  reliable,
  spread_max_pct: Math.round(100 * maxSpread),
  runs,
};

console.log(`Медианы: E/100 ${metrics.e_per_100} (${reliable.e_per_100 ? "" : "НЕ"}надежно), ` +
  `EFT/T ${metrics.eft_per_t} (${reliable.eft_per_t ? "" : "НЕ"}надежно), ` +
  `MLT ${metrics.mlt} (${reliable.mlt ? "" : "НЕ"}надежно), sub ${metrics.subordination} (${reliable.subordination ? "" : "НЕ"}надежно) | ` +
  `макс. разброс ${result.spread_max_pct}% (лимит 15%)`);
process.stdout.write(JSON.stringify(result, null, 2) + "\n");
