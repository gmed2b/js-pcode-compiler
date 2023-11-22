import { Tokenizer } from "./Tokenizer.js";

/**
 * Letter parser: recursive descent parser implementation.
 */

export class Parser {
  /**
   * Initializes the parser.
   */
  constructor() {
    this._string = "";
    this._lookahead = null;
    this._tokenizer = new Tokenizer();
  }

  /**
   * Parses a string into AST (abstract syntax tree).
   */
  parse(string) {
    this._string = string;
    this._tokenizer.init(string);

    // Prime the tokenizer to obtain the first token.
    // token which is our lookahead. The lookahead is
    // used for predictive parsing.
    this._lookahead = this._tokenizer.getNextToken();

    // Start recursive descent parsing from the main
    // entry point, the Program.
    return this.Program();
  }

  /**
   * Expects a token of a given type.
   */
  _eat(tokenType) {
    const token = this._lookahead;

    if (token == null) {
      throw new SyntaxError(
        `Unexpected end of input, expected \`${tokenType}\``
      );
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(
        `Unexpected token: \`${token.value}\`, expected \`${tokenType}\``
      );
    }

    // Advance the lookahead to the next token.
    this._lookahead = this._tokenizer.getNextToken();

    return token;
  }

  /**
   * Main entry point for the parser.
   * Program
   *  | 'program' Identifier ';'
   *  | StatementList
   *  ;
   */
  Program() {
    this._eat("PROGRAM");
    const program_name = this.Identifier().name;
    this._eat(";");

    return {
      type: "Program",
      name: program_name,
      body: this.StatementList(),
    };
  }

  /**
   * StatementList
   *  | Statement (Statement)*
   *  ;
   */
  StatementList() {
    this._eat("BEGIN");
    const statements = [];
    while (this._lookahead.type != "END") {
      statements.push(this.Statement());
    }
    this._eat("END");
    return statements;
  }

  /**
   * Statement
   *  | VariableStatement
   *  | ReadStatement
   *  | DoWhileStatement
   *  ;
   */
  Statement() {
    switch (this._lookahead.type) {
      case "VAR":
        return this.VariableStatement();
      case "READ":
        return this.ReadStatement();
      case "WRITE":
        return this.WriteStatement();
      case "DO":
        return this.DoWhileStatement();
    }
    throw new SyntaxError(
      `Unexpected statement: \`${this._lookahead.value}\` at character ${this._tokenizer._cursor}.`
    );
  }

  /**
   * VariableStatement
   *  | 'var' VariableDeclarationList ';'
   */
  VariableStatement() {
    this._eat("VAR");
    const declarations = this.VariableDeclarationList();
    this._eat(";");

    return {
      type: "VariableStatement",
      declarations,
    };
  }

  /**
   * VariableDeclarationList
   * | VariableDeclaration (',' VariableDeclaration)*
   * ;
   */
  VariableDeclarationList() {
    const declarations = [];
    declarations.push(this.VariableDeclaration());
    while (this._lookahead.type === ",") {
      this._eat(",");
      declarations.push(this.VariableDeclaration());
    }
    return declarations;
  }

  /**
   * VariableDeclaration
   *  | Identifier
   *  ;
   */
  VariableDeclaration() {
    const identifier = this.Identifier();
    return {
      type: "VariableDeclaration",
      identifier,
    };
  }

  /**
   * ReadStatement
   *  | 'read' '(' Identifier ')' ';'
   *  ;
   */
  ReadStatement() {
    this._eat("READ");
    this._eat("(");
    const identifier = this.Identifier();
    this._eat(")");
    this._eat(";");

    return {
      type: "ReadStatement",
      identifier,
    };
  }

  /**
   * WriteStatement
   *  | 'write' '(' Identifier ')' ';'
   *  ;
   */
  WriteStatement() {
    this._eat("WRITE");
    this._eat("(");
    const identifier = this.Identifier();
    this._eat(")");
    this._eat(";");

    return {
      type: "WriteStatement",
      identifier,
    };
  }

  /**
   * DoWhileStatement
   *  | 'do'
   *  | StatementList
   *  | 'while' '(' Expression ')' ';'
   */
  DoWhileStatement() {
    this._eat("DO");
    const body = this.StatementList();
    this._eat("WHILE");
    this._eat("(");
    const expression = this.Expression();
    this._eat(")");
    this._eat(";");

    return {
      type: "DoWhileStatement",
      body,
      condition: expression,
    };
  }

  /**
   * Expression
   *  | Operand
   *  | Expression OPERATOR Operand
   *  ;
   */
  Expression() {
    let left = this.Operand();
    while (this._lookahead.type.includes("OPERATOR")) {
      const operator = this._eat(this._lookahead.type).value;
      const right = this.Operand();
      left = {
        type: "BinaryExpression",
        operator,
        left,
        right,
      };
    }
    return left;
  }

  /**
   * Operand
   *  | Identifier
   *  | Literal
   *  ;
   */
  Operand() {
    switch (this._lookahead.type) {
      case "IDENTIFIER":
        return this.Identifier();
      case "NUMBER":
        return this.Literal();
    }
    throw new SyntaxError(`Operand: unexpected operand production.`);
  }

  /**
   * Identifier
   *   | IDENTIFIER
   *   ;
   */
  Identifier() {
    const name = this._eat("IDENTIFIER").value;
    return name;
    // return {
    //   type: "Identifier",
    //   name,
    // };
  }

  /**
   * Literal
   *  | NumericLiteral
   *  ;
   */
  Literal() {
    switch (this._lookahead.type) {
      case "NUMBER":
        return this.NumericLiteral();
    }
    throw new SyntaxError(`Literal: unexpected literal production.`);
  }

  /**
   * NumericLiteral
   *  | NUMBER
   *  ;
   */
  NumericLiteral() {
    const token = this._eat("NUMBER");
    return {
      type: "NumericLiteral",
      value: Number(token.value),
    };
  }
}
