export class Translator {
  constructor() {
    this._ast = null;
    this._pcode = [];
    this._vars = [];
    this._jumpStack = [];
  }

  translate(ast) {
    this._ast = ast;
    this.instanciateVars();
    this.translateProgram();
    return this._pcode;
  }

  instanciateVars() {
    for (const { identifier } of this._ast.vars.declarations) {
      this._vars.push(identifier.name);
    }
  }

  translateProgram() {
    this.initializeVars();
    this.translateBody();
  }

  initializeVars() {
    const count = this._vars.length;
    this.insertInstruction("INT", count);
  }

  translateBody() {
    for (const statement of this._ast.body) {
      this.translateStatement(statement);
    }
    this.insertInstruction("HLT");
  }

  translateStatement(statement) {
    switch (statement.type) {
      case "ReadStatement":
        this.translateReadStatement(statement);
        break;
      case "WriteStatement":
        this.translateWriteStatement(statement);
        break;
      case "DoWhileStatement":
        this.translateDoWhileStatement(statement);
        break;
      case "AssignmentStatement":
        this.translateAssignmentStatement(statement);
        break;
      default:
        throw new Error(`Unknown statement type: ${statement.type}`);
    }
  }

  translateReadStatement(statement) {
    this.insertInstruction("LDA", this._getVariableIndex(statement.identifier));
    this.insertInstruction("INN");
  }

  translateWriteStatement(statement) {
    this.translateExpression(statement.expression);
    this.insertInstruction("PRN");
  }

  translateDoWhileStatement(statement) {
    // Store program counter.
    this._jumpStack.push(this._pcode.length);
    // Translate body.
    for (const stmt of statement.body) {
      this.translateStatement(stmt);
    }
    // Load condition.
    this.translateExpression(statement.condition);
    // Jump back to body if head is 0.
    this.insertInstruction("BZE", this._jumpStack.pop());
  }

  translateAssignmentStatement(statement) {
    // Load address of variable we want to assign to.
    this.insertInstruction("LDA", this._getVariableIndex(statement.identifier));
    // Load value of expression.
    this.translateExpression(statement.expression);
    // Store value of expression in variable.
    this.insertInstruction("STO");
  }

  translateExpression(expression) {
    switch (expression.type) {
      case "BinaryExpression":
        this.translateBinaryExpression(expression);
        break;
      case "Identifier":
        this.translateIdentifier(expression);
        break;
      case "NumericLiteral":
        this.translateNumberLiteral(expression);
        break;
      default:
        throw new Error(`Unknown expression type: ${expression.type}`);
    }
  }

  translateBinaryExpression(expression) {
    this.translateExpression(expression.left);
    this.translateExpression(expression.right);
    switch (expression.operator) {
      case "+":
        this.insertInstruction("ADD");
        break;
      case "-":
        this.insertInstruction("SUB");
        break;
      case "*":
        this.insertInstruction("MUL");
        break;
      case "/":
        this.insertInstruction("DIV");
        break;
      case "!=":
        this.insertInstruction("EQL"); // TODO: understand why this is EQL
        break;
      default:
        throw new Error(`Unknown operator: ${expression.operator}`);
    }
  }

  translateIdentifier(expression) {
    this.insertInstruction("LDA", this._getVariableIndex(expression));
    this.insertInstruction("LDV");
  }

  translateNumberLiteral(expression) {
    this.insertInstruction("LDI", expression.value);
  }

  // create a function `insertInstruction(ins, arg?)`
  insertInstruction(ins, arg = null) {
    if (arg == null) {
      this._pcode.push(ins);
    } else {
      this._pcode.push(`${ins} ${arg}`);
    }
  }

  _getVariableIndex(identifer) {
    const index = this._vars.indexOf(identifer.name);
    if (index >= 0) {
      return index;
    } else {
      throw new Error(`Unknown variable: ${identifer.name}`);
    }
  }
}
