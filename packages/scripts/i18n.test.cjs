const { escapeDoubleQuotes } = require("./i18n.cjs");

/**
 * Simple test runner for i18n script functions
 */
function runTests() {
  const testCases = [
    { name: "No quotes", input: "simple text", expected: "simple text" },
    { name: "Single quotes (ignored)", input: "it's a test", expected: "it's a test" },
    { name: "Unescaped double quotes", input: 'with "quote"', expected: 'with \\"quote\\"' },
    { name: "Already escaped double quotes", input: 'with \\"escaped quote\\"', expected: 'with \\"escaped quote\\"' },
    { name: "Mixed quotes", input: 'mixed "un-escaped" and \\"escaped\\"', expected: 'mixed \\"un-escaped\\" and \\"escaped\\"' },
    { name: "Empty string", input: "", expected: "" },
    { name: "Literal backslash before quote", input: 'back\\\\\\"quote', expected: 'back\\\\\\"quote' },
  ];

  let failures = 0;

  console.log("Running i18n script tests...");
  
  testCases.forEach((tc) => {
    const result = escapeDoubleQuotes(tc.input);
    if (result === tc.expected) {
      console.log(`✅ PASSED: ${tc.name}`);
    } else {
      failures++;
      console.error(`❌ FAILED: ${tc.name}`);
      console.error(`   Input:    ${JSON.stringify(tc.input)}`);
      console.error(`   Expected: ${JSON.stringify(tc.expected)}`);
      console.error(`   Result:   ${JSON.stringify(result)}`);
    }
  });

  if (failures === 0) {
    console.log("\nAll tests passed successfully!");
    process.exit(0);
  } else {
    console.error(`\n${failures} test(s) failed.`);
    process.exit(1);
  }
}

runTests();
