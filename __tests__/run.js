/**
 * Main test runner.
 */

import { Analyser } from "../src/Analyser.js";
import { Parser } from "../src/Parser.js";
import { Translator } from "../src/Translator.js";

const program = `
program Test;
begin
var a,b;
do begin
  read(a);
  b := a + b;
end while (a != 0);
write(b);
end
`;

try {
  const parser = new Parser();
  const analyser = new Analyser();
  const translator = new Translator();

  const ast = parser.parse(program);
  console.log(JSON.stringify(ast, null, 2));

  const vars = analyser.analyse(ast);
  console.log(JSON.stringify(vars, null, 2));

  const pcode = translator.translator(ast, vars);
} catch (error) {
  console.error(`${error.message}`);
}
