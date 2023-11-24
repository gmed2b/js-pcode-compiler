/**
 * Main exec interpretor.
 */
import { Interpretor } from "./src/Interpretor.js";

try {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    throw new Error("Usage: node exec.js [-v] <pcode_file>");
  }
  // check for verbose flag
  const verbose = args[0] === "-v";
  const filePath = args[verbose ? 1 : 0];
  if (!filePath) {
    throw new Error("No file specified!");
  }

  const interpretor = new Interpretor();

  interpretor.loader(filePath);
  await interpretor.interpretor(verbose);

  process.exit(0);
} catch (error) {
  console.error(`${error.message}`);
  process.exit(1);
}
