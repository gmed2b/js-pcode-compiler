/**
 * Main test runner.
 */
import { Interpretor } from "../src/Interpretor.js";

try {
  const interpretor = new Interpretor();

  // get console arguments
  console.log(process.argv);
  const args = process.argv.slice(2);
  if (args.length === 0) {
    throw new Error("No file specified!");
  }
  const filePath = args[0];

  // interpretor.loader(filePath);
  // await interpretor.interpretor();
  process.exit(0);
} catch (error) {
  console.error(`${error.message}`);
}
