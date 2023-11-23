/**
 * Main test runner.
 */

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
} catch (error) {
  console.error(`${error.message}`);
}
