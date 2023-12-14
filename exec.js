/**
 * Main exec interpretor.
 */
import { Interpretor } from "./src/Interpretor.js";

try {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    throw new Error("Usage: node exec.js [-v | --verbose] <pcode_file>");
  }
  // check for verbose flag
  if (args[0] !== "-v" && args[0] !== "--verbose") {
    throw new Error("Unknown flag: " + args[0]);
  }
  const verbose = args[0] === "-v" || args[0] === "--verbose";
  const filePath = args[verbose ? 1 : 0];
  if (!filePath) {
    throw new Error("No file specified!");
  }

  // Initialize interpretor
  const interpretor = new Interpretor();

  // Load pcode from file
  interpretor.loader(filePath);
  // Interpret pcode
  await interpretor.interpretor(verbose);

  process.exit(0);
} catch (error) {
  console.error(`${error.message}`);
  process.exit(1);
}
