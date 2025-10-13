import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Path to your test folder
const testDir = path.join(process.cwd(), 'tests');

// Get all spec files
const specs = fs.readdirSync(testDir).filter(file => file.endsWith('.spec.ts'));

const resultsDirs = [];

for (const spec of specs) {
  const specName = path.basename(spec, '.spec.ts');
  const resultsDir = `allure-results-${specName}`;
  resultsDirs.push(resultsDir);

  console.log(`🧪 Running ${specName}...`);
  
  try {
    execSync(
      `ALLURE_RESULTS_DIR=${resultsDir} npx playwright test ${path.join('tests', spec)} --reporter=allure-playwright --workers=1`,
      { stdio: 'inherit' }
    );
  } catch {
    console.warn(`⚠️ Test failed for ${specName}, continuing...`);
  }
}

// After all specs run
console.log('📦 Merging Allure results...');
const mergeCommand = `allure merge ${resultsDirs.join(' ')} -o allure-results`;
execSync(mergeCommand, { stdio: 'inherit' });

console.log('📊 Generating final Allure report...');
execSync('allure generate allure-results -o allure-report --clean', { stdio: 'inherit' });
execSync('allure open allure-report', { stdio: 'inherit' });
