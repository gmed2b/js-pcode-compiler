/**
 * Main test runner.
 */
import fs from "fs";
import { Parser } from "../src/Parser.js";
import { Translator } from "../src/Translator.js";

const program_sum = `
program sum;
var a,b;
begin
do begin
  read(a);
  b := a + b;
end while (a != 0);
write(b);
end
`;

const program = `
program countdown15;
var a;
begin
a := 15;
do begin
  write(a);
  a := a - 1;
end while (a != 0);
end
`;

try {
  const parser = new Parser();
  const translator = new Translator();

  const ast = parser.parse(program);
  console.log(JSON.stringify(ast, null, 2));

  const pcode = translator.translate(ast);
  console.log(pcode);

  // Convert the array into a single string with each instruction on a new line
  const pcodeString = pcode.join("\n");

  // Save file in root directory/output.pcode
  const filePath = fs.realpathSync(".") + `/out/${ast.name}.pcode`;

  // Write the pcode string to the file
  fs.writeFileSync(filePath, pcodeString);

  console.log("Pcode saved to file:", filePath);
} catch (error) {
  console.error(`${error.message}`);
}
