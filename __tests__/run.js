/**
 * Main test runner.
 */

import { Parser } from "../src/Parser.js";

const parser = new Parser();

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
  const ast = parser.parse(program);
  console.log(JSON.stringify(ast, null, 2));
} catch (error) {
  console.error(`${error.message}`);
}
