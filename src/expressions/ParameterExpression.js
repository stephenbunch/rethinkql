export default class ParameterExpression {
  constructor(name) {
    this.name = name;
  }

  toJSON() {
    return {
      type: 'parameter',
      name: this.name,
    };
  }

  evaluate(context) {
    return context[this.name];
  }
}
