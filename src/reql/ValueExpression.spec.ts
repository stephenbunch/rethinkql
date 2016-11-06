import * as rethinkdb from 'rethinkdb'
import { expect } from 'chai'
import ValueExpression from './ValueExpression'
import * as r from './'

it('should support bracket syntax', () => {
  const expr = r.table('test').get('foo')['a']['b'] as ValueExpression
  const query = expr.evaluate({ r: rethinkdb })
  expect(query.toString()).to.equal('r.table("test").get("foo")("a")("b")')
})
