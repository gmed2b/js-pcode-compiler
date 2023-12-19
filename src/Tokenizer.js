/**
 * Tokenizer spec.
 */
const Spec = [
  // --------------------
  // Whitespace:
  [/^\s+/, null],

  // --------------------
  // Symbols:
  [/^;/, ";"],
  [/^,/, ","],
  [/^\(/, "("],
  [/^\)/, ")"],

  // --------------------
  // Operators:
  [/^[+\-]/, "ADDITIVE_OPERATOR"],
  [/^[*\/]/, "MULTIPLICATIVE_OPERATOR"],
  [/^:=/, "ASSIGNMENT_OPERATOR"],
  [/^=/, "EQL_OPERATOR"],
  [/^!=/, "NEQ_OPERATOR"],
  [/^<=/, "LEQ_OPERATOR"],
  [/^</, "LST_OPERATOR"],
  [/^>=/, "GEQ_OPERATOR"],
  [/^>/, "GRT_OPERATOR"],

  // --------------------
  // Keywords:
  [/^program/, "PROGRAM"],
  [/^begin/, "BEGIN"],
  [/^end/, "END"],
  [/^var/, "VAR"],
  [/^read/, "READ"],
  [/^write/, "WRITE"],
  [/^do/, "DO"],
  [/^while/, "WHILE"],

  // --------------------
  // Numbers:
  [/^\d+/, "NUMBER"],

  // --------------------
  // Identifiers:
  [/^[a-zA-Z_]\w*/, "IDENTIFIER"],
];

/**
 * Tokenizer class.
 *
 * Lazily pulls a token from a stream.
 */
export class Tokenizer {
  /**
   * Initializes the string.
   */
  init(string) {
    this._string = string;
    this._cursor = 0;
  }

  /**
   * Wether the tokenizer has more tokens.
   */
  hasMoreTokens() {
    return this._cursor < this._string.length;
  }

  /**
   * Obtains the next token.
   */
  getNextToken() {
    if (!this.hasMoreTokens()) {
      return null;
    }

    const string = this._string.slice(this._cursor);

    for (const [regexp, tokenType] of Spec) {
      const tokenValue = this._match(regexp, string);

      // Could not match this rule, continue.
      if (tokenValue == null) {
        continue;
      }

      // Ignore this token, skip.
      if (tokenType == null) {
        return this.getNextToken();
      }

      return {
        type: tokenType,
        value: tokenValue,
      };
    }

    throw new SyntaxError(`Unexpected token: \`${string[0]}\``);
  }

  _match(regexp, string) {
    const matched = regexp.exec(string);
    if (matched == null) {
      return null;
    }
    this._cursor += matched[0].length;
    return matched[0];
  }
}
