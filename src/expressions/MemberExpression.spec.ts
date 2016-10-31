import { expect } from 'chai';
import { MemberExpression } from './MemberExpression';
import { JsonExpression } from './JsonExpression';

it('should access the member', () => {
  const member = new MemberExpression(new JsonExpression({ foo: 2 }), 'foo');
  expect(member.evaluate()).to.equal(2);
});
