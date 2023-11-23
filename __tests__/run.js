/**
 * Main test runner.
 */
import fs from "fs";
import { Parser } from "../src/Parser.js";
import { Translator } from "../src/Translator.js";

const program = `
program Test;
var a,b;
begin
do begin
  read(a);
  b := a + b;
end while (a != 0);
write(b);
end
`;

try {
  const parser = new Parser();
  const translator = new Translator();

  const ast = parser.parse(program);
  console.log(JSON.stringify(ast, null, 2));

  const pcode = translator.translate(ast);
  console.log(pcode);
  // Save the pcode to a file.

  // Convert the array into a single string with each instruction on a new line
  const pcodeString = pcode.join("\n");

  // Save file in root directory/output.pcode
  const filePath = fs.realpathSync(".") + "/out/output.pcode";

  // Write the pcode string to the file
  fs.writeFileSync(filePath, pcodeString);

  console.log("Pcode saved to file:", filePath);
} catch (error) {
  console.error(`${error.message}`);
}
