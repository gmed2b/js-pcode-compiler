/**
 * Main compiler.
 */
import fs from "fs";
import { Parser } from "./src/Parser.js";
import { Translator } from "./src/Translator.js";

try {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    throw new Error("Usage: node compile.js [-v | --verbose] <program_file>");
  }
  // check for verbose flag
  if (args.length > 2) {
    if (args[0] !== "-v" && args[0] !== "--verbose") {
      throw new Error("Unknown flag: " + args[0]);
    }
  }

  const verbose = args[0] === "-v" || args[0] === "--verbose";
  const filename = args[verbose ? 1 : 0];
  const fileContent = fs.readFileSync(filename, "utf-8");

  const parser = new Parser();
  const translator = new Translator();

  // Parse the file content into an AST
  const ast = parser.parse(fileContent);
  const program_name = ast.name;
  if (verbose) console.log(JSON.stringify(ast, null, 2));

  // Translate the AST into pcode array
  const pcode = translator.translate(ast);
  if (verbose) console.log(pcode);

  // Convert the array into a single string with each instruction on a new line
  const pcodeString = pcode.join("\n");

  // Save file in root directory/{program_name}.pcode
  const filePath = fs.realpathSync(".") + `/out/${program_name}.pcode`;

  // Write the pcode string to the file
  fs.writeFileSync(filePath, pcodeString);

  console.log("Pcode saved to file:", filePath);
} catch (error) {
  console.error(`${error}`);
  process.exit(1);
}
