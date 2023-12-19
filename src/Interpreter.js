import fs from "fs";
import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";

const rl = readline.createInterface({ input, output });

export class Interpreter {
  /**
   * Initializes the interpretor.
   */
  constructor() {
    this._mem = [];
    this._pcode = [];
    this._pc = 0;
  }

  /**
   * Loads the pcode from a file.
   * @param filename
   */
  loader(filename) {
    // Open file
    const fileContent = fs.readFileSync(filename, "utf-8");

    // Read each line and store in pcode
    this._pcode = fileContent.split("\n");

    console.log("Instructions loaded.\n");
  }

  /**
   * Interprets the pcode operations.
   * @param verbose - boolean flag to print instructions
   */
  async interpretor(verbose = false) {
    let a, b, addr, value;

    // Interpret each line
    while (this._pc < this._pcode.length) {
      // Get current instruction
      const instruction = this._pcode[this._pc++];

      if (verbose) console.log(instruction);

      // Split instruction
      let [opcode, argument] = instruction.split(" ");
      if (argument) argument = parseInt(argument);

      // Execute instruction
      switch (opcode) {
        case "ADD":
          b = this._mem.pop();
          a = this._mem.pop();
          this._mem.push(a + b);
          break;

        case "SUB":
          b = this._mem.pop();
          a = this._mem.pop();
          this._mem.push(a - b);
          break;

        case "MUL":
          b = this._mem.pop();
          a = this._mem.pop();
          this._mem.push(a * b);
          break;

        case "DIV":
          b = this._mem.pop();
          a = this._mem.pop();
          this._mem.push(a / b);
          break;

        case "EQL":
          b = this._mem.pop();
          a = this._mem.pop();
          this._mem.push(a == b ? 1 : 0);
          break;

        case "NEQ":
          b = this._mem.pop();
          a = this._mem.pop();
          this._mem.push(a != b ? 1 : 0);
          break;

        case "GTR":
          b = this._mem.pop();
          a = this._mem.pop();
          this._mem.push(a > b ? 1 : 0);
          break;

        case "LSS":
          b = this._mem.pop();
          a = this._mem.pop();
          this._mem.push(a < b ? 1 : 0);
          break;

        case "GEQ":
          b = this._mem.pop();
          a = this._mem.pop();
          this._mem.push(a >= b ? 1 : 0);
          break;

        case "LEQ":
          b = this._mem.pop();
          a = this._mem.pop();
          this._mem.push(a <= b ? 1 : 0);
          break;

        case "PRN":
          console.log(this._mem.pop());
          break;

        case "INN":
          let num;
          do {
            num = parseInt(await rl.question("Enter a number: "));
          } while (num == NaN);
          addr = this._mem.pop();
          this._mem[addr] = num;
          break;

        case "INT":
          if (argument == undefined)
            throw new Error("INT instruction requires argument.");
          for (let i = 0; i < argument; i++) {
            this._mem.push(0);
          }
          break;

        case "LDI":
          if (argument == undefined)
            throw new Error("LDI instruction requires argument.");
          this._mem.push(argument);
          break;

        case "LDA":
          if (argument == undefined)
            throw new Error("LDA instruction requires argument.");
          this._mem.push(argument);
          break;

        case "LDV":
          addr = this._mem.pop();
          this._mem.push(this._mem[addr]);
          break;

        case "STO":
          value = this._mem.pop();
          addr = this._mem.pop();
          this._mem[addr] = value;
          break;

        case "BRN":
          if (argument == undefined)
            throw new Error("BRN instruction requires argument.");
          this._pc = argument;
          break;

        case "BZE":
          if (argument == undefined)
            throw new Error("BZE instruction requires argument.");
          value = this._mem.pop();
          if (value == 0) {
            this._pc = argument;
          }
          break;

        case "HLT":
          console.log("Program halted.");
          return;
        default:
          throw new Error(`Unknown instruction: ${instruction}`);
      }

      // Print memory
      if (verbose) console.log(`Memory: ${this._mem} \n`);
    }
  }
}
