import { IExpression } from './IExpression';

export class JsonExpression implements IExpression {
  value: Object;

  constructor(json: Object) {
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
