export default class JsonExpression {
  constructor(json) {
    this.value = json;
  }

  toJSON() {
    return {
      type: 'json',
      value: this.value,
    };
  }

  evaluate() {
    return this.value;
  }
}
