import { expect } from 'chai';
import { LambdaExpression } from './LambdaExpression';
import { ParameterExpression } from './ParameterExpression';
import { CallExpression } from './CallExpression';
import { MemberExpression } from './MemberExpression';
import { JsonExpression } from './JsonExpression';

it('should evaluate', () => {
  const p0 = new ParameterExpression(0);
  const call = new CallExpression(new MemberExpression(p0, 'foo'), [new JsonExpression(3)]);
  const func = new LambdaExpression([p0], call);
  const result = func.evaluate()({ foo: x => x * x });
  expect(result).to.equal(9);
});
