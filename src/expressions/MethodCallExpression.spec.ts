import { JsonExpression } from './JsonExpression';
import { MethodCallExpression } from './MethodCallExpression';
import { UndefinedExpression } from './UndefinedExpression';

it('should serialize to json', () => {
  const arg0 = new JsonExpression('hello');
  const methodCall = new MethodCallExpression('foo', new UndefinedExpression(), [arg0]);
  expect(methodCall.toJSON()).toEqual({
    type: 'methodCall',
    name: 'foo',
    thisArg: {
      type: 'undefined',
    },
    arguments: [{
      type: 'json',
      value: 'hello',
    }],
  });
});

it('should evaluate', () => {
  const arg0 = new JsonExpression('hello');
  const methodCall = new MethodCallExpression('foo', new UndefinedExpression(), [arg0]);
  const foo = x => `${x} world`;
  expect(methodCall.evaluate({ foo })).toBe('hello world');
});
