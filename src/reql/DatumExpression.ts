import { ParameterExpression } from '../expressions/ParameterExpression';
import { MemberExpression } from '../expressions/MemberExpression';
import { CallExpression } from '../expressions/CallExpression';
import { JsonExpression } from '../expressions/JsonExpression';

export class DatumExpression extends ParameterExpression {
  add(...args: number[]) {
    return new CallExpression(new MemberExpression(this, 'add'), args.map(arg => new JsonExpression(arg)));
  }
}
