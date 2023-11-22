export class Analyser {
  constructor() {
    this._ast = null;
    this._symbolTable = [];
    this._identifiers = [];
  }

  analyse(ast) {
    this._ast = ast;

    // Start the analysis from the Program node.
    // Search for all variable declarations.
    this.findAllObjectBy(this._ast, "VariableDeclaration", this._symbolTable);

    // Verify that all variables are declared.
    this.findAllObjectBy(this._ast, "Identifier", this._identifiers);
    this._identifiers.forEach((identifier) => {
      if (!this._symbolTable.find((symbol) => symbol.name === identifier)) {
        throw new Error(`Variable ${identifier} is not declared.`);
      }
    });

    return this._symbolTable;
  }

  findAllObjectBy(obj, type, array) {
    if (obj.type === type) {
      if (type === "VariableDeclaration") {
        array.push({
          name: obj.identifier.name,
          type: obj.type,
          address: array.length,
        });
      } else {
        array.push(obj.name);
      }
    }

    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        this.findAllObjectBy(obj[i], type, array);
      }
    } else if (typeof obj === "object") {
      for (let key in obj) {
        this.findAllObjectBy(obj[key], type, array);
      }
    }
  }
}
