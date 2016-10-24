export default class DatumExpression {
  constructor(datum) {
    this.datum = datum;
  }

  toJSON() {
    return {
      type: 'datum',
      datum: this.datum.toJSON(),
    };
  }

  evaluate(context) {
    return this.datum.evaluate(context);
  }
}
