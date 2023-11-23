export class Translator {
  constructor() {
    this._ast = null;
    this._pcode = [];
    this._vars = [];
  }

  translate(ast) {
    this._ast = ast;
    this._vars = ast.vars.declarations;

    this.translateProgram();
    return this.pcode;
  }

  translateProgram() {
    this.initializeVars();
  }

  initializeVars() {
    // count vars in _vars
    // insert instruction `INT <count>`
  }

  // create a function `insertInstruction(ins, arg?)`
}
