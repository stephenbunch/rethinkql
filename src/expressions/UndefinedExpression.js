export default class UndefinedExpression {
  toJSON() {
    return {
      type: 'undefined',
    };
  }

  evaluate() {
    return undefined;
  }
}
