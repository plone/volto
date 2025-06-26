import { c as commonjsGlobal } from "./index-CFtE-bf8.js";
var dist = { exports: {} };
(function(module, exports) {
  (function(global, factory) {
    factory(exports);
  })(commonjsGlobal, function(exports2) {
    function tokenToString(token) {
      if (token.text !== void 0 && token.text !== "") {
        return `'${token.type}' with value '${token.text}'`;
      } else {
        return `'${token.type}'`;
      }
    }
    class NoParsletFoundError extends Error {
      constructor(token) {
        super(`No parslet found for token: ${tokenToString(token)}`);
        this.token = token;
        Object.setPrototypeOf(this, NoParsletFoundError.prototype);
      }
      getToken() {
        return this.token;
      }
    }
    class EarlyEndOfParseError extends Error {
      constructor(token) {
        super(`The parsing ended early. The next token was: ${tokenToString(token)}`);
        this.token = token;
        Object.setPrototypeOf(this, EarlyEndOfParseError.prototype);
      }
      getToken() {
        return this.token;
      }
    }
    class UnexpectedTypeError extends Error {
      constructor(result, message) {
        let error = `Unexpected type: '${result.type}'.`;
        if (message !== void 0) {
          error += ` Message: ${message}`;
        }
        super(error);
        Object.setPrototypeOf(this, UnexpectedTypeError.prototype);
      }
    }
    function makePunctuationRule(type) {
      return (text) => {
        if (text.startsWith(type)) {
          return { type, text: type };
        } else {
          return null;
        }
      };
    }
    function getQuoted(text) {
      let position = 0;
      let char;
      const mark = text[0];
      let escaped = false;
      if (mark !== "'" && mark !== '"') {
        return null;
      }
      while (position < text.length) {
        position++;
        char = text[position];
        if (!escaped && char === mark) {
          position++;
          break;
        }
        escaped = !escaped && char === "\\";
      }
      if (char !== mark) {
        throw new Error("Unterminated String");
      }
      return text.slice(0, position);
    }
    const identifierStartRegex = new RegExp("[$_\\p{ID_Start}]|\\\\u\\p{Hex_Digit}{4}|\\\\u\\{0*(?:\\p{Hex_Digit}{1,5}|10\\p{Hex_Digit}{4})\\}", "u");
    const identifierContinueRegex = new RegExp("[$\\-\\p{ID_Continue}\\u200C\\u200D]|\\\\u\\p{Hex_Digit}{4}|\\\\u\\{0*(?:\\p{Hex_Digit}{1,5}|10\\p{Hex_Digit}{4})\\}", "u");
    function getIdentifier(text) {
      let char = text[0];
      if (!identifierStartRegex.test(char)) {
        return null;
      }
      let position = 1;
      do {
        char = text[position];
        if (!identifierContinueRegex.test(char)) {
          break;
        }
        position++;
      } while (position < text.length);
      return text.slice(0, position);
    }
    const numberRegex = /^(NaN|-?((\d*\.\d+|\d+)([Ee][+-]?\d+)?|Infinity))/;
    function getNumber(text) {
      var _a, _b;
      return (_b = (_a = numberRegex.exec(text)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
    }
    const identifierRule = (text) => {
      const value = getIdentifier(text);
      if (value == null) {
        return null;
      }
      return {
        type: "Identifier",
        text: value
      };
    };
    function makeKeyWordRule(type) {
      return (text) => {
        if (!text.startsWith(type)) {
          return null;
        }
        const prepends = text[type.length];
        if (prepends !== void 0 && identifierContinueRegex.test(prepends)) {
          return null;
        }
        return {
          type,
          text: type
        };
      };
    }
    const stringValueRule = (text) => {
      const value = getQuoted(text);
      if (value == null) {
        return null;
      }
      return {
        type: "StringValue",
        text: value
      };
    };
    const eofRule = (text) => {
      if (text.length > 0) {
        return null;
      }
      return {
        type: "EOF",
        text: ""
      };
    };
    const numberRule = (text) => {
      const value = getNumber(text);
      if (value === null) {
        return null;
      }
      return {
        type: "Number",
        text: value
      };
    };
    const rules = [
      eofRule,
      makePunctuationRule("=>"),
      makePunctuationRule("("),
      makePunctuationRule(")"),
      makePunctuationRule("{"),
      makePunctuationRule("}"),
      makePunctuationRule("["),
      makePunctuationRule("]"),
      makePunctuationRule("|"),
      makePunctuationRule("&"),
      makePunctuationRule("<"),
      makePunctuationRule(">"),
      makePunctuationRule(","),
      makePunctuationRule(";"),
      makePunctuationRule("*"),
      makePunctuationRule("?"),
      makePunctuationRule("!"),
      makePunctuationRule("="),
      makePunctuationRule(":"),
      makePunctuationRule("..."),
      makePunctuationRule("."),
      makePunctuationRule("#"),
      makePunctuationRule("~"),
      makePunctuationRule("/"),
      makePunctuationRule("@"),
      makeKeyWordRule("undefined"),
      makeKeyWordRule("null"),
      makeKeyWordRule("function"),
      makeKeyWordRule("this"),
      makeKeyWordRule("new"),
      makeKeyWordRule("module"),
      makeKeyWordRule("event"),
      makeKeyWordRule("external"),
      makeKeyWordRule("typeof"),
      makeKeyWordRule("keyof"),
      makeKeyWordRule("readonly"),
      makeKeyWordRule("import"),
      makeKeyWordRule("is"),
      makeKeyWordRule("in"),
      makeKeyWordRule("asserts"),
      numberRule,
      identifierRule,
      stringValueRule
    ];
    const breakingWhitespaceRegex = /^\s*\n\s*/;
    class Lexer {
      static create(text) {
        const current = this.read(text);
        text = current.text;
        const next = this.read(text);
        text = next.text;
        return new Lexer(text, void 0, current.token, next.token);
      }
      constructor(text, previous, current, next) {
        this.text = "";
        this.text = text;
        this.previous = previous;
        this.current = current;
        this.next = next;
      }
      static read(text, startOfLine = false) {
        startOfLine = startOfLine || breakingWhitespaceRegex.test(text);
        text = text.trim();
        for (const rule of rules) {
          const partial = rule(text);
          if (partial !== null) {
            const token = Object.assign(Object.assign({}, partial), { startOfLine });
            text = text.slice(token.text.length);
            return { text, token };
          }
        }
        throw new Error("Unexpected Token " + text);
      }
      advance() {
        const next = Lexer.read(this.text);
        return new Lexer(next.text, this.current, this.next, next.token);
      }
    }
    function assertRootResult(result) {
      if (result === void 0) {
        throw new Error("Unexpected undefined");
      }
      if (result.type === "JsdocTypeKeyValue" || result.type === "JsdocTypeParameterList" || result.type === "JsdocTypeProperty" || result.type === "JsdocTypeReadonlyProperty" || result.type === "JsdocTypeObjectField" || result.type === "JsdocTypeJsdocObjectField" || result.type === "JsdocTypeIndexSignature" || result.type === "JsdocTypeMappedType") {
        throw new UnexpectedTypeError(result);
      }
      return result;
    }
    function assertPlainKeyValueOrRootResult(result) {
      if (result.type === "JsdocTypeKeyValue") {
        return assertPlainKeyValueResult(result);
      }
      return assertRootResult(result);
    }
    function assertPlainKeyValueOrNameResult(result) {
      if (result.type === "JsdocTypeName") {
        return result;
      }
      return assertPlainKeyValueResult(result);
    }
    function assertPlainKeyValueResult(result) {
      if (result.type !== "JsdocTypeKeyValue") {
        throw new UnexpectedTypeError(result);
      }
      return result;
    }
    function assertNumberOrVariadicNameResult(result) {
      var _a;
      if (result.type === "JsdocTypeVariadic") {
        if (((_a = result.element) === null || _a === void 0 ? void 0 : _a.type) === "JsdocTypeName") {
          return result;
        }
        throw new UnexpectedTypeError(result);
      }
      if (result.type !== "JsdocTypeNumber" && result.type !== "JsdocTypeName") {
        throw new UnexpectedTypeError(result);
      }
      return result;
    }
    function isSquaredProperty(result) {
      return result.type === "JsdocTypeIndexSignature" || result.type === "JsdocTypeMappedType";
    }
    var Precedence;
    (function(Precedence2) {
      Precedence2[Precedence2["ALL"] = 0] = "ALL";
      Precedence2[Precedence2["PARAMETER_LIST"] = 1] = "PARAMETER_LIST";
      Precedence2[Precedence2["OBJECT"] = 2] = "OBJECT";
      Precedence2[Precedence2["KEY_VALUE"] = 3] = "KEY_VALUE";
      Precedence2[Precedence2["INDEX_BRACKETS"] = 4] = "INDEX_BRACKETS";
      Precedence2[Precedence2["UNION"] = 5] = "UNION";
      Precedence2[Precedence2["INTERSECTION"] = 6] = "INTERSECTION";
      Precedence2[Precedence2["PREFIX"] = 7] = "PREFIX";
      Precedence2[Precedence2["INFIX"] = 8] = "INFIX";
      Precedence2[Precedence2["TUPLE"] = 9] = "TUPLE";
      Precedence2[Precedence2["SYMBOL"] = 10] = "SYMBOL";
      Precedence2[Precedence2["OPTIONAL"] = 11] = "OPTIONAL";
      Precedence2[Precedence2["NULLABLE"] = 12] = "NULLABLE";
      Precedence2[Precedence2["KEY_OF_TYPE_OF"] = 13] = "KEY_OF_TYPE_OF";
      Precedence2[Precedence2["FUNCTION"] = 14] = "FUNCTION";
      Precedence2[Precedence2["ARROW"] = 15] = "ARROW";
      Precedence2[Precedence2["ARRAY_BRACKETS"] = 16] = "ARRAY_BRACKETS";
      Precedence2[Precedence2["GENERIC"] = 17] = "GENERIC";
      Precedence2[Precedence2["NAME_PATH"] = 18] = "NAME_PATH";
      Precedence2[Precedence2["PARENTHESIS"] = 19] = "PARENTHESIS";
      Precedence2[Precedence2["SPECIAL_TYPES"] = 20] = "SPECIAL_TYPES";
    })(Precedence || (Precedence = {}));
    class Parser {
      constructor(grammar, textOrLexer, baseParser) {
        this.grammar = grammar;
        if (typeof textOrLexer === "string") {
          this._lexer = Lexer.create(textOrLexer);
        } else {
          this._lexer = textOrLexer;
        }
        this.baseParser = baseParser;
      }
      get lexer() {
        return this._lexer;
      }
      /**
       * Parses a given string and throws an error if the parse ended before the end of the string.
       */
      parse() {
        const result = this.parseType(Precedence.ALL);
        if (this.lexer.current.type !== "EOF") {
          throw new EarlyEndOfParseError(this.lexer.current);
        }
        return result;
      }
      /**
       * Parses with the current lexer and asserts that the result is a {@link RootResult}.
       */
      parseType(precedence) {
        return assertRootResult(this.parseIntermediateType(precedence));
      }
      /**
       * The main parsing function. First it tries to parse the current state in the prefix step, and then it continues
       * to parse the state in the infix step.
       */
      parseIntermediateType(precedence) {
        const result = this.tryParslets(null, precedence);
        if (result === null) {
          throw new NoParsletFoundError(this.lexer.current);
        }
        return this.parseInfixIntermediateType(result, precedence);
      }
      /**
       * In the infix parsing step the parser continues to parse the current state with all parslets until none returns
       * a result.
       */
      parseInfixIntermediateType(left, precedence) {
        let result = this.tryParslets(left, precedence);
        while (result !== null) {
          left = result;
          result = this.tryParslets(left, precedence);
        }
        return left;
      }
      /**
       * Tries to parse the current state with all parslets in the grammar and returns the first non null result.
       */
      tryParslets(left, precedence) {
        for (const parslet of this.grammar) {
          const result = parslet(this, precedence, left);
          if (result !== null) {
            return result;
          }
        }
        return null;
      }
      /**
       * If the given type equals the current type of the {@link Lexer} advance the lexer. Return true if the lexer was
       * advanced.
       */
      consume(types) {
        if (!Array.isArray(types)) {
          types = [types];
        }
        if (types.includes(this.lexer.current.type)) {
          this._lexer = this.lexer.advance();
          return true;
        } else {
          return false;
        }
      }
      acceptLexerState(parser) {
        this._lexer = parser.lexer;
      }
    }
    function isQuestionMarkUnknownType(next) {
      return next === "EOF" || next === "|" || next === "," || next === ")" || next === ">";
    }
    const nullableParslet = (parser, precedence, left) => {
      const type = parser.lexer.current.type;
      const next = parser.lexer.next.type;
      const accept = left == null && type === "?" && !isQuestionMarkUnknownType(next) || left != null && type === "?";
      if (!accept) {
        return null;
      }
      parser.consume("?");
      if (left == null) {
        return {
          type: "JsdocTypeNullable",
          element: parser.parseType(Precedence.NULLABLE),
          meta: {
            position: "prefix"
          }
        };
      } else {
        return {
          type: "JsdocTypeNullable",
          element: assertRootResult(left),
          meta: {
            position: "suffix"
          }
        };
      }
    };
    function composeParslet(options) {
      const parslet = (parser, curPrecedence, left) => {
        const type = parser.lexer.current.type;
        const next = parser.lexer.next.type;
        if (left === null) {
          if ("parsePrefix" in options) {
            if (options.accept(type, next)) {
              return options.parsePrefix(parser);
            }
          }
        } else {
          if ("parseInfix" in options) {
            if (options.precedence > curPrecedence && options.accept(type, next)) {
              return options.parseInfix(parser, left);
            }
          }
        }
        return null;
      };
      Object.defineProperty(parslet, "name", {
        value: options.name
      });
      return parslet;
    }
    const optionalParslet = composeParslet({
      name: "optionalParslet",
      accept: (type) => type === "=",
      precedence: Precedence.OPTIONAL,
      parsePrefix: (parser) => {
        parser.consume("=");
        return {
          type: "JsdocTypeOptional",
          element: parser.parseType(Precedence.OPTIONAL),
          meta: {
            position: "prefix"
          }
        };
      },
      parseInfix: (parser, left) => {
        parser.consume("=");
        return {
          type: "JsdocTypeOptional",
          element: assertRootResult(left),
          meta: {
            position: "suffix"
          }
        };
      }
    });
    const numberParslet = composeParslet({
      name: "numberParslet",
      accept: (type) => type === "Number",
      parsePrefix: (parser) => {
        const value = parseFloat(parser.lexer.current.text);
        parser.consume("Number");
        return {
          type: "JsdocTypeNumber",
          value
        };
      }
    });
    const parenthesisParslet = composeParslet({
      name: "parenthesisParslet",
      accept: (type) => type === "(",
      parsePrefix: (parser) => {
        parser.consume("(");
        if (parser.consume(")")) {
          return {
            type: "JsdocTypeParameterList",
            elements: []
          };
        }
        const result = parser.parseIntermediateType(Precedence.ALL);
        if (!parser.consume(")")) {
          throw new Error("Unterminated parenthesis");
        }
        if (result.type === "JsdocTypeParameterList") {
          return result;
        } else if (result.type === "JsdocTypeKeyValue") {
          return {
            type: "JsdocTypeParameterList",
            elements: [result]
          };
        }
        return {
          type: "JsdocTypeParenthesis",
          element: assertRootResult(result)
        };
      }
    });
    const specialTypesParslet = composeParslet({
      name: "specialTypesParslet",
      accept: (type, next) => type === "?" && isQuestionMarkUnknownType(next) || type === "null" || type === "undefined" || type === "*",
      parsePrefix: (parser) => {
        if (parser.consume("null")) {
          return {
            type: "JsdocTypeNull"
          };
        }
        if (parser.consume("undefined")) {
          return {
            type: "JsdocTypeUndefined"
          };
        }
        if (parser.consume("*")) {
          return {
            type: "JsdocTypeAny"
          };
        }
        if (parser.consume("?")) {
          return {
            type: "JsdocTypeUnknown"
          };
        }
        throw new Error("Unacceptable token: " + parser.lexer.current.text);
      }
    });
    const notNullableParslet = composeParslet({
      name: "notNullableParslet",
      accept: (type) => type === "!",
      precedence: Precedence.NULLABLE,
      parsePrefix: (parser) => {
        parser.consume("!");
        return {
          type: "JsdocTypeNotNullable",
          element: parser.parseType(Precedence.NULLABLE),
          meta: {
            position: "prefix"
          }
        };
      },
      parseInfix: (parser, left) => {
        parser.consume("!");
        return {
          type: "JsdocTypeNotNullable",
          element: assertRootResult(left),
          meta: {
            position: "suffix"
          }
        };
      }
    });
    function createParameterListParslet({ allowTrailingComma }) {
      return composeParslet({
        name: "parameterListParslet",
        accept: (type) => type === ",",
        precedence: Precedence.PARAMETER_LIST,
        parseInfix: (parser, left) => {
          const elements = [
            assertPlainKeyValueOrRootResult(left)
          ];
          parser.consume(",");
          do {
            try {
              const next = parser.parseIntermediateType(Precedence.PARAMETER_LIST);
              elements.push(assertPlainKeyValueOrRootResult(next));
            } catch (e) {
              if (e instanceof NoParsletFoundError) {
                break;
              } else {
                throw e;
              }
            }
          } while (parser.consume(","));
          if (elements.length > 0 && elements.slice(0, -1).some((e) => e.type === "JsdocTypeVariadic")) {
            throw new Error("Only the last parameter may be a rest parameter");
          }
          return {
            type: "JsdocTypeParameterList",
            elements
          };
        }
      });
    }
    const genericParslet = composeParslet({
      name: "genericParslet",
      accept: (type, next) => type === "<" || type === "." && next === "<",
      precedence: Precedence.GENERIC,
      parseInfix: (parser, left) => {
        const dot = parser.consume(".");
        parser.consume("<");
        const objects = [];
        do {
          objects.push(parser.parseType(Precedence.PARAMETER_LIST));
        } while (parser.consume(","));
        if (!parser.consume(">")) {
          throw new Error("Unterminated generic parameter list");
        }
        return {
          type: "JsdocTypeGeneric",
          left: assertRootResult(left),
          elements: objects,
          meta: {
            brackets: "angle",
            dot
          }
        };
      }
    });
    const unionParslet = composeParslet({
      name: "unionParslet",
      accept: (type) => type === "|",
      precedence: Precedence.UNION,
      parseInfix: (parser, left) => {
        parser.consume("|");
        const elements = [];
        do {
          elements.push(parser.parseType(Precedence.UNION));
        } while (parser.consume("|"));
        return {
          type: "JsdocTypeUnion",
          elements: [assertRootResult(left), ...elements]
        };
      }
    });
    const baseGrammar = [
      nullableParslet,
      optionalParslet,
      numberParslet,
      parenthesisParslet,
      specialTypesParslet,
      notNullableParslet,
      createParameterListParslet({
        allowTrailingComma: true
      }),
      genericParslet,
      unionParslet,
      optionalParslet
    ];
    function createNamePathParslet({ allowSquareBracketsOnAnyType, allowJsdocNamePaths, pathGrammar: pathGrammar2 }) {
      return function namePathParslet(parser, precedence, left) {
        if (left == null || precedence >= Precedence.NAME_PATH) {
          return null;
        }
        const type = parser.lexer.current.type;
        const next = parser.lexer.next.type;
        const accept = type === "." && next !== "<" || type === "[" && (allowSquareBracketsOnAnyType || left.type === "JsdocTypeName") || allowJsdocNamePaths && (type === "~" || type === "#");
        if (!accept) {
          return null;
        }
        let pathType;
        let brackets = false;
        if (parser.consume(".")) {
          pathType = "property";
        } else if (parser.consume("[")) {
          pathType = "property-brackets";
          brackets = true;
        } else if (parser.consume("~")) {
          pathType = "inner";
        } else {
          parser.consume("#");
          pathType = "instance";
        }
        const pathParser = pathGrammar2 !== null ? new Parser(pathGrammar2, parser.lexer, parser) : parser;
        const parsed = pathParser.parseIntermediateType(Precedence.NAME_PATH);
        parser.acceptLexerState(pathParser);
        let right;
        switch (parsed.type) {
          case "JsdocTypeName":
            right = {
              type: "JsdocTypeProperty",
              value: parsed.value,
              meta: {
                quote: void 0
              }
            };
            break;
          case "JsdocTypeNumber":
            right = {
              type: "JsdocTypeProperty",
              value: parsed.value.toString(10),
              meta: {
                quote: void 0
              }
            };
            break;
          case "JsdocTypeStringValue":
            right = {
              type: "JsdocTypeProperty",
              value: parsed.value,
              meta: {
                quote: parsed.meta.quote
              }
            };
            break;
          case "JsdocTypeSpecialNamePath":
            if (parsed.specialType === "event") {
              right = parsed;
            } else {
              throw new UnexpectedTypeError(parsed, "Type 'JsdocTypeSpecialNamePath' is only allowed with specialType 'event'");
            }
            break;
          default:
            throw new UnexpectedTypeError(parsed, "Expecting 'JsdocTypeName', 'JsdocTypeNumber', 'JsdocStringValue' or 'JsdocTypeSpecialNamePath'");
        }
        if (brackets && !parser.consume("]")) {
          const token = parser.lexer.current;
          throw new Error(`Unterminated square brackets. Next token is '${token.type}' with text '${token.text}'`);
        }
        return {
          type: "JsdocTypeNamePath",
          left: assertRootResult(left),
          right,
          pathType
        };
      };
    }
    function createNameParslet({ allowedAdditionalTokens }) {
      return composeParslet({
        name: "nameParslet",
        accept: (type) => type === "Identifier" || type === "this" || type === "new" || allowedAdditionalTokens.includes(type),
        parsePrefix: (parser) => {
          const { type, text } = parser.lexer.current;
          parser.consume(type);
          return {
            type: "JsdocTypeName",
            value: text
          };
        }
      });
    }
    const stringValueParslet = composeParslet({
      name: "stringValueParslet",
      accept: (type) => type === "StringValue",
      parsePrefix: (parser) => {
        const text = parser.lexer.current.text;
        parser.consume("StringValue");
        return {
          type: "JsdocTypeStringValue",
          value: text.slice(1, -1),
          meta: {
            quote: text[0] === "'" ? "single" : "double"
          }
        };
      }
    });
    function createSpecialNamePathParslet({ pathGrammar: pathGrammar2, allowedTypes }) {
      return composeParslet({
        name: "specialNamePathParslet",
        accept: (type) => allowedTypes.includes(type),
        parsePrefix: (parser) => {
          const type = parser.lexer.current.type;
          parser.consume(type);
          if (!parser.consume(":")) {
            return {
              type: "JsdocTypeName",
              value: type
            };
          }
          let result;
          let token = parser.lexer.current;
          if (parser.consume("StringValue")) {
            result = {
              type: "JsdocTypeSpecialNamePath",
              value: token.text.slice(1, -1),
              specialType: type,
              meta: {
                quote: token.text[0] === "'" ? "single" : "double"
              }
            };
          } else {
            let value = "";
            const allowed = ["Identifier", "@", "/"];
            while (allowed.some((type2) => parser.consume(type2))) {
              value += token.text;
              token = parser.lexer.current;
            }
            result = {
              type: "JsdocTypeSpecialNamePath",
              value,
              specialType: type,
              meta: {
                quote: void 0
              }
            };
          }
          const moduleParser = new Parser(pathGrammar2, parser.lexer, parser);
          const moduleResult = moduleParser.parseInfixIntermediateType(result, Precedence.ALL);
          parser.acceptLexerState(moduleParser);
          return assertRootResult(moduleResult);
        }
      });
    }
    const basePathGrammar = [
      createNameParslet({
        allowedAdditionalTokens: ["external", "module"]
      }),
      stringValueParslet,
      numberParslet,
      createNamePathParslet({
        allowSquareBracketsOnAnyType: false,
        allowJsdocNamePaths: true,
        pathGrammar: null
      })
    ];
    const pathGrammar = [
      ...basePathGrammar,
      createSpecialNamePathParslet({
        allowedTypes: ["event"],
        pathGrammar: basePathGrammar
      })
    ];
    function getParameters(value) {
      let parameters;
      if (value.type === "JsdocTypeParameterList") {
        parameters = value.elements;
      } else if (value.type === "JsdocTypeParenthesis") {
        parameters = [value.element];
      } else {
        throw new UnexpectedTypeError(value);
      }
      return parameters.map((p) => assertPlainKeyValueOrRootResult(p));
    }
    function getUnnamedParameters(value) {
      const parameters = getParameters(value);
      if (parameters.some((p) => p.type === "JsdocTypeKeyValue")) {
        throw new Error("No parameter should be named");
      }
      return parameters;
    }
    function createFunctionParslet({ allowNamedParameters, allowNoReturnType, allowWithoutParenthesis, allowNewAsFunctionKeyword }) {
      return composeParslet({
        name: "functionParslet",
        accept: (type, next) => type === "function" || allowNewAsFunctionKeyword && type === "new" && next === "(",
        parsePrefix: (parser) => {
          const newKeyword = parser.consume("new");
          parser.consume("function");
          const hasParenthesis = parser.lexer.current.type === "(";
          if (!hasParenthesis) {
            if (!allowWithoutParenthesis) {
              throw new Error("function is missing parameter list");
            }
            return {
              type: "JsdocTypeName",
              value: "function"
            };
          }
          let result = {
            type: "JsdocTypeFunction",
            parameters: [],
            arrow: false,
            constructor: newKeyword,
            parenthesis: hasParenthesis
          };
          const value = parser.parseIntermediateType(Precedence.FUNCTION);
          if (allowNamedParameters === void 0) {
            result.parameters = getUnnamedParameters(value);
          } else if (newKeyword && value.type === "JsdocTypeFunction" && value.arrow) {
            result = value;
            result.constructor = true;
            return result;
          } else {
            result.parameters = getParameters(value);
            for (const p of result.parameters) {
              if (p.type === "JsdocTypeKeyValue" && !allowNamedParameters.includes(p.key)) {
                throw new Error(`only allowed named parameters are ${allowNamedParameters.join(", ")} but got ${p.type}`);
              }
            }
          }
          if (parser.consume(":")) {
            result.returnType = parser.parseType(Precedence.PREFIX);
          } else {
            if (!allowNoReturnType) {
              throw new Error("function is missing return type");
            }
          }
          return result;
        }
      });
    }
    function createVariadicParslet({ allowPostfix, allowEnclosingBrackets }) {
      return composeParslet({
        name: "variadicParslet",
        accept: (type) => type === "...",
        precedence: Precedence.PREFIX,
        parsePrefix: (parser) => {
          parser.consume("...");
          const brackets = allowEnclosingBrackets && parser.consume("[");
          try {
            const element = parser.parseType(Precedence.PREFIX);
            if (brackets && !parser.consume("]")) {
              throw new Error("Unterminated variadic type. Missing ']'");
            }
            return {
              type: "JsdocTypeVariadic",
              element: assertRootResult(element),
              meta: {
                position: "prefix",
                squareBrackets: brackets
              }
            };
          } catch (e) {
            if (e instanceof NoParsletFoundError) {
              if (brackets) {
                throw new Error("Empty square brackets for variadic are not allowed.");
              }
              return {
                type: "JsdocTypeVariadic",
                meta: {
                  position: void 0,
                  squareBrackets: false
                }
              };
            } else {
              throw e;
            }
          }
        },
        parseInfix: allowPostfix ? (parser, left) => {
          parser.consume("...");
          return {
            type: "JsdocTypeVariadic",
            element: assertRootResult(left),
            meta: {
              position: "suffix",
              squareBrackets: false
            }
          };
        } : void 0
      });
    }
    const symbolParslet = composeParslet({
      name: "symbolParslet",
      accept: (type) => type === "(",
      precedence: Precedence.SYMBOL,
      parseInfix: (parser, left) => {
        if (left.type !== "JsdocTypeName") {
          throw new Error("Symbol expects a name on the left side. (Reacting on '(')");
        }
        parser.consume("(");
        const result = {
          type: "JsdocTypeSymbol",
          value: left.value
        };
        if (!parser.consume(")")) {
          const next = parser.parseIntermediateType(Precedence.SYMBOL);
          result.element = assertNumberOrVariadicNameResult(next);
          if (!parser.consume(")")) {
            throw new Error("Symbol does not end after value");
          }
        }
        return result;
      }
    });
    const arrayBracketsParslet = composeParslet({
      name: "arrayBracketsParslet",
      precedence: Precedence.ARRAY_BRACKETS,
      accept: (type, next) => type === "[" && next === "]",
      parseInfix: (parser, left) => {
        parser.consume("[");
        parser.consume("]");
        return {
          type: "JsdocTypeGeneric",
          left: {
            type: "JsdocTypeName",
            value: "Array"
          },
          elements: [
            assertRootResult(left)
          ],
          meta: {
            brackets: "square",
            dot: false
          }
        };
      }
    });
    function createObjectParslet({ objectFieldGrammar: objectFieldGrammar2, allowKeyTypes }) {
      return composeParslet({
        name: "objectParslet",
        accept: (type) => type === "{",
        parsePrefix: (parser) => {
          parser.consume("{");
          const result = {
            type: "JsdocTypeObject",
            meta: {
              separator: "comma"
            },
            elements: []
          };
          if (!parser.consume("}")) {
            let separator;
            const fieldParser = new Parser(objectFieldGrammar2, parser.lexer, parser);
            while (true) {
              fieldParser.acceptLexerState(parser);
              let field = fieldParser.parseIntermediateType(Precedence.OBJECT);
              parser.acceptLexerState(fieldParser);
              if (field === void 0 && allowKeyTypes) {
                field = parser.parseIntermediateType(Precedence.OBJECT);
              }
              let optional = false;
              if (field.type === "JsdocTypeNullable") {
                optional = true;
                field = field.element;
              }
              if (field.type === "JsdocTypeNumber" || field.type === "JsdocTypeName" || field.type === "JsdocTypeStringValue") {
                let quote2;
                if (field.type === "JsdocTypeStringValue") {
                  quote2 = field.meta.quote;
                }
                result.elements.push({
                  type: "JsdocTypeObjectField",
                  key: field.value.toString(),
                  right: void 0,
                  optional,
                  readonly: false,
                  meta: {
                    quote: quote2
                  }
                });
              } else if (field.type === "JsdocTypeObjectField" || field.type === "JsdocTypeJsdocObjectField") {
                result.elements.push(field);
              } else {
                throw new UnexpectedTypeError(field);
              }
              if (parser.lexer.current.startOfLine) {
                separator = "linebreak";
              } else if (parser.consume(",")) {
                separator = "comma";
              } else if (parser.consume(";")) {
                separator = "semicolon";
              } else {
                break;
              }
              const type = parser.lexer.current.type;
              if (type === "}") {
                break;
              }
            }
            result.meta.separator = separator !== null && separator !== void 0 ? separator : "comma";
            if (!parser.consume("}")) {
              throw new Error("Unterminated record type. Missing '}'");
            }
          }
          return result;
        }
      });
    }
    function createObjectFieldParslet({ allowSquaredProperties, allowKeyTypes, allowReadonly, allowOptional }) {
      return composeParslet({
        name: "objectFieldParslet",
        precedence: Precedence.KEY_VALUE,
        accept: (type) => type === ":",
        parseInfix: (parser, left) => {
          var _a;
          let optional = false;
          let readonlyProperty = false;
          if (allowOptional && left.type === "JsdocTypeNullable") {
            optional = true;
            left = left.element;
          }
          if (allowReadonly && left.type === "JsdocTypeReadonlyProperty") {
            readonlyProperty = true;
            left = left.element;
          }
          const parentParser = (_a = parser.baseParser) !== null && _a !== void 0 ? _a : parser;
          parentParser.acceptLexerState(parser);
          if (left.type === "JsdocTypeNumber" || left.type === "JsdocTypeName" || left.type === "JsdocTypeStringValue" || isSquaredProperty(left)) {
            if (isSquaredProperty(left) && !allowSquaredProperties) {
              throw new UnexpectedTypeError(left);
            }
            parentParser.consume(":");
            let quote2;
            if (left.type === "JsdocTypeStringValue") {
              quote2 = left.meta.quote;
            }
            const right = parentParser.parseType(Precedence.KEY_VALUE);
            parser.acceptLexerState(parentParser);
            return {
              type: "JsdocTypeObjectField",
              key: isSquaredProperty(left) ? left : left.value.toString(),
              right,
              optional,
              readonly: readonlyProperty,
              meta: {
                quote: quote2
              }
            };
          } else {
            if (!allowKeyTypes) {
              throw new UnexpectedTypeError(left);
            }
            parentParser.consume(":");
            const right = parentParser.parseType(Precedence.KEY_VALUE);
            parser.acceptLexerState(parentParser);
            return {
              type: "JsdocTypeJsdocObjectField",
              left: assertRootResult(left),
              right
            };
          }
        }
      });
    }
    function createKeyValueParslet({ allowOptional, allowVariadic }) {
      return composeParslet({
        name: "keyValueParslet",
        precedence: Precedence.KEY_VALUE,
        accept: (type) => type === ":",
        parseInfix: (parser, left) => {
          let optional = false;
          let variadic = false;
          if (allowOptional && left.type === "JsdocTypeNullable") {
            optional = true;
            left = left.element;
          }
          if (allowVariadic && left.type === "JsdocTypeVariadic" && left.element !== void 0) {
            variadic = true;
            left = left.element;
          }
          if (left.type !== "JsdocTypeName") {
            throw new UnexpectedTypeError(left);
          }
          parser.consume(":");
          const right = parser.parseType(Precedence.KEY_VALUE);
          return {
            type: "JsdocTypeKeyValue",
            key: left.value,
            right,
            optional,
            variadic
          };
        }
      });
    }
    const jsdocBaseGrammar = [
      ...baseGrammar,
      createFunctionParslet({
        allowWithoutParenthesis: true,
        allowNamedParameters: ["this", "new"],
        allowNoReturnType: true,
        allowNewAsFunctionKeyword: false
      }),
      stringValueParslet,
      createSpecialNamePathParslet({
        allowedTypes: ["module", "external", "event"],
        pathGrammar
      }),
      createVariadicParslet({
        allowEnclosingBrackets: true,
        allowPostfix: true
      }),
      createNameParslet({
        allowedAdditionalTokens: ["keyof"]
      }),
      symbolParslet,
      arrayBracketsParslet,
      createNamePathParslet({
        allowSquareBracketsOnAnyType: false,
        allowJsdocNamePaths: true,
        pathGrammar
      })
    ];
    const jsdocGrammar = [
      ...jsdocBaseGrammar,
      createObjectParslet({
        // jsdoc syntax allows full types as keys, so we need to pull in the full grammar here
        // we leave out the object type deliberately
        objectFieldGrammar: [
          createNameParslet({
            allowedAdditionalTokens: ["module", "in"]
          }),
          createObjectFieldParslet({
            allowSquaredProperties: false,
            allowKeyTypes: true,
            allowOptional: false,
            allowReadonly: false
          }),
          ...jsdocBaseGrammar
        ],
        allowKeyTypes: true
      }),
      createKeyValueParslet({
        allowOptional: true,
        allowVariadic: true
      })
    ];
    const typeOfParslet = composeParslet({
      name: "typeOfParslet",
      accept: (type) => type === "typeof",
      parsePrefix: (parser) => {
        parser.consume("typeof");
        return {
          type: "JsdocTypeTypeof",
          element: assertRootResult(parser.parseType(Precedence.KEY_OF_TYPE_OF))
        };
      }
    });
    const objectFieldGrammar$1 = [
      createNameParslet({
        allowedAdditionalTokens: ["module", "keyof", "event", "external", "in"]
      }),
      nullableParslet,
      optionalParslet,
      stringValueParslet,
      numberParslet,
      createObjectFieldParslet({
        allowSquaredProperties: false,
        allowKeyTypes: false,
        allowOptional: false,
        allowReadonly: false
      })
    ];
    const closureGrammar = [
      ...baseGrammar,
      createObjectParslet({
        allowKeyTypes: false,
        objectFieldGrammar: objectFieldGrammar$1
      }),
      createNameParslet({
        allowedAdditionalTokens: ["event", "external", "in"]
      }),
      typeOfParslet,
      createFunctionParslet({
        allowWithoutParenthesis: false,
        allowNamedParameters: ["this", "new"],
        allowNoReturnType: true,
        allowNewAsFunctionKeyword: false
      }),
      createVariadicParslet({
        allowEnclosingBrackets: false,
        allowPostfix: false
      }),
      // additional name parslet is needed for some special cases
      createNameParslet({
        allowedAdditionalTokens: ["keyof"]
      }),
      createSpecialNamePathParslet({
        allowedTypes: ["module"],
        pathGrammar
      }),
      createNamePathParslet({
        allowSquareBracketsOnAnyType: false,
        allowJsdocNamePaths: true,
        pathGrammar
      }),
      createKeyValueParslet({
        allowOptional: false,
        allowVariadic: false
      }),
      symbolParslet
    ];
    const assertsParslet = composeParslet({
      name: "assertsParslet",
      accept: (type) => type === "asserts",
      parsePrefix: (parser) => {
        parser.consume("asserts");
        const left = parser.parseIntermediateType(Precedence.SYMBOL);
        if (left.type !== "JsdocTypeName") {
          throw new UnexpectedTypeError(left, "A typescript asserts always has to have a name on the left side.");
        }
        parser.consume("is");
        return {
          type: "JsdocTypeAsserts",
          left,
          right: assertRootResult(parser.parseIntermediateType(Precedence.INFIX))
        };
      }
    });
    function createTupleParslet({ allowQuestionMark }) {
      return composeParslet({
        name: "tupleParslet",
        accept: (type) => type === "[",
        parsePrefix: (parser) => {
          parser.consume("[");
          const result = {
            type: "JsdocTypeTuple",
            elements: []
          };
          if (parser.consume("]")) {
            return result;
          }
          const typeList = parser.parseIntermediateType(Precedence.ALL);
          if (typeList.type === "JsdocTypeParameterList") {
            if (typeList.elements[0].type === "JsdocTypeKeyValue") {
              result.elements = typeList.elements.map(assertPlainKeyValueResult);
            } else {
              result.elements = typeList.elements.map(assertRootResult);
            }
          } else {
            if (typeList.type === "JsdocTypeKeyValue") {
              result.elements = [assertPlainKeyValueResult(typeList)];
            } else {
              result.elements = [assertRootResult(typeList)];
            }
          }
          if (!parser.consume("]")) {
            throw new Error("Unterminated '['");
          }
          if (result.elements.some((e) => e.type === "JsdocTypeUnknown")) {
            throw new Error("Question mark in tuple not allowed");
          }
          return result;
        }
      });
    }
    const keyOfParslet = composeParslet({
      name: "keyOfParslet",
      accept: (type) => type === "keyof",
      parsePrefix: (parser) => {
        parser.consume("keyof");
        return {
          type: "JsdocTypeKeyof",
          element: assertRootResult(parser.parseType(Precedence.KEY_OF_TYPE_OF))
        };
      }
    });
    const importParslet = composeParslet({
      name: "importParslet",
      accept: (type) => type === "import",
      parsePrefix: (parser) => {
        parser.consume("import");
        if (!parser.consume("(")) {
          throw new Error("Missing parenthesis after import keyword");
        }
        const path = parser.parseType(Precedence.PREFIX);
        if (path.type !== "JsdocTypeStringValue") {
          throw new Error("Only string values are allowed as paths for imports");
        }
        if (!parser.consume(")")) {
          throw new Error("Missing closing parenthesis after import keyword");
        }
        return {
          type: "JsdocTypeImport",
          element: path
        };
      }
    });
    const readonlyPropertyParslet = composeParslet({
      name: "readonlyPropertyParslet",
      accept: (type) => type === "readonly",
      parsePrefix: (parser) => {
        parser.consume("readonly");
        return {
          type: "JsdocTypeReadonlyProperty",
          element: parser.parseType(Precedence.KEY_VALUE)
        };
      }
    });
    const arrowFunctionParslet = composeParslet({
      name: "arrowFunctionParslet",
      precedence: Precedence.ARROW,
      accept: (type) => type === "=>",
      parseInfix: (parser, left) => {
        parser.consume("=>");
        return {
          type: "JsdocTypeFunction",
          parameters: getParameters(left).map(assertPlainKeyValueOrNameResult),
          arrow: true,
          constructor: false,
          parenthesis: true,
          returnType: parser.parseType(Precedence.OBJECT)
        };
      }
    });
    const intersectionParslet = composeParslet({
      name: "intersectionParslet",
      accept: (type) => type === "&",
      precedence: Precedence.INTERSECTION,
      parseInfix: (parser, left) => {
        parser.consume("&");
        const elements = [];
        do {
          elements.push(parser.parseType(Precedence.INTERSECTION));
        } while (parser.consume("&"));
        return {
          type: "JsdocTypeIntersection",
          elements: [assertRootResult(left), ...elements]
        };
      }
    });
    const predicateParslet = composeParslet({
      name: "predicateParslet",
      precedence: Precedence.INFIX,
      accept: (type) => type === "is",
      parseInfix: (parser, left) => {
        if (left.type !== "JsdocTypeName") {
          throw new UnexpectedTypeError(left, "A typescript predicate always has to have a name on the left side.");
        }
        parser.consume("is");
        return {
          type: "JsdocTypePredicate",
          left,
          right: assertRootResult(parser.parseIntermediateType(Precedence.INFIX))
        };
      }
    });
    const objectSquaredPropertyParslet = composeParslet({
      name: "objectSquareBracketPropertyParslet",
      accept: (type) => type === "[",
      parsePrefix: (parser) => {
        if (parser.baseParser === void 0) {
          throw new Error("Only allowed inside object grammar");
        }
        parser.consume("[");
        const key = parser.lexer.current.text;
        parser.consume("Identifier");
        let result;
        if (parser.consume(":")) {
          const parentParser = parser.baseParser;
          parentParser.acceptLexerState(parser);
          result = {
            type: "JsdocTypeIndexSignature",
            key,
            right: parentParser.parseType(Precedence.INDEX_BRACKETS)
          };
          parser.acceptLexerState(parentParser);
        } else if (parser.consume("in")) {
          const parentParser = parser.baseParser;
          parentParser.acceptLexerState(parser);
          result = {
            type: "JsdocTypeMappedType",
            key,
            right: parentParser.parseType(Precedence.ARRAY_BRACKETS)
          };
          parser.acceptLexerState(parentParser);
        } else {
          throw new Error("Missing ':' or 'in' inside square bracketed property.");
        }
        if (!parser.consume("]")) {
          throw new Error("Unterminated square brackets");
        }
        return result;
      }
    });
    const objectFieldGrammar = [
      readonlyPropertyParslet,
      createNameParslet({
        allowedAdditionalTokens: ["module", "event", "keyof", "event", "external", "in"]
      }),
      nullableParslet,
      optionalParslet,
      stringValueParslet,
      numberParslet,
      createObjectFieldParslet({
        allowSquaredProperties: true,
        allowKeyTypes: false,
        allowOptional: true,
        allowReadonly: true
      }),
      objectSquaredPropertyParslet
    ];
    const typescriptGrammar = [
      ...baseGrammar,
      createObjectParslet({
        allowKeyTypes: false,
        objectFieldGrammar
      }),
      typeOfParslet,
      keyOfParslet,
      importParslet,
      stringValueParslet,
      createFunctionParslet({
        allowWithoutParenthesis: true,
        allowNoReturnType: false,
        allowNamedParameters: ["this", "new", "args"],
        allowNewAsFunctionKeyword: true
      }),
      createTupleParslet({
        allowQuestionMark: false
      }),
      createVariadicParslet({
        allowEnclosingBrackets: false,
        allowPostfix: false
      }),
      assertsParslet,
      createNameParslet({
        allowedAdditionalTokens: ["event", "external", "in"]
      }),
      createSpecialNamePathParslet({
        allowedTypes: ["module"],
        pathGrammar
      }),
      arrayBracketsParslet,
      arrowFunctionParslet,
      createNamePathParslet({
        allowSquareBracketsOnAnyType: true,
        allowJsdocNamePaths: false,
        pathGrammar
      }),
      intersectionParslet,
      predicateParslet,
      createKeyValueParslet({
        allowVariadic: true,
        allowOptional: true
      })
    ];
    function parse(expression, mode) {
      switch (mode) {
        case "closure":
          return new Parser(closureGrammar, expression).parse();
        case "jsdoc":
          return new Parser(jsdocGrammar, expression).parse();
        case "typescript":
          return new Parser(typescriptGrammar, expression).parse();
      }
    }
    function tryParse(expression, modes = ["typescript", "closure", "jsdoc"]) {
      let error;
      for (const mode of modes) {
        try {
          return parse(expression, mode);
        } catch (e) {
          error = e;
        }
      }
      throw error;
    }
    function transform(rules2, parseResult) {
      const rule = rules2[parseResult.type];
      if (rule === void 0) {
        throw new Error(`In this set of transform rules exists no rule for type ${parseResult.type}.`);
      }
      return rule(parseResult, (aParseResult) => transform(rules2, aParseResult));
    }
    function notAvailableTransform(parseResult) {
      throw new Error("This transform is not available. Are you trying the correct parsing mode?");
    }
    function extractSpecialParams(source) {
      const result = {
        params: []
      };
      for (const param of source.parameters) {
        if (param.type === "JsdocTypeKeyValue") {
          if (param.key === "this") {
            result.this = param.right;
          } else if (param.key === "new") {
            result.new = param.right;
          } else {
            result.params.push(param);
          }
        } else {
          result.params.push(param);
        }
      }
      return result;
    }
    function applyPosition(position, target, value) {
      return position === "prefix" ? value + target : target + value;
    }
    function quote(value, quote2) {
      switch (quote2) {
        case "double":
          return `"${value}"`;
        case "single":
          return `'${value}'`;
        case void 0:
          return value;
      }
    }
    function stringifyRules() {
      return {
        JsdocTypeParenthesis: (result, transform2) => `(${result.element !== void 0 ? transform2(result.element) : ""})`,
        JsdocTypeKeyof: (result, transform2) => `keyof ${transform2(result.element)}`,
        JsdocTypeFunction: (result, transform2) => {
          if (!result.arrow) {
            let stringified = result.constructor ? "new" : "function";
            if (!result.parenthesis) {
              return stringified;
            }
            stringified += `(${result.parameters.map(transform2).join(", ")})`;
            if (result.returnType !== void 0) {
              stringified += `: ${transform2(result.returnType)}`;
            }
            return stringified;
          } else {
            if (result.returnType === void 0) {
              throw new Error("Arrow function needs a return type.");
            }
            let stringified = `(${result.parameters.map(transform2).join(", ")}) => ${transform2(result.returnType)}`;
            if (result.constructor) {
              stringified = "new " + stringified;
            }
            return stringified;
          }
        },
        JsdocTypeName: (result) => result.value,
        JsdocTypeTuple: (result, transform2) => `[${result.elements.map(transform2).join(", ")}]`,
        JsdocTypeVariadic: (result, transform2) => result.meta.position === void 0 ? "..." : applyPosition(result.meta.position, transform2(result.element), "..."),
        JsdocTypeNamePath: (result, transform2) => {
          const left = transform2(result.left);
          const right = transform2(result.right);
          switch (result.pathType) {
            case "inner":
              return `${left}~${right}`;
            case "instance":
              return `${left}#${right}`;
            case "property":
              return `${left}.${right}`;
            case "property-brackets":
              return `${left}[${right}]`;
          }
        },
        JsdocTypeStringValue: (result) => quote(result.value, result.meta.quote),
        JsdocTypeAny: () => "*",
        JsdocTypeGeneric: (result, transform2) => {
          if (result.meta.brackets === "square") {
            const element = result.elements[0];
            const transformed = transform2(element);
            if (element.type === "JsdocTypeUnion" || element.type === "JsdocTypeIntersection") {
              return `(${transformed})[]`;
            } else {
              return `${transformed}[]`;
            }
          } else {
            return `${transform2(result.left)}${result.meta.dot ? "." : ""}<${result.elements.map(transform2).join(", ")}>`;
          }
        },
        JsdocTypeImport: (result, transform2) => `import(${transform2(result.element)})`,
        JsdocTypeObjectField: (result, transform2) => {
          let text = "";
          if (result.readonly) {
            text += "readonly ";
          }
          if (typeof result.key === "string") {
            text += quote(result.key, result.meta.quote);
          } else {
            text += transform2(result.key);
          }
          if (result.optional) {
            text += "?";
          }
          if (result.right === void 0) {
            return text;
          } else {
            return text + `: ${transform2(result.right)}`;
          }
        },
        JsdocTypeJsdocObjectField: (result, transform2) => {
          return `${transform2(result.left)}: ${transform2(result.right)}`;
        },
        JsdocTypeKeyValue: (result, transform2) => {
          let text = result.key;
          if (result.optional) {
            text += "?";
          }
          if (result.variadic) {
            text = "..." + text;
          }
          if (result.right === void 0) {
            return text;
          } else {
            return text + `: ${transform2(result.right)}`;
          }
        },
        JsdocTypeSpecialNamePath: (result) => `${result.specialType}:${quote(result.value, result.meta.quote)}`,
        JsdocTypeNotNullable: (result, transform2) => applyPosition(result.meta.position, transform2(result.element), "!"),
        JsdocTypeNull: () => "null",
        JsdocTypeNullable: (result, transform2) => applyPosition(result.meta.position, transform2(result.element), "?"),
        JsdocTypeNumber: (result) => result.value.toString(),
        JsdocTypeObject: (result, transform2) => `{${result.elements.map(transform2).join((result.meta.separator === "comma" ? "," : ";") + " ")}}`,
        JsdocTypeOptional: (result, transform2) => applyPosition(result.meta.position, transform2(result.element), "="),
        JsdocTypeSymbol: (result, transform2) => `${result.value}(${result.element !== void 0 ? transform2(result.element) : ""})`,
        JsdocTypeTypeof: (result, transform2) => `typeof ${transform2(result.element)}`,
        JsdocTypeUndefined: () => "undefined",
        JsdocTypeUnion: (result, transform2) => result.elements.map(transform2).join(" | "),
        JsdocTypeUnknown: () => "?",
        JsdocTypeIntersection: (result, transform2) => result.elements.map(transform2).join(" & "),
        JsdocTypeProperty: (result) => quote(result.value, result.meta.quote),
        JsdocTypePredicate: (result, transform2) => `${transform2(result.left)} is ${transform2(result.right)}`,
        JsdocTypeIndexSignature: (result, transform2) => `[${result.key}: ${transform2(result.right)}]`,
        JsdocTypeMappedType: (result, transform2) => `[${result.key} in ${transform2(result.right)}]`,
        JsdocTypeAsserts: (result, transform2) => `asserts ${transform2(result.left)} is ${transform2(result.right)}`
      };
    }
    const storedStringifyRules = stringifyRules();
    function stringify(result) {
      return transform(storedStringifyRules, result);
    }
    const reservedWords = [
      "null",
      "true",
      "false",
      "break",
      "case",
      "catch",
      "class",
      "const",
      "continue",
      "debugger",
      "default",
      "delete",
      "do",
      "else",
      "export",
      "extends",
      "finally",
      "for",
      "function",
      "if",
      "import",
      "in",
      "instanceof",
      "new",
      "return",
      "super",
      "switch",
      "this",
      "throw",
      "try",
      "typeof",
      "var",
      "void",
      "while",
      "with",
      "yield"
    ];
    function makeName(value) {
      const result = {
        type: "NameExpression",
        name: value
      };
      if (reservedWords.includes(value)) {
        result.reservedWord = true;
      }
      return result;
    }
    const catharsisTransformRules = {
      JsdocTypeOptional: (result, transform2) => {
        const transformed = transform2(result.element);
        transformed.optional = true;
        return transformed;
      },
      JsdocTypeNullable: (result, transform2) => {
        const transformed = transform2(result.element);
        transformed.nullable = true;
        return transformed;
      },
      JsdocTypeNotNullable: (result, transform2) => {
        const transformed = transform2(result.element);
        transformed.nullable = false;
        return transformed;
      },
      JsdocTypeVariadic: (result, transform2) => {
        if (result.element === void 0) {
          throw new Error("dots without value are not allowed in catharsis mode");
        }
        const transformed = transform2(result.element);
        transformed.repeatable = true;
        return transformed;
      },
      JsdocTypeAny: () => ({
        type: "AllLiteral"
      }),
      JsdocTypeNull: () => ({
        type: "NullLiteral"
      }),
      JsdocTypeStringValue: (result) => makeName(quote(result.value, result.meta.quote)),
      JsdocTypeUndefined: () => ({
        type: "UndefinedLiteral"
      }),
      JsdocTypeUnknown: () => ({
        type: "UnknownLiteral"
      }),
      JsdocTypeFunction: (result, transform2) => {
        const params = extractSpecialParams(result);
        const transformed = {
          type: "FunctionType",
          params: params.params.map(transform2)
        };
        if (params.this !== void 0) {
          transformed.this = transform2(params.this);
        }
        if (params.new !== void 0) {
          transformed.new = transform2(params.new);
        }
        if (result.returnType !== void 0) {
          transformed.result = transform2(result.returnType);
        }
        return transformed;
      },
      JsdocTypeGeneric: (result, transform2) => ({
        type: "TypeApplication",
        applications: result.elements.map((o2) => transform2(o2)),
        expression: transform2(result.left)
      }),
      JsdocTypeSpecialNamePath: (result) => makeName(result.specialType + ":" + quote(result.value, result.meta.quote)),
      JsdocTypeName: (result) => {
        if (result.value !== "function") {
          return makeName(result.value);
        } else {
          return {
            type: "FunctionType",
            params: []
          };
        }
      },
      JsdocTypeNumber: (result) => makeName(result.value.toString()),
      JsdocTypeObject: (result, transform2) => {
        const transformed = {
          type: "RecordType",
          fields: []
        };
        for (const field of result.elements) {
          if (field.type !== "JsdocTypeObjectField" && field.type !== "JsdocTypeJsdocObjectField") {
            transformed.fields.push({
              type: "FieldType",
              key: transform2(field),
              value: void 0
            });
          } else {
            transformed.fields.push(transform2(field));
          }
        }
        return transformed;
      },
      JsdocTypeObjectField: (result, transform2) => {
        if (typeof result.key !== "string") {
          throw new Error("Index signatures and mapped types are not supported");
        }
        return {
          type: "FieldType",
          key: makeName(quote(result.key, result.meta.quote)),
          value: result.right === void 0 ? void 0 : transform2(result.right)
        };
      },
      JsdocTypeJsdocObjectField: (result, transform2) => ({
        type: "FieldType",
        key: transform2(result.left),
        value: transform2(result.right)
      }),
      JsdocTypeUnion: (result, transform2) => ({
        type: "TypeUnion",
        elements: result.elements.map((e) => transform2(e))
      }),
      JsdocTypeKeyValue: (result, transform2) => {
        return {
          type: "FieldType",
          key: makeName(result.key),
          value: result.right === void 0 ? void 0 : transform2(result.right)
        };
      },
      JsdocTypeNamePath: (result, transform2) => {
        const leftResult = transform2(result.left);
        let rightValue;
        if (result.right.type === "JsdocTypeSpecialNamePath") {
          rightValue = transform2(result.right).name;
        } else {
          rightValue = quote(result.right.value, result.right.meta.quote);
        }
        const joiner = result.pathType === "inner" ? "~" : result.pathType === "instance" ? "#" : ".";
        return makeName(`${leftResult.name}${joiner}${rightValue}`);
      },
      JsdocTypeSymbol: (result) => {
        let value = "";
        let element = result.element;
        let trailingDots = false;
        if ((element === null || element === void 0 ? void 0 : element.type) === "JsdocTypeVariadic") {
          if (element.meta.position === "prefix") {
            value = "...";
          } else {
            trailingDots = true;
          }
          element = element.element;
        }
        if ((element === null || element === void 0 ? void 0 : element.type) === "JsdocTypeName") {
          value += element.value;
        } else if ((element === null || element === void 0 ? void 0 : element.type) === "JsdocTypeNumber") {
          value += element.value.toString();
        }
        if (trailingDots) {
          value += "...";
        }
        return makeName(`${result.value}(${value})`);
      },
      JsdocTypeParenthesis: (result, transform2) => transform2(assertRootResult(result.element)),
      JsdocTypeMappedType: notAvailableTransform,
      JsdocTypeIndexSignature: notAvailableTransform,
      JsdocTypeImport: notAvailableTransform,
      JsdocTypeKeyof: notAvailableTransform,
      JsdocTypeTuple: notAvailableTransform,
      JsdocTypeTypeof: notAvailableTransform,
      JsdocTypeIntersection: notAvailableTransform,
      JsdocTypeProperty: notAvailableTransform,
      JsdocTypePredicate: notAvailableTransform,
      JsdocTypeAsserts: notAvailableTransform
    };
    function catharsisTransform(result) {
      return transform(catharsisTransformRules, result);
    }
    function getQuoteStyle(quote2) {
      switch (quote2) {
        case void 0:
          return "none";
        case "single":
          return "single";
        case "double":
          return "double";
      }
    }
    function getMemberType(type) {
      switch (type) {
        case "inner":
          return "INNER_MEMBER";
        case "instance":
          return "INSTANCE_MEMBER";
        case "property":
          return "MEMBER";
        case "property-brackets":
          return "MEMBER";
      }
    }
    function nestResults(type, results) {
      if (results.length === 2) {
        return {
          type,
          left: results[0],
          right: results[1]
        };
      } else {
        return {
          type,
          left: results[0],
          right: nestResults(type, results.slice(1))
        };
      }
    }
    const jtpRules = {
      JsdocTypeOptional: (result, transform2) => ({
        type: "OPTIONAL",
        value: transform2(result.element),
        meta: {
          syntax: result.meta.position === "prefix" ? "PREFIX_EQUAL_SIGN" : "SUFFIX_EQUALS_SIGN"
        }
      }),
      JsdocTypeNullable: (result, transform2) => ({
        type: "NULLABLE",
        value: transform2(result.element),
        meta: {
          syntax: result.meta.position === "prefix" ? "PREFIX_QUESTION_MARK" : "SUFFIX_QUESTION_MARK"
        }
      }),
      JsdocTypeNotNullable: (result, transform2) => ({
        type: "NOT_NULLABLE",
        value: transform2(result.element),
        meta: {
          syntax: result.meta.position === "prefix" ? "PREFIX_BANG" : "SUFFIX_BANG"
        }
      }),
      JsdocTypeVariadic: (result, transform2) => {
        const transformed = {
          type: "VARIADIC",
          meta: {
            syntax: result.meta.position === "prefix" ? "PREFIX_DOTS" : result.meta.position === "suffix" ? "SUFFIX_DOTS" : "ONLY_DOTS"
          }
        };
        if (result.element !== void 0) {
          transformed.value = transform2(result.element);
        }
        return transformed;
      },
      JsdocTypeName: (result) => ({
        type: "NAME",
        name: result.value
      }),
      JsdocTypeTypeof: (result, transform2) => ({
        type: "TYPE_QUERY",
        name: transform2(result.element)
      }),
      JsdocTypeTuple: (result, transform2) => ({
        type: "TUPLE",
        entries: result.elements.map(transform2)
      }),
      JsdocTypeKeyof: (result, transform2) => ({
        type: "KEY_QUERY",
        value: transform2(result.element)
      }),
      JsdocTypeImport: (result) => ({
        type: "IMPORT",
        path: {
          type: "STRING_VALUE",
          quoteStyle: getQuoteStyle(result.element.meta.quote),
          string: result.element.value
        }
      }),
      JsdocTypeUndefined: () => ({
        type: "NAME",
        name: "undefined"
      }),
      JsdocTypeAny: () => ({
        type: "ANY"
      }),
      JsdocTypeFunction: (result, transform2) => {
        const specialParams = extractSpecialParams(result);
        const transformed = {
          type: result.arrow ? "ARROW" : "FUNCTION",
          params: specialParams.params.map((param) => {
            if (param.type === "JsdocTypeKeyValue") {
              if (param.right === void 0) {
                throw new Error("Function parameter without ':' is not expected to be 'KEY_VALUE'");
              }
              return {
                type: "NAMED_PARAMETER",
                name: param.key,
                typeName: transform2(param.right)
              };
            } else {
              return transform2(param);
            }
          }),
          new: null,
          returns: null
        };
        if (specialParams.this !== void 0) {
          transformed.this = transform2(specialParams.this);
        } else if (!result.arrow) {
          transformed.this = null;
        }
        if (specialParams.new !== void 0) {
          transformed.new = transform2(specialParams.new);
        }
        if (result.returnType !== void 0) {
          transformed.returns = transform2(result.returnType);
        }
        return transformed;
      },
      JsdocTypeGeneric: (result, transform2) => {
        const transformed = {
          type: "GENERIC",
          subject: transform2(result.left),
          objects: result.elements.map(transform2),
          meta: {
            syntax: result.meta.brackets === "square" ? "SQUARE_BRACKET" : result.meta.dot ? "ANGLE_BRACKET_WITH_DOT" : "ANGLE_BRACKET"
          }
        };
        if (result.meta.brackets === "square" && result.elements[0].type === "JsdocTypeFunction" && !result.elements[0].parenthesis) {
          transformed.objects[0] = {
            type: "NAME",
            name: "function"
          };
        }
        return transformed;
      },
      JsdocTypeObjectField: (result, transform2) => {
        if (typeof result.key !== "string") {
          throw new Error("Index signatures and mapped types are not supported");
        }
        if (result.right === void 0) {
          return {
            type: "RECORD_ENTRY",
            key: result.key,
            quoteStyle: getQuoteStyle(result.meta.quote),
            value: null,
            readonly: false
          };
        }
        let right = transform2(result.right);
        if (result.optional) {
          right = {
            type: "OPTIONAL",
            value: right,
            meta: {
              syntax: "SUFFIX_KEY_QUESTION_MARK"
            }
          };
        }
        return {
          type: "RECORD_ENTRY",
          key: result.key.toString(),
          quoteStyle: getQuoteStyle(result.meta.quote),
          value: right,
          readonly: false
        };
      },
      JsdocTypeJsdocObjectField: () => {
        throw new Error("Keys may not be typed in jsdoctypeparser.");
      },
      JsdocTypeKeyValue: (result, transform2) => {
        if (result.right === void 0) {
          return {
            type: "RECORD_ENTRY",
            key: result.key,
            quoteStyle: "none",
            value: null,
            readonly: false
          };
        }
        let right = transform2(result.right);
        if (result.optional) {
          right = {
            type: "OPTIONAL",
            value: right,
            meta: {
              syntax: "SUFFIX_KEY_QUESTION_MARK"
            }
          };
        }
        return {
          type: "RECORD_ENTRY",
          key: result.key,
          quoteStyle: "none",
          value: right,
          readonly: false
        };
      },
      JsdocTypeObject: (result, transform2) => {
        const entries = [];
        for (const field of result.elements) {
          if (field.type === "JsdocTypeObjectField" || field.type === "JsdocTypeJsdocObjectField") {
            entries.push(transform2(field));
          }
        }
        return {
          type: "RECORD",
          entries
        };
      },
      JsdocTypeSpecialNamePath: (result) => {
        if (result.specialType !== "module") {
          throw new Error(`jsdoctypeparser does not support type ${result.specialType} at this point.`);
        }
        return {
          type: "MODULE",
          value: {
            type: "FILE_PATH",
            quoteStyle: getQuoteStyle(result.meta.quote),
            path: result.value
          }
        };
      },
      JsdocTypeNamePath: (result, transform2) => {
        let hasEventPrefix = false;
        let name;
        let quoteStyle;
        if (result.right.type === "JsdocTypeSpecialNamePath" && result.right.specialType === "event") {
          hasEventPrefix = true;
          name = result.right.value;
          quoteStyle = getQuoteStyle(result.right.meta.quote);
        } else {
          name = result.right.value;
          quoteStyle = getQuoteStyle(result.right.meta.quote);
        }
        const transformed = {
          type: getMemberType(result.pathType),
          owner: transform2(result.left),
          name,
          quoteStyle,
          hasEventPrefix
        };
        if (transformed.owner.type === "MODULE") {
          const tModule = transformed.owner;
          transformed.owner = transformed.owner.value;
          tModule.value = transformed;
          return tModule;
        } else {
          return transformed;
        }
      },
      JsdocTypeUnion: (result, transform2) => nestResults("UNION", result.elements.map(transform2)),
      JsdocTypeParenthesis: (result, transform2) => ({
        type: "PARENTHESIS",
        value: transform2(assertRootResult(result.element))
      }),
      JsdocTypeNull: () => ({
        type: "NAME",
        name: "null"
      }),
      JsdocTypeUnknown: () => ({
        type: "UNKNOWN"
      }),
      JsdocTypeStringValue: (result) => ({
        type: "STRING_VALUE",
        quoteStyle: getQuoteStyle(result.meta.quote),
        string: result.value
      }),
      JsdocTypeIntersection: (result, transform2) => nestResults("INTERSECTION", result.elements.map(transform2)),
      JsdocTypeNumber: (result) => ({
        type: "NUMBER_VALUE",
        number: result.value.toString()
      }),
      JsdocTypeSymbol: notAvailableTransform,
      JsdocTypeProperty: notAvailableTransform,
      JsdocTypePredicate: notAvailableTransform,
      JsdocTypeMappedType: notAvailableTransform,
      JsdocTypeIndexSignature: notAvailableTransform,
      JsdocTypeAsserts: notAvailableTransform
    };
    function jtpTransform(result) {
      return transform(jtpRules, result);
    }
    function identityTransformRules() {
      return {
        JsdocTypeIntersection: (result, transform2) => ({
          type: "JsdocTypeIntersection",
          elements: result.elements.map(transform2)
        }),
        JsdocTypeGeneric: (result, transform2) => ({
          type: "JsdocTypeGeneric",
          left: transform2(result.left),
          elements: result.elements.map(transform2),
          meta: {
            dot: result.meta.dot,
            brackets: result.meta.brackets
          }
        }),
        JsdocTypeNullable: (result) => result,
        JsdocTypeUnion: (result, transform2) => ({
          type: "JsdocTypeUnion",
          elements: result.elements.map(transform2)
        }),
        JsdocTypeUnknown: (result) => result,
        JsdocTypeUndefined: (result) => result,
        JsdocTypeTypeof: (result, transform2) => ({
          type: "JsdocTypeTypeof",
          element: transform2(result.element)
        }),
        JsdocTypeSymbol: (result, transform2) => {
          const transformed = {
            type: "JsdocTypeSymbol",
            value: result.value
          };
          if (result.element !== void 0) {
            transformed.element = transform2(result.element);
          }
          return transformed;
        },
        JsdocTypeOptional: (result, transform2) => ({
          type: "JsdocTypeOptional",
          element: transform2(result.element),
          meta: {
            position: result.meta.position
          }
        }),
        JsdocTypeObject: (result, transform2) => ({
          type: "JsdocTypeObject",
          meta: {
            separator: "comma"
          },
          elements: result.elements.map(transform2)
        }),
        JsdocTypeNumber: (result) => result,
        JsdocTypeNull: (result) => result,
        JsdocTypeNotNullable: (result, transform2) => ({
          type: "JsdocTypeNotNullable",
          element: transform2(result.element),
          meta: {
            position: result.meta.position
          }
        }),
        JsdocTypeSpecialNamePath: (result) => result,
        JsdocTypeObjectField: (result, transform2) => ({
          type: "JsdocTypeObjectField",
          key: result.key,
          right: result.right === void 0 ? void 0 : transform2(result.right),
          optional: result.optional,
          readonly: result.readonly,
          meta: result.meta
        }),
        JsdocTypeJsdocObjectField: (result, transform2) => ({
          type: "JsdocTypeJsdocObjectField",
          left: transform2(result.left),
          right: transform2(result.right)
        }),
        JsdocTypeKeyValue: (result, transform2) => {
          return {
            type: "JsdocTypeKeyValue",
            key: result.key,
            right: result.right === void 0 ? void 0 : transform2(result.right),
            optional: result.optional,
            variadic: result.variadic
          };
        },
        JsdocTypeImport: (result, transform2) => ({
          type: "JsdocTypeImport",
          element: transform2(result.element)
        }),
        JsdocTypeAny: (result) => result,
        JsdocTypeStringValue: (result) => result,
        JsdocTypeNamePath: (result) => result,
        JsdocTypeVariadic: (result, transform2) => {
          const transformed = {
            type: "JsdocTypeVariadic",
            meta: {
              position: result.meta.position,
              squareBrackets: result.meta.squareBrackets
            }
          };
          if (result.element !== void 0) {
            transformed.element = transform2(result.element);
          }
          return transformed;
        },
        JsdocTypeTuple: (result, transform2) => ({
          type: "JsdocTypeTuple",
          elements: result.elements.map(transform2)
        }),
        JsdocTypeName: (result) => result,
        JsdocTypeFunction: (result, transform2) => {
          const transformed = {
            type: "JsdocTypeFunction",
            arrow: result.arrow,
            parameters: result.parameters.map(transform2),
            constructor: result.constructor,
            parenthesis: result.parenthesis
          };
          if (result.returnType !== void 0) {
            transformed.returnType = transform2(result.returnType);
          }
          return transformed;
        },
        JsdocTypeKeyof: (result, transform2) => ({
          type: "JsdocTypeKeyof",
          element: transform2(result.element)
        }),
        JsdocTypeParenthesis: (result, transform2) => ({
          type: "JsdocTypeParenthesis",
          element: transform2(result.element)
        }),
        JsdocTypeProperty: (result) => result,
        JsdocTypePredicate: (result, transform2) => ({
          type: "JsdocTypePredicate",
          left: transform2(result.left),
          right: transform2(result.right)
        }),
        JsdocTypeIndexSignature: (result, transform2) => ({
          type: "JsdocTypeIndexSignature",
          key: result.key,
          right: transform2(result.right)
        }),
        JsdocTypeMappedType: (result, transform2) => ({
          type: "JsdocTypeMappedType",
          key: result.key,
          right: transform2(result.right)
        }),
        JsdocTypeAsserts: (result, transform2) => ({
          type: "JsdocTypeAsserts",
          left: transform2(result.left),
          right: transform2(result.right)
        })
      };
    }
    const visitorKeys = {
      JsdocTypeAny: [],
      JsdocTypeFunction: ["parameters", "returnType"],
      JsdocTypeGeneric: ["left", "elements"],
      JsdocTypeImport: [],
      JsdocTypeIndexSignature: ["right"],
      JsdocTypeIntersection: ["elements"],
      JsdocTypeKeyof: ["element"],
      JsdocTypeKeyValue: ["right"],
      JsdocTypeMappedType: ["right"],
      JsdocTypeName: [],
      JsdocTypeNamePath: ["left", "right"],
      JsdocTypeNotNullable: ["element"],
      JsdocTypeNull: [],
      JsdocTypeNullable: ["element"],
      JsdocTypeNumber: [],
      JsdocTypeObject: ["elements"],
      JsdocTypeObjectField: ["right"],
      JsdocTypeJsdocObjectField: ["left", "right"],
      JsdocTypeOptional: ["element"],
      JsdocTypeParenthesis: ["element"],
      JsdocTypeSpecialNamePath: [],
      JsdocTypeStringValue: [],
      JsdocTypeSymbol: ["element"],
      JsdocTypeTuple: ["elements"],
      JsdocTypeTypeof: ["element"],
      JsdocTypeUndefined: [],
      JsdocTypeUnion: ["elements"],
      JsdocTypeUnknown: [],
      JsdocTypeVariadic: ["element"],
      JsdocTypeProperty: [],
      JsdocTypePredicate: ["left", "right"],
      JsdocTypeAsserts: ["left", "right"]
    };
    function _traverse(node, parentNode, property, onEnter, onLeave) {
      onEnter === null || onEnter === void 0 ? void 0 : onEnter(node, parentNode, property);
      const keysToVisit = visitorKeys[node.type];
      for (const key of keysToVisit) {
        const value = node[key];
        if (value !== void 0) {
          if (Array.isArray(value)) {
            for (const element of value) {
              _traverse(element, node, key, onEnter, onLeave);
            }
          } else {
            _traverse(value, node, key, onEnter, onLeave);
          }
        }
      }
      onLeave === null || onLeave === void 0 ? void 0 : onLeave(node, parentNode, property);
    }
    function traverse(node, onEnter, onLeave) {
      _traverse(node, void 0, void 0, onEnter, onLeave);
    }
    exports2.catharsisTransform = catharsisTransform;
    exports2.identityTransformRules = identityTransformRules;
    exports2.jtpTransform = jtpTransform;
    exports2.parse = parse;
    exports2.stringify = stringify;
    exports2.stringifyRules = stringifyRules;
    exports2.transform = transform;
    exports2.traverse = traverse;
    exports2.tryParse = tryParse;
    exports2.visitorKeys = visitorKeys;
  });
})(dist, dist.exports);
var distExports = dist.exports;
var De = Object.defineProperty;
var o = (e, t) => De(e, "name", { value: t, configurable: true });
const { UnknownArgTypesError: Te } = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;
var he = /* @__PURE__ */ o((e) => e.name === "literal", "isLiteral"), be = /* @__PURE__ */ o((e) => e.value.replace(/['|"]/g, ""), "toEnumOption"), Pe = /* @__PURE__ */ o((e) => {
  switch (e.type) {
    case "function":
      return { name: "function" };
    case "object":
      let t = {};
      return e.signature.properties.forEach((r) => {
        t[r.key] = d(r.value);
      }), {
        name: "object",
        value: t
      };
    default:
      throw new Te({ type: e, language: "Flow" });
  }
}, "convertSig"), d = /* @__PURE__ */ o((e) => {
  var _a, _b, _c, _d;
  let { name: t, raw: r } = e, n = {};
  switch (typeof r < "u" && (n.raw = r), e.name) {
    case "literal":
      return { ...n, name: "other", value: e.value };
    case "string":
    case "number":
    case "symbol":
    case "boolean":
      return { ...n, name: t };
    case "Array":
      return { ...n, name: "array", value: e.elements.map(d) };
    case "signature":
      return { ...n, ...Pe(e) };
    case "union":
      return ((_a = e.elements) == null ? void 0 : _a.every(he)) ? { ...n, name: "enum", value: (_b = e.elements) == null ? void 0 : _b.map(be) } : { ...n, name: t, value: (_c = e.elements) == null ? void 0 : _c.map(d) };
    case "intersection":
      return { ...n, name: t, value: (_d = e.elements) == null ? void 0 : _d.map(d) };
    default:
      return { ...n, name: "other", value: t };
  }
}, "convert");
function j(e, t) {
  let r = {}, n = Object.keys(e);
  for (let s = 0; s < n.length; s++) {
    let i = n[s], p = e[i];
    r[i] = t(p, i, e);
  }
  return r;
}
o(j, "mapValues");
var W = /^['"]|['"]$/g, Se = /* @__PURE__ */ o((e) => e.replace(W, ""), "trimQuotes"), Oe = /* @__PURE__ */ o((e) => W.test(e), "includesQuotes"), h = /* @__PURE__ */ o((e) => {
  let t = Se(e);
  return Oe(e) || Number.isNaN(Number(t)) ? t : Number(t);
}, "parseLiteral");
var ve = /^\(.*\) => /, x = /* @__PURE__ */ o((e) => {
  let { name: t, raw: r, computed: n, value: s } = e, i = {};
  switch (typeof r < "u" && (i.raw = r), t) {
    case "enum": {
      let a = n ? s : s.map((c) => h(c.value));
      return { ...i, name: t, value: a };
    }
    case "string":
    case "number":
    case "symbol":
      return { ...i, name: t };
    case "func":
      return { ...i, name: "function" };
    case "bool":
    case "boolean":
      return { ...i, name: "boolean" };
    case "arrayOf":
    case "array":
      return { ...i, name: "array", value: s && x(s) };
    case "object":
      return { ...i, name: t };
    case "objectOf":
      return { ...i, name: t, value: x(s) };
    case "shape":
    case "exact":
      let p = j(s, (a) => x(a));
      return { ...i, name: "object", value: p };
    case "union":
      return { ...i, name: "union", value: s.map((a) => x(a)) };
    case "instanceOf":
    case "element":
    case "elementType":
    default: {
      if ((t == null ? void 0 : t.indexOf("|")) > 0)
        try {
          let u = t.split("|").map((m) => JSON.parse(m));
          return { ...i, name: "enum", value: u };
        } catch {
        }
      let a = s ? `${t}(${s})` : t, c = ve.test(t) ? "function" : "other";
      return { ...i, name: c, value: a };
    }
  }
}, "convert");
const { UnknownArgTypesError: we } = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;
var Ee = /* @__PURE__ */ o((e) => {
  switch (e.type) {
    case "function":
      return { name: "function" };
    case "object":
      let t = {};
      return e.signature.properties.forEach((r) => {
        t[r.key] = D(r.value);
      }), {
        name: "object",
        value: t
      };
    default:
      throw new we({ type: e, language: "Typescript" });
  }
}, "convertSig"), D = /* @__PURE__ */ o((e) => {
  var _a, _b, _c, _d;
  let { name: t, raw: r } = e, n = {};
  switch (typeof r < "u" && (n.raw = r), e.name) {
    case "string":
    case "number":
    case "symbol":
    case "boolean":
      return { ...n, name: t };
    case "Array":
      return { ...n, name: "array", value: e.elements.map(D) };
    case "signature":
      return { ...n, ...Ee(e) };
    case "union":
      let s;
      return ((_a = e.elements) == null ? void 0 : _a.every((i) => i.name === "literal")) ? s = {
        ...n,
        name: "enum",
        // @ts-expect-error fix types
        value: (_b = e.elements) == null ? void 0 : _b.map((i) => h(i.value))
      } : s = { ...n, name: t, value: (_c = e.elements) == null ? void 0 : _c.map(D) }, s;
    case "intersection":
      return { ...n, name: t, value: (_d = e.elements) == null ? void 0 : _d.map(D) };
    default:
      return { ...n, name: "other", value: t };
  }
}, "convert");
var b = /* @__PURE__ */ o((e) => {
  let { type: t, tsType: r, flowType: n } = e;
  try {
    if (t != null)
      return x(t);
    if (r != null)
      return D(r);
    if (n != null)
      return d(n);
  } catch (s) {
    console.error(s);
  }
  return null;
}, "convert");
var je = /* @__PURE__ */ ((s) => (s.JAVASCRIPT = "JavaScript", s.FLOW = "Flow", s.TYPESCRIPT = "TypeScript", s.UNKNOWN = "Unknown", s))(je || {});
var ke = ["null", "undefined"];
function T(e) {
  return ke.some((t) => t === e);
}
o(T, "isDefaultValueBlacklisted");
var M = /* @__PURE__ */ o((e) => {
  if (!e)
    return "";
  if (typeof e == "string")
    return e;
  throw new Error(`Description: expected string, got: ${JSON.stringify(e)}`);
}, "str");
function z(e) {
  return !!e.__docgenInfo;
}
o(z, "hasDocgen");
function $(e) {
  return e != null && Object.keys(e).length > 0;
}
o($, "isValidDocgenSection");
function Y(e, t) {
  return z(e) ? e.__docgenInfo[t] : null;
}
o(Y, "getDocgenSection");
function q(e) {
  return z(e) ? M(e.__docgenInfo.description) : "";
}
o(q, "getDocgenDescription");
var f;
(function(e) {
  e.start = "/**", e.nostart = "/***", e.delim = "*", e.end = "*/";
})(f = f || (f = {}));
function k(e) {
  return /^\s+$/.test(e);
}
o(k, "isSpace");
function G(e) {
  let t = e.match(/\r+$/);
  return t == null ? ["", e] : [e.slice(-t[0].length), e.slice(0, -t[0].length)];
}
o(G, "splitCR");
function y(e) {
  let t = e.match(/^\s+/);
  return t == null ? ["", e] : [e.slice(0, t[0].length), e.slice(t[0].length)];
}
o(y, "splitSpace");
function K(e) {
  return e.split(/\n/);
}
o(K, "splitLines");
function X(e = {}) {
  return Object.assign({ tag: "", name: "", type: "", optional: false, description: "", problems: [], source: [] }, e);
}
o(X, "seedSpec");
function F(e = {}) {
  return Object.assign({
    start: "",
    delimiter: "",
    postDelimiter: "",
    tag: "",
    postTag: "",
    name: "",
    postName: "",
    type: "",
    postType: "",
    description: "",
    end: "",
    lineEnd: ""
  }, e);
}
o(F, "seedTokens");
var Fe = /^@\S+/;
function J({ fence: e = "```" } = {}) {
  let t = Je(e), r = /* @__PURE__ */ o((n, s) => t(n) ? !s : s, "toggleFence");
  return /* @__PURE__ */ o(function(s) {
    let i = [[]], p = false;
    for (let a of s)
      Fe.test(a.tokens.description) && !p ? i.push([a]) : i[i.length - 1].push(a), p = r(a.tokens.description, p);
    return i;
  }, "parseBlock");
}
o(J, "getParser");
function Je(e) {
  return typeof e == "string" ? (t) => t.split(e).length % 2 === 0 : e;
}
o(Je, "getFencer");
function N({ startLine: e = 0, markers: t = f } = {}) {
  let r = null, n = e;
  return /* @__PURE__ */ o(function(i) {
    let p = i, a = F();
    if ([a.lineEnd, p] = G(p), [a.start, p] = y(p), r === null && p.startsWith(t.start) && !p.startsWith(t.nostart) && (r = [], a.delimiter = p.slice(0, t.start.length), p = p.slice(t.start.length), [a.postDelimiter, p] = y(p)), r === null)
      return n++, null;
    let c = p.trimRight().endsWith(t.end);
    if (a.delimiter === "" && p.startsWith(t.delim) && !p.startsWith(t.end) && (a.delimiter = t.delim, p = p.slice(t.delim.length), [
      a.postDelimiter,
      p
    ] = y(p)), c) {
      let u = p.trimRight();
      a.end = p.slice(u.length - t.end.length), p = u.slice(0, -t.end.length);
    }
    if (a.description = p, r.push({ number: n, source: i, tokens: a }), n++, c) {
      let u = r.slice();
      return r = null, u;
    }
    return null;
  }, "parseSource");
}
o(N, "getParser");
function R({ tokenizers: e }) {
  return /* @__PURE__ */ o(function(r) {
    var n;
    let s = X({ source: r });
    for (let i of e)
      if (s = i(s), !((n = s.problems[s.problems.length - 1]) === null || n === void 0) && n.critical)
        break;
    return s;
  }, "parseSpec");
}
o(R, "getParser");
function P() {
  return (e) => {
    let { tokens: t } = e.source[0], r = t.description.match(/\s*(@(\S+))(\s*)/);
    return r === null ? (e.problems.push({
      code: "spec:tag:prefix",
      message: 'tag should start with "@" symbol',
      line: e.source[0].number,
      critical: true
    }), e) : (t.tag = r[1], t.postTag = r[3], t.description = t.description.slice(r[0].length), e.tag = r[2], e);
  };
}
o(P, "tagTokenizer");
function S(e = "compact") {
  let t = Re(e);
  return (r) => {
    let n = 0, s = [];
    for (let [a, { tokens: c }] of r.source.entries()) {
      let u = "";
      if (a === 0 && c.description[0] !== "{")
        return r;
      for (let m of c.description)
        if (m === "{" && n++, m === "}" && n--, u += m, n === 0)
          break;
      if (s.push([c, u]), n === 0)
        break;
    }
    if (n !== 0)
      return r.problems.push({
        code: "spec:type:unpaired-curlies",
        message: "unpaired curlies",
        line: r.source[0].number,
        critical: true
      }), r;
    let i = [], p = s[0][0].postDelimiter.length;
    for (let [a, [c, u]] of s.entries())
      c.type = u, a > 0 && (c.type = c.postDelimiter.slice(p) + u, c.postDelimiter = c.postDelimiter.slice(0, p)), [c.postType, c.description] = y(c.description.slice(u.length)), i.push(c.type);
    return i[0] = i[0].slice(1), i[i.length - 1] = i[i.length - 1].slice(0, -1), r.type = t(i), r;
  };
}
o(S, "typeTokenizer");
var Ne = /* @__PURE__ */ o((e) => e.trim(), "trim");
function Re(e) {
  return e === "compact" ? (t) => t.map(Ne).join("") : e === "preserve" ? (t) => t.join(`
`) : e;
}
o(Re, "getJoiner");
var Ae = /* @__PURE__ */ o((e) => e && e.startsWith('"') && e.endsWith('"'), "isQuoted");
function O() {
  let e = /* @__PURE__ */ o((t, { tokens: r }, n) => r.type === "" ? t : n, "typeEnd");
  return (t) => {
    let { tokens: r } = t.source[t.source.reduce(e, 0)], n = r.description.trimLeft(), s = n.split('"');
    if (s.length > 1 && s[0] === "" && s.length % 2 === 1)
      return t.name = s[1], r.name = `"${s[1]}"`, [r.postName, r.description] = y(n.slice(r.name.length)), t;
    let i = 0, p = "", a = false, c;
    for (let m of n) {
      if (i === 0 && k(m))
        break;
      m === "[" && i++, m === "]" && i--, p += m;
    }
    if (i !== 0)
      return t.problems.push({
        code: "spec:name:unpaired-brackets",
        message: "unpaired brackets",
        line: t.source[0].number,
        critical: true
      }), t;
    let u = p;
    if (p[0] === "[" && p[p.length - 1] === "]") {
      a = true, p = p.slice(1, -1);
      let m = p.split("=");
      if (p = m[0].trim(), m[1] !== void 0 && (c = m.slice(1).join("=").trim()), p === "")
        return t.problems.push({
          code: "spec:name:empty-name",
          message: "empty name",
          line: t.source[0].number,
          critical: true
        }), t;
      if (c === "")
        return t.problems.push({
          code: "spec:name:empty-default",
          message: "empty default value",
          line: t.source[0].number,
          critical: true
        }), t;
      if (!Ae(c) && /=(?!>)/.test(c))
        return t.problems.push({
          code: "spec:name:invalid-default",
          message: "invalid default value syntax",
          line: t.source[0].number,
          critical: true
        }), t;
    }
    return t.optional = a, t.name = p, r.name = u, c !== void 0 && (t.default = c), [r.postName, r.description] = y(n.slice(r.name.length)), t;
  };
}
o(O, "nameTokenizer");
function v(e = "compact", t = f) {
  let r = A(e);
  return (n) => (n.description = r(n.source, t), n);
}
o(v, "descriptionTokenizer");
function A(e) {
  return e === "compact" ? Ve : e === "preserve" ? Be : e;
}
o(A, "getJoiner");
function Ve(e, t = f) {
  return e.map(({ tokens: { description: r } }) => r.trim()).filter((r) => r !== "").join(" ");
}
o(Ve, "compactJoiner");
var Ce = /* @__PURE__ */ o((e, { tokens: t }, r) => t.type === "" ? e : r, "lineNo"), _e = /* @__PURE__ */ o(({ tokens: e }) => (e.delimiter === "" ? e.start : e.postDelimiter.slice(1)) + e.description, "getDescription");
function Be(e, t = f) {
  if (e.length === 0)
    return "";
  e[0].tokens.description === "" && e[0].tokens.delimiter === t.start && (e = e.slice(1));
  let r = e[e.length - 1];
  return r !== void 0 && r.tokens.description === "" && r.tokens.end.endsWith(t.end) && (e = e.slice(0, -1)), e = e.slice(e.reduce(Ce, 0)), e.map(_e).join(`
`);
}
o(Be, "preserveJoiner");
function V({ startLine: e = 0, fence: t = "```", spacing: r = "compact", markers: n = f, tokenizers: s = [
  P(),
  S(r),
  O(),
  v(r)
] } = {}) {
  if (e < 0 || e % 1 > 0)
    throw new Error("Invalid startLine");
  let i = N({ startLine: e, markers: n }), p = J({ fence: t }), a = R({ tokenizers: s }), c = A(r);
  return function(u) {
    let m = [];
    for (let ge of K(u)) {
      let E = i(ge);
      if (E === null)
        continue;
      let L = p(E), U = L.slice(1).map(a);
      m.push({
        description: c(L[0], n),
        tags: U,
        source: E,
        problems: U.reduce((de, xe) => de.concat(xe.problems), [])
      });
    }
    return m;
  };
}
o(V, "getParser");
function Ie(e) {
  return e.start + e.delimiter + e.postDelimiter + e.tag + e.postTag + e.type + e.postType + e.name + e.postName + e.description + e.end + e.lineEnd;
}
o(Ie, "join");
function C() {
  return (e) => e.source.map(({ tokens: t }) => Ie(t)).join(`
`);
}
o(C, "getStringifier");
function H(e, t = {}) {
  return V(t)(e);
}
o(H, "parse");
function ze(e) {
  return e != null && e.includes("@");
}
o(ze, "containsJsDoc");
function $e(e) {
  let n = `/**
` + (e ?? "").split(`
`).map((i) => ` * ${i}`).join(`
`) + `
*/`, s = H(n, {
    spacing: "preserve"
  });
  if (!s || s.length === 0)
    throw new Error("Cannot parse JSDoc tags.");
  return s[0];
}
o($e, "parse");
var Ye = {
  tags: ["param", "arg", "argument", "returns", "ignore", "deprecated"]
}, Q = /* @__PURE__ */ o((e, t = Ye) => {
  if (!ze(e))
    return {
      includesJsDoc: false,
      ignore: false
    };
  let r = $e(e), n = qe(r, t.tags);
  return n.ignore ? {
    includesJsDoc: true,
    ignore: true
  } : {
    includesJsDoc: true,
    ignore: false,
    // Always use the parsed description to ensure JSDoc is removed from the description.
    description: r.description.trim(),
    extractedTags: n
  };
}, "parseJsDoc");
function qe(e, t) {
  let r = {
    params: null,
    deprecated: null,
    returns: null,
    ignore: false
  };
  for (let n of e.tags)
    if (!(t !== void 0 && !t.includes(n.tag)))
      if (n.tag === "ignore") {
        r.ignore = true;
        break;
      } else
        switch (n.tag) {
          case "param":
          case "arg":
          case "argument": {
            let s = Ke(n);
            s != null && (r.params == null && (r.params = []), r.params.push(s));
            break;
          }
          case "deprecated": {
            let s = Xe(n);
            s != null && (r.deprecated = s);
            break;
          }
          case "returns": {
            let s = He(n);
            s != null && (r.returns = s);
            break;
          }
        }
  return r;
}
o(qe, "extractJsDocTags");
function Ge(e) {
  return e.replace(/[\.-]$/, "");
}
o(Ge, "normaliseParamName");
function Ke(e) {
  if (!e.name || e.name === "-")
    return null;
  let t = te(e.type);
  return {
    name: e.name,
    type: t,
    description: ee(e.description),
    getPrettyName: /* @__PURE__ */ o(() => Ge(e.name), "getPrettyName"),
    getTypeName: /* @__PURE__ */ o(() => t ? re(t) : null, "getTypeName")
  };
}
o(Ke, "extractParam");
function Xe(e) {
  return e.name ? Z(e.name, e.description) : null;
}
o(Xe, "extractDeprecated");
function Z(e, t) {
  let r = e === "" ? t : `${e} ${t}`;
  return ee(r);
}
o(Z, "joinNameAndDescription");
function ee(e) {
  let t = e.replace(/^- /g, "").trim();
  return t === "" ? null : t;
}
o(ee, "normaliseDescription");
function He(e) {
  let t = te(e.type);
  return t ? {
    type: t,
    description: Z(e.name, e.description),
    getTypeName: /* @__PURE__ */ o(() => re(t), "getTypeName")
  } : null;
}
o(He, "extractReturns");
var g = distExports.stringifyRules(), Qe = g.JsdocTypeObject;
g.JsdocTypeAny = () => "any";
g.JsdocTypeObject = (e, t) => `(${Qe(e, t)})`;
g.JsdocTypeOptional = (e, t) => t(e.element);
g.JsdocTypeNullable = (e, t) => t(e.element);
g.JsdocTypeNotNullable = (e, t) => t(e.element);
g.JsdocTypeUnion = (e, t) => e.elements.map(t).join("|");
function te(e) {
  try {
    return distExports.parse(e, "typescript");
  } catch {
    return null;
  }
}
o(te, "extractType");
function re(e) {
  return distExports.transform(g, e);
}
o(re, "extractTypeName");
function B(e) {
  return e.length > 90;
}
o(B, "isTooLongForTypeSummary");
function oe(e) {
  return e.length > 50;
}
o(oe, "isTooLongForDefaultValueSummary");
function l(e, t) {
  return e === t ? { summary: e } : { summary: e, detail: t };
}
o(l, "createSummaryValue");
function ne(e, t) {
  if (e != null) {
    let { value: r } = e;
    if (!T(r))
      return oe(r) ? l(t == null ? void 0 : t.name, r) : l(r);
  }
  return null;
}
o(ne, "createDefaultValue");
function se({ name: e, value: t, elements: r, raw: n }) {
  return t ?? (r != null ? r.map(se).join(" | ") : n ?? e);
}
o(se, "generateUnionElement");
function Ze({ name: e, raw: t, elements: r }) {
  return r != null ? l(r.map(se).join(" | ")) : t != null ? l(t.replace(/^\|\s*/, "")) : l(e);
}
o(Ze, "generateUnion");
function et({ type: e, raw: t }) {
  return t != null ? l(t) : l(e);
}
o(et, "generateFuncSignature");
function tt({ type: e, raw: t }) {
  return t != null ? B(t) ? l(e, t) : l(t) : l(e);
}
o(tt, "generateObjectSignature");
function rt(e) {
  let { type: t } = e;
  return t === "object" ? tt(e) : et(e);
}
o(rt, "generateSignature");
function ot({ name: e, raw: t }) {
  return t != null ? B(t) ? l(e, t) : l(t) : l(e);
}
o(ot, "generateDefault");
function ie(e) {
  if (e == null)
    return null;
  switch (e.name) {
    case "union":
      return Ze(e);
    case "signature":
      return rt(e);
    default:
      return ot(e);
  }
}
o(ie, "createType");
var pe = /* @__PURE__ */ o((e, t) => {
  let { flowType: r, description: n, required: s, defaultValue: i } = t;
  return {
    name: e,
    type: ie(r),
    required: s,
    description: n,
    defaultValue: ne(i ?? null, r ?? null)
  };
}, "createFlowPropDef");
function ae({ defaultValue: e }) {
  if (e != null) {
    let { value: t } = e;
    if (!T(t))
      return l(t);
  }
  return null;
}
o(ae, "createDefaultValue");
function ce({ tsType: e, required: t }) {
  if (e == null)
    return null;
  let r = e.name;
  return t || (r = r.replace(" | undefined", "")), l(
    ["Array", "Record", "signature"].includes(e.name) ? e.raw : r
  );
}
o(ce, "createType");
var le = /* @__PURE__ */ o((e, t) => {
  let { description: r, required: n } = t;
  return {
    name: e,
    type: ce(t),
    required: n,
    description: r,
    defaultValue: ae(t)
  };
}, "createTsPropDef");
function nt(e) {
  return e != null ? l(e.name) : null;
}
o(nt, "createType");
function st(e) {
  let { computed: t, func: r } = e;
  return typeof t > "u" && typeof r > "u";
}
o(st, "isReactDocgenTypescript");
function it(e) {
  return e ? e.name === "string" ? true : e.name === "enum" ? Array.isArray(e.value) && e.value.every(
    ({ value: t }) => typeof t == "string" && t[0] === '"' && t[t.length - 1] === '"'
  ) : false : false;
}
o(it, "isStringValued");
function pt(e, t) {
  if (e != null) {
    let { value: r } = e;
    if (!T(r))
      return st(e) && it(t) ? l(JSON.stringify(r)) : l(r);
  }
  return null;
}
o(pt, "createDefaultValue");
function ue(e, t, r) {
  let { description: n, required: s, defaultValue: i } = r;
  return {
    name: e,
    type: nt(t),
    required: s,
    description: n,
    defaultValue: pt(i, t)
  };
}
o(ue, "createBasicPropDef");
function w(e, t) {
  var _a;
  if (t == null ? void 0 : t.includesJsDoc) {
    let { description: r, extractedTags: n } = t;
    r != null && (e.description = t.description);
    let s = {
      ...n,
      params: (_a = n == null ? void 0 : n.params) == null ? void 0 : _a.map(
        (i) => ({
          name: i.getPrettyName(),
          description: i.description
        })
      )
    };
    Object.values(s).filter(Boolean).length > 0 && (e.jsDocTags = s);
  }
  return e;
}
o(w, "applyJsDocResult");
var at = /* @__PURE__ */ o((e, t, r) => {
  let n = ue(e, t.type, t);
  return n.sbType = b(t), w(n, r);
}, "javaScriptFactory"), ct = /* @__PURE__ */ o((e, t, r) => {
  let n = le(e, t);
  return n.sbType = b(t), w(n, r);
}, "tsFactory"), lt = /* @__PURE__ */ o((e, t, r) => {
  let n = pe(e, t);
  return n.sbType = b(t), w(n, r);
}, "flowFactory"), ut = /* @__PURE__ */ o((e, t, r) => {
  let n = ue(e, { name: "unknown" }, t);
  return w(n, r);
}, "unknownFactory"), I = /* @__PURE__ */ o((e) => {
  switch (e) {
    case "JavaScript":
      return at;
    case "TypeScript":
      return ct;
    case "Flow":
      return lt;
    default:
      return ut;
  }
}, "getPropDefFactory");
var me = /* @__PURE__ */ o(
  (e) => e.type != null ? "JavaScript" : e.flowType != null ? "Flow" : e.tsType != null ? "TypeScript" : "Unknown",
  "getTypeSystem"
), mt = /* @__PURE__ */ o((e) => {
  let t = me(e[0]), r = I(t);
  return e.map((n) => {
    var _a;
    let s = n;
    return ((_a = n.type) == null ? void 0 : _a.elements) && (s = {
      ...n,
      type: {
        ...n.type,
        value: n.type.elements
      }
    }), fe(s.name, s, t, r);
  });
}, "extractComponentSectionArray"), ft = /* @__PURE__ */ o((e) => {
  let t = Object.keys(e), r = me(e[t[0]]), n = I(r);
  return t.map((s) => {
    let i = e[s];
    return i != null ? fe(s, i, r, n) : null;
  }).filter(Boolean);
}, "extractComponentSectionObject"), on = /* @__PURE__ */ o((e, t) => {
  let r = Y(e, t);
  return $(r) ? Array.isArray(r) ? mt(r) : ft(r) : [];
}, "extractComponentProps");
function fe(e, t, r, n) {
  let s = Q(t.description);
  return s.includesJsDoc && s.ignore ? null : {
    propDef: n(e, t, s),
    jsDocTags: s.extractedTags,
    docgenInfo: t,
    typeSystem: r
  };
}
o(fe, "extractProp");
function nn(e) {
  return e != null ? q(e) : "";
}
o(nn, "extractComponentDescription");
const { combineParameters: yt } = __STORYBOOK_MODULE_PREVIEW_API__;
var cn = /* @__PURE__ */ o((e) => {
  let {
    component: t,
    argTypes: r,
    parameters: { docs: n = {} }
  } = e, { extractArgTypes: s } = n, i = s && t ? s(t) : {};
  return i ? yt(i, r) : r;
}, "enhanceArgTypes");
var ye = "storybook/docs", yn = `${ye}/snippet-rendered`, gt = /* @__PURE__ */ ((n) => (n.AUTO = "auto", n.CODE = "code", n.DYNAMIC = "dynamic", n))(gt || {});
export {
  B,
  Y,
  oe as a,
  cn as c,
  gt as g,
  je as j,
  l,
  nn as n,
  on as o,
  yn as y,
  z
};
