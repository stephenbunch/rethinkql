import { IExpression } from '../expressions/IExpression';
import { MemberExpression } from '../expressions/MemberExpression';
import { CallExpression } from '../expressions/CallExpression';
import { JsonExpression } from '../expressions/JsonExpression';

export class ValueExpression implements IExpression {
  value: IExpression;

  constructor(value) {
    this.value = value;
  }

  toJSON() {
    return this.value.toJSON();
  }

  evaluate(context = {}) {
    return this.value.evaluate(context);
  }

  add(...args: number[]) {
    return new CallExpression(new MemberExpression(this, 'add'), args.map(arg => new JsonExpression(arg)));
  }
}
